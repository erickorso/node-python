import express, { Request, Response, NextFunction } from 'express';
import { Item, ContactRequest, ApiResponse, SaludoResponse, ContactResponse } from './types';

// Configuración de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware para parsing JSON
app.use(express.json());

// Ruta principal
app.get('/', (req: Request, res: Response) => {
  const response: ApiResponse = { 
    mensaje: '¡Che, boludo! Tu API en TypeScript está funcionando en Vercel',
    fecha: new Date().toLocaleDateString('es-AR'),
    endpoints: [
      '/api/saludo',
      '/api/saludo?nombre=TuNombre',
      '/api/items',
      '/api/items/:id'
    ]
  };
  res.json(response);
});

// Ruta de saludo personalizado
app.get('/api/saludo', (req: Request, res: Response) => {
  const nombre = req.query.nombre as string || 'amigo';
  const response: SaludoResponse = { 
    mensaje: `¡Hola ${nombre}! ¿Todo bien? Esta app está hecha en TypeScript`,
    tip: 'Agregá ?nombre=TuNombre al URL para personalizar'
  };
  res.json(response);
});

// Ruta para obtener items
app.get('/api/items', (req: Request, res: Response) => {
  const items: Item[] = [
    { id: 1, nombre: 'Asado', categoria: 'comida' },
    { id: 2, nombre: 'Mate', categoria: 'bebida' },
    { id: 3, nombre: 'Dulce de leche', categoria: 'postre' },
    { id: 4, nombre: 'Empanadas', categoria: 'comida' },
    { id: 5, nombre: 'Fernet', categoria: 'bebida' }
  ];
  res.json(items);
});

// Ruta para obtener un item específico
app.get('/api/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const items: Item[] = [
    { id: 1, nombre: 'Asado', categoria: 'comida' },
    { id: 2, nombre: 'Mate', categoria: 'bebida' },
    { id: 3, nombre: 'Dulce de leche', categoria: 'postre' },
    { id: 4, nombre: 'Empanadas', categoria: 'comida' },
    { id: 5, nombre: 'Fernet', categoria: 'bebida' }
  ];
  
  const item = items.find(i => i.id === id);
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item no encontrado' });
  }
});

// Ruta para manejar métodos POST
app.post('/api/contacto', (req: Request, res: Response) => {
  const { nombre, email, mensaje } = req.body as ContactRequest;
  
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  
  // Aquí normalmente guardarías en una base de datos
  const response: ContactResponse = { 
    exito: true, 
    mensaje: `Gracias ${nombre}, tu mensaje fue recibido. Te contactaremos a ${email} pronto.` 
  };
  
  res.json(response);
});

// Ruta de health check para Vercel
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    language: 'TypeScript',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Manejar rutas no existentes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor solo si no estamos en Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor TypeScript corriendo en puerto ${PORT}`);
  });
}

// Exportar la app para Vercel
export default app;