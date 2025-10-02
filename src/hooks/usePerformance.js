import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Advanced performance optimization hook for managing lazy loading,
 * intersection observer, virtual scrolling, and performance monitoring
 */
export function usePerformance() {
  // Performance metrics
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
    loadTime: 0,
    networkSpeed: 'unknown',
    batteryLevel: null,
    isLowPowerMode: false
  });

  // Resource loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingQueue, setLoadingQueue] = useState([]);
  const [preloadedResources, setPreloadedResources] = useState(new Set());

  // Performance monitoring
  const performanceObserver = useRef(null);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  // Initialize performance monitoring
  useEffect(() => {
    // Performance Observer for monitoring
    if ('PerformanceObserver' in window) {
      performanceObserver.current = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            setMetrics(prev => ({
              ...prev,
              loadTime: entry.loadEventEnd - entry.loadEventStart
            }));
          }
          
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({
              ...prev,
              renderTime: entry.startTime
            }));
          }
        });
      });

      performanceObserver.current.observe({ 
        entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] 
      });
    }

    // Memory usage monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: performance.memory.usedJSHeapSize / 1024 / 1024 // MB
        }));
      }
    };

    // FPS monitoring
    const monitorFPS = () => {
      frameCount.current++;
      const now = performance.now();
      const elapsed = now - lastTime.current;
      
      if (elapsed >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / elapsed);
        setMetrics(prev => ({ ...prev, fps }));
        frameCount.current = 0;
        lastTime.current = now;
      }
      
      requestAnimationFrame(monitorFPS);
    };

    // Battery API
    const monitorBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          setMetrics(prev => ({
            ...prev,
            batteryLevel: battery.level,
            isLowPowerMode: battery.level < 0.2 && !battery.charging
          }));

          const updateBattery = () => {
            setMetrics(prev => ({
              ...prev,
              batteryLevel: battery.level,
              isLowPowerMode: battery.level < 0.2 && !battery.charging
            }));
          };

          battery.addEventListener('levelchange', updateBattery);
          battery.addEventListener('chargingchange', updateBattery);
          
          return () => {
            battery.removeEventListener('levelchange', updateBattery);
            battery.removeEventListener('chargingchange', updateBattery);
          };
        } catch (error) {
          console.warn('Battery API not available:', error);
        }
      }
    };

    // Network speed monitoring
    const monitorNetwork = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        setMetrics(prev => ({
          ...prev,
          networkSpeed: connection.effectiveType || 'unknown'
        }));

        const updateConnection = () => {
          setMetrics(prev => ({
            ...prev,
            networkSpeed: connection.effectiveType || 'unknown'
          }));
        };

        connection.addEventListener('change', updateConnection);
        return () => connection.removeEventListener('change', updateConnection);
      }
    };

    const memoryInterval = setInterval(monitorMemory, 5000);
    requestAnimationFrame(monitorFPS);
    monitorBattery();
    const networkCleanup = monitorNetwork();

    return () => {
      clearInterval(memoryInterval);
      if (performanceObserver.current) {
        performanceObserver.current.disconnect();
      }
      if (networkCleanup) networkCleanup();
    };
  }, []);

  // Intersection Observer hook for lazy loading
  const useIntersectionObserver = useCallback((options = {}) => {
    const [inView, setInView] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const elementRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const defaultOptions = {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      };

      observerRef.current = new IntersectionObserver(([entry]) => {
        const isVisible = entry.isIntersecting;
        setInView(isVisible);
        
        if (isVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      }, defaultOptions);

      observerRef.current.observe(element);

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [hasBeenVisible, options]);

    return { elementRef, inView, hasBeenVisible };
  }, []);

  // Lazy loading for images
  const useLazyImage = useCallback((src, options = {}) => {
    const { elementRef, inView, hasBeenVisible } = useIntersectionObserver(options);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      if (hasBeenVisible && !imageSrc) {
        setImageSrc(src);
      }
    }, [hasBeenVisible, src, imageSrc]);

    const handleLoad = useCallback(() => {
      setImageLoaded(true);
      setImageError(false);
    }, []);

    const handleError = useCallback(() => {
      setImageError(true);
      setImageLoaded(false);
    }, []);

    return {
      elementRef,
      imageSrc,
      imageLoaded,
      imageError,
      inView,
      hasBeenVisible,
      imageProps: {
        src: imageSrc,
        onLoad: handleLoad,
        onError: handleError,
        loading: 'lazy',
        style: {
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }
      }
    };
  }, [useIntersectionObserver]);

  // Resource preloading
  const preloadResource = useCallback((url, type = 'fetch') => {
    if (preloadedResources.has(url)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      if (type === 'image') {
        const img = new Image();
        img.onload = () => {
          setPreloadedResources(prev => new Set([...prev, url]));
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      } else if (type === 'fetch') {
        fetch(url, { mode: 'no-cors' })
          .then(() => {
            setPreloadedResources(prev => new Set([...prev, url]));
            resolve();
          })
          .catch(reject);
      } else if (type === 'link') {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.onload = () => {
          setPreloadedResources(prev => new Set([...prev, url]));
          resolve();
        };
        link.onerror = reject;
        document.head.appendChild(link);
      }
    });
  }, [preloadedResources]);

  // Batch resource loading
  const loadResourceBatch = useCallback(async (resources) => {
    setIsLoading(true);
    setLoadingQueue(resources);

    try {
      // Load resources in chunks to avoid overwhelming the browser
      const chunkSize = metrics.isLowPowerMode ? 2 : 5;
      const chunks = [];
      
      for (let i = 0; i < resources.length; i += chunkSize) {
        chunks.push(resources.slice(i, i + chunkSize));
      }

      for (const chunk of chunks) {
        await Promise.allSettled(
          chunk.map(resource => 
            preloadResource(resource.url, resource.type)
          )
        );
        
        // Add delay for low power mode
        if (metrics.isLowPowerMode) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    } finally {
      setIsLoading(false);
      setLoadingQueue([]);
    }
  }, [metrics.isLowPowerMode, preloadResource]);

  // Debounced function creator
  const useDebounce = useCallback((callback, delay) => {
    const timeoutRef = useRef(null);

    return useCallback((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }, [callback, delay]);
  }, []);

  // Throttled function creator
  const useThrottle = useCallback((callback, delay) => {
    const lastCallRef = useRef(0);

    return useCallback((...args) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    }, [callback, delay]);
  }, []);

  // Virtual scrolling helper
  const useVirtualScrolling = useCallback((
    items, 
    itemHeight, 
    containerHeight, 
    overscan = 5
  ) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [containerRef, setContainerRef] = useState(null);

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      index: startIndex + index,
      style: {
        position: 'absolute',
        top: (startIndex + index) * itemHeight,
        left: 0,
        right: 0,
        height: itemHeight
      }
    }));

    const totalHeight = items.length * itemHeight;

    const handleScroll = useThrottle((e) => {
      setScrollTop(e.target.scrollTop);
    }, 16); // 60fps

    return {
      visibleItems,
      totalHeight,
      containerProps: {
        ref: setContainerRef,
        onScroll: handleScroll,
        style: {
          height: containerHeight,
          overflow: 'auto',
          position: 'relative'
        }
      }
    };
  }, [useThrottle]);

  // Performance optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions = [];

    if (metrics.fps < 30) {
      suggestions.push({
        type: 'performance',
        message: 'Low frame rate detected. Consider reducing animations.',
        action: 'reduceAnimations'
      });
    }

    if (metrics.memoryUsage > 100) {
      suggestions.push({
        type: 'memory',
        message: 'High memory usage detected. Consider lazy loading more content.',
        action: 'lazyLoad'
      });
    }

    if (metrics.isLowPowerMode) {
      suggestions.push({
        type: 'battery',
        message: 'Device is in low power mode. Reducing background processes.',
        action: 'powerSave'
      });
    }

    if (['slow-2g', '2g'].includes(metrics.networkSpeed)) {
      suggestions.push({
        type: 'network',
        message: 'Slow network detected. Consider reducing image quality.',
        action: 'optimizeImages'
      });
    }

    return suggestions;
  }, [metrics]);

  // Resource prioritization based on performance
  const prioritizeResources = useCallback((resources) => {
    const { isLowPowerMode, networkSpeed, memoryUsage } = metrics;
    
    return resources
      .map(resource => ({
        ...resource,
        priority: calculatePriority(resource, { isLowPowerMode, networkSpeed, memoryUsage })
      }))
      .sort((a, b) => b.priority - a.priority);
  }, [metrics]);

  const calculatePriority = (resource, context) => {
    let priority = resource.basePriority || 5;
    
    // Reduce priority for non-critical resources in low power mode
    if (context.isLowPowerMode && !resource.critical) {
      priority -= 3;
    }
    
    // Reduce priority for large resources on slow networks
    if (['slow-2g', '2g'].includes(context.networkSpeed) && resource.size > 100000) {
      priority -= 2;
    }
    
    // Reduce priority when memory usage is high
    if (context.memoryUsage > 80 && resource.type === 'image') {
      priority -= 1;
    }
    
    return Math.max(0, priority);
  };

  return {
    // Performance metrics
    metrics,
    
    // Loading state
    loading: {
      isLoading,
      loadingQueue,
      preloadedResources: Array.from(preloadedResources)
    },
    
    // Optimization hooks
    useIntersectionObserver,
    useLazyImage,
    useDebounce,
    useThrottle,
    useVirtualScrolling,
    
    // Resource management
    preloadResource,
    loadResourceBatch,
    prioritizeResources,
    
    // Optimization suggestions
    getOptimizationSuggestions
  };
}