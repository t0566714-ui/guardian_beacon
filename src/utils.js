// Utility function to create page URLs
export const createPageUrl = (page) => {
  const routes = {
    'Dashboard': '/',
    'Map': '/map',
    'Contacts': '/contacts',
    'SafetyTools': '/safety-tools',
    'Settings': '/settings'
  };
  return routes[page] || '/';
};