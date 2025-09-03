import express, { Request, Response, NextFunction } from 'express';
import { Item, ContactRequest, ApiResponse, SaludoResponse, ContactResponse } from './types';

// Express configuration
const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// JSON parsing middleware
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static('public'));

// Main route
app.get('/', (req: Request, res: Response) => {
  const response: ApiResponse = { 
    mensaje: 'Hello! Your TypeScript API is working on Vercel',
    fecha: new Date().toLocaleDateString('en-US'),
    endpoints: [
      '/api/saludo',
      '/api/saludo?nombre=YourName',
      '/api/items',
      '/api/items/:id'
    ]
  };
  res.json(response);
});

// Personalized greeting route
app.get('/api/saludo', (req: Request, res: Response) => {
  const nombre = req.query.nombre as string || 'friend';
  const response: SaludoResponse = { 
    mensaje: `Hello ${nombre}! How are you? This app is built with TypeScript`,
    tip: 'Add ?nombre=YourName to the URL to personalize'
  };
  res.json(response);
});

// Route to get items
app.get('/api/items', (req: Request, res: Response) => {
  const items: Item[] = [
    { id: 1, nombre: 'Steak', categoria: 'food' },
    { id: 2, nombre: 'Coffee', categoria: 'beverage' },
    { id: 3, nombre: 'Ice Cream', categoria: 'dessert' },
    { id: 4, nombre: 'Pizza', categoria: 'food' },
    { id: 5, nombre: 'Tea', categoria: 'beverage' }
  ];
  res.json(items);
});

// Route to get a specific item
app.get('/api/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const items: Item[] = [
    { id: 1, nombre: 'Steak', categoria: 'food' },
    { id: 2, nombre: 'Coffee', categoria: 'beverage' },
    { id: 3, nombre: 'Ice Cream', categoria: 'dessert' },
    { id: 4, nombre: 'Pizza', categoria: 'food' },
    { id: 5, nombre: 'Tea', categoria: 'beverage' }
  ];
  
  const item = items.find(i => i.id === id);
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Route to handle POST methods
app.post('/api/contacto', (req: Request, res: Response) => {
  const { nombre, email, mensaje } = req.body as ContactRequest;
  
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Here you would normally save to a database
  const response: ContactResponse = { 
    exito: true, 
    mensaje: `Thank you ${nombre}, your message was received. We will contact you at ${email} soon.` 
  };
  
  res.json(response);
});

// Health check route for Vercel
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    language: 'TypeScript',
    framework: 'Express',
    deployment: 'Vercel'
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found',
    availableRoutes: [
      '/',
      '/api/saludo',
      '/api/items',
      '/api/health'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
});

export default app;