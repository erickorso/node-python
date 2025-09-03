// Configuration for API endpoints and UI
const CONFIG = {
  // Hero section configuration
  hero: {
    title: '🚀 TypeScript API',
    badge: 'Vercel',
    subtitle: 'Node.js TypeScript API deployed on Vercel'
  },

  // Section titles
  sections: {
    endpoints: 'Available Endpoints:'
  },

  // API endpoints configuration
  endpoints: [
    {
      title: 'GET',
      method: 'GET',
      endpoint: '/api/saludo',
      description: 'Personalizable greeting with query parameter',
      buttons: [
        {
          text: 'Test Basic',
          variant: 'primary',
          onclick: 'probarEndpoint(\'/api/saludo\')'
        },
        {
          text: 'With Name',
          variant: 'secondary',
          onclick: 'probarEndpoint(\'/api/saludo?nombre=John\')'
        }
      ]
    },
    {
      title: 'GET',
      method: 'GET',
      endpoint: '/api/items',
      description: 'List of available items (sample data)',
      buttons: [
        {
          text: 'Get Items',
          variant: 'primary',
          onclick: 'probarEndpoint(\'/api/items\')'
        }
      ]
    },
    {
      title: 'GET',
      method: 'GET',
      endpoint: '/api/items/:id',
      description: 'Get a specific item by ID',
      buttons: [
        {
          text: 'Item 1',
          variant: 'primary',
          onclick: 'probarEndpoint(\'/api/items/1\')'
        },
        {
          text: 'Item 2',
          variant: 'primary',
          onclick: 'probarEndpoint(\'/api/items/2\')'
        },
        {
          text: 'Item 3',
          variant: 'primary',
          onclick: 'probarEndpoint(\'/api/items/3\')'
        }
      ]
    },
    {
      title: 'GET',
      method: 'GET',
      endpoint: '/api/health',
      description: 'Server health check',
      buttons: [
        {
          text: 'Test Health',
          variant: 'primary',
          onclick: 'probarEndpoint(\'/api/health\')'
        }
      ]
    },
    {
      title: 'POST',
      method: 'POST',
      endpoint: '/api/contacto',
      description: 'Send contact data (use tools like Postman)',
      bodyExample: '{"nombre": "Example", "email": "example@mail.com", "mensaje": "Hello"}',
      fullWidth: true
    }
  ],

  // Footer configuration
  footer: {
    text: 'Built with TypeScript and deployed on Vercel'
  },

  // Result section configuration
  result: {
    title: 'Result:',
    loadingText: 'Loading...',
    errorPrefix: 'Error: '
  }
};

// Export configuration
window.CONFIG = CONFIG;
