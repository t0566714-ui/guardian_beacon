/**
 * Advanced Animation System with physics-based animations,
 * gesture recognition, and performance-optimized transitions
 */

// Animation presets for different interaction patterns
export const animationPresets = {
  // Micro-interactions
  button: {
    tap: {
      scale: 0.98,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    focus: {
      scale: 1.05,
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.2 }
    }
  },

  // Card animations
  card: {
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  },

  // Glass morphism effects
  glass: {
    initial: {
      backdropFilter: "blur(0px)",
      background: "rgba(255, 255, 255, 0)",
      borderColor: "rgba(255, 255, 255, 0)"
    },
    animate: {
      backdropFilter: "blur(20px)",
      background: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      backdropFilter: "blur(30px)",
      background: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  },

  // Modal and overlay animations
  modal: {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    content: {
      initial: { 
        opacity: 0, 
        scale: 0.8, 
        y: 100,
        rotateX: -15
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.8, 
        y: 100,
        transition: {
          duration: 0.2,
          ease: "easeIn"
        }
      }
    }
  },

  // Loading and skeleton animations
  loading: {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    shimmer: {
      background: [
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
      ],
      backgroundSize: ["200% 100%", "200% 100%"],
      backgroundPosition: ["-200% 0", "200% 0"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    },
    spinner: {
      rotate: [0, 360],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },

  // Page transitions
  pageTransition: {
    slideLeft: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    slideUp: {
      initial: { y: "100%", opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: "-100%", opacity: 0 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 },
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  },

  // Notification animations
  notification: {
    slideInRight: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    bounceIn: {
      initial: { scale: 0, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 15
        }
      },
      exit: {
        scale: 0,
        opacity: 0,
        transition: { duration: 0.2 }
      }
    }
  }
};

// Gesture configurations
export const gestureConfig = {
  swipe: {
    threshold: 50,
    velocity: 0.3,
    directional: true
  },
  pan: {
    threshold: 10,
    bounds: { left: 0, right: 0, top: 0, bottom: 0 }
  },
  pinch: {
    threshold: 0.1,
    bounds: { min: 0.5, max: 3 }
  }
};

// Spring physics presets
export const springPresets = {
  gentle: { stiffness: 120, damping: 14, mass: 1 },
  wobbly: { stiffness: 180, damping: 12, mass: 1 },
  stiff: { stiffness: 400, damping: 22, mass: 1 },
  slow: { stiffness: 80, damping: 26, mass: 1 },
  molasses: { stiffness: 40, damping: 40, mass: 2 }
};

// Easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  anticipate: [0.175, 0.885, 0.32, 1.275],
  backInOut: [0.68, -0.55, 0.265, 1.55]
};

// Animation utilities
export const animationUtils = {
  // Stagger children animations
  staggerChildren: (children, delayPerChild = 0.1) => ({
    animate: {
      transition: {
        staggerChildren: delayPerChild,
        delayChildren: 0.1
      }
    }
  }),

  // Create exit animations that reverse enter animations
  createReversedExit: (enterAnimation) => ({
    ...Object.keys(enterAnimation.animate).reduce((acc, key) => {
      const value = enterAnimation.animate[key];
      if (typeof value === 'number') {
        acc[key] = key === 'opacity' ? 0 : (key === 'scale' ? 0.8 : -value);
      }
      return acc;
    }, {}),
    transition: { duration: 0.2, ease: "easeIn" }
  }),

  // Create responsive animations based on screen size
  createResponsiveAnimation: (baseAnimation, breakpoints) => {
    const mediaQuery = window.matchMedia(breakpoints.mobile);
    return mediaQuery.matches ? 
      { ...baseAnimation, scale: 0.9 } : 
      baseAnimation;
  },

  // Performance-optimized animation
  optimizeForPerformance: (animation) => ({
    ...animation,
    transition: {
      ...animation.transition,
      useNativeDriver: true,
      willChange: 'transform, opacity'
    }
  }),

  // Create morphing animations between states
  createMorphingAnimation: (fromState, toState, duration = 0.6) => ({
    initial: fromState,
    animate: toState,
    transition: {
      duration,
      ease: "easeInOut",
      layout: true
    }
  })
};

// Advanced animation hooks and utilities
export const createAnimationSequence = (sequences) => {
  return {
    animate: sequences.reduce((acc, sequence, index) => {
      const delay = sequences.slice(0, index).reduce((total, seq) => 
        total + (seq.duration || 0.3), 0);
      
      return {
        ...acc,
        ...Object.keys(sequence.animation).reduce((seqAcc, key) => {
          seqAcc[key] = [
            ...(acc[key] || []),
            sequence.animation[key]
          ];
          return seqAcc;
        }, {})
      };
    }, {}),
    transition: {
      duration: sequences.reduce((total, seq) => total + (seq.duration || 0.3), 0),
      times: sequences.reduce((times, seq, index) => {
        const progress = index / (sequences.length - 1);
        return [...times, progress];
      }, [])
    }
  };
};

// Intersection-based animations
export const createScrollAnimation = (threshold = 0.3, once = true) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  viewport: { threshold, once }
});

// Touch gesture animations
export const createSwipeAnimation = (direction = 'right', onSwipe) => ({
  drag: direction === 'horizontal' ? 'x' : 'y',
  dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
  dragElastic: 0.2,
  onDragEnd: (event, info) => {
    const threshold = 100;
    const velocity = info.velocity[direction === 'horizontal' ? 'x' : 'y'];
    const offset = info.offset[direction === 'horizontal' ? 'x' : 'y'];
    
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      onSwipe?.(offset > 0 ? 'positive' : 'negative');
    }
  }
});

// Accessibility-aware animations
export const createA11yAnimation = (baseAnimation, options = {}) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    return {
      initial: baseAnimation.initial,
      animate: {
        ...baseAnimation.animate,
        transition: {
          duration: options.respectReducedMotion ? 0.01 : 0.2,
          ease: "linear"
        }
      }
    };
  }
  
  return baseAnimation;
};

// Layout animations for dynamic content
export const layoutAnimations = {
  shared: {
    layoutId: "shared-element",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  
  accordion: {
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.1 }
      }
    }
  },

  reorder: {
    layout: true,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25
    }
  }
};

// Complex animation orchestration
export class AnimationOrchestrator {
  constructor() {
    this.animations = new Map();
    this.timeline = [];
  }

  add(id, animation, options = {}) {
    this.animations.set(id, {
      animation,
      options,
      status: 'pending'
    });
    return this;
  }

  sequence(...ids) {
    this.timeline.push({ type: 'sequence', ids });
    return this;
  }

  parallel(...ids) {
    this.timeline.push({ type: 'parallel', ids });
    return this;
  }

  async play() {
    for (const step of this.timeline) {
      if (step.type === 'sequence') {
        for (const id of step.ids) {
          await this.playAnimation(id);
        }
      } else if (step.type === 'parallel') {
        await Promise.all(
          step.ids.map(id => this.playAnimation(id))
        );
      }
    }
  }

  async playAnimation(id) {
    const animationData = this.animations.get(id);
    if (!animationData) return;

    animationData.status = 'playing';
    
    return new Promise((resolve) => {
      const duration = animationData.animation.transition?.duration || 0.3;
      setTimeout(() => {
        animationData.status = 'completed';
        resolve();
      }, duration * 1000);
    });
  }
}