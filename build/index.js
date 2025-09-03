"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Express configuration
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// JSON parsing middleware
app.use(express_1.default.json());
// Serve static files from 'public' folder
app.use(express_1.default.static('public'));
// Main route
app.get('/', (req, res) => {
    const response = {
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
app.get('/api/saludo', (req, res) => {
    const nombre = req.query.nombre || 'friend';
    const response = {
        mensaje: `Hello ${nombre}! How are you? This app is built with TypeScript`,
        tip: 'Add ?nombre=YourName to the URL to personalize'
    };
    res.json(response);
});
// Route to get items
app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, nombre: 'Steak', categoria: 'food' },
        { id: 2, nombre: 'Coffee', categoria: 'beverage' },
        { id: 3, nombre: 'Ice Cream', categoria: 'dessert' },
        { id: 4, nombre: 'Pizza', categoria: 'food' },
        { id: 5, nombre: 'Tea', categoria: 'beverage' }
    ];
    res.json(items);
});
// Route to get a specific item
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const items = [
        { id: 1, nombre: 'Steak', categoria: 'food' },
        { id: 2, nombre: 'Coffee', categoria: 'beverage' },
        { id: 3, nombre: 'Ice Cream', categoria: 'dessert' },
        { id: 4, nombre: 'Pizza', categoria: 'food' },
        { id: 5, nombre: 'Tea', categoria: 'beverage' }
    ];
    const item = items.find(i => i.id === id);
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({ error: 'Item not found' });
    }
});
// Route to handle POST methods
app.post('/api/contacto', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    // Here you would normally save to a database
    const response = {
        exito: true,
        mensaje: `Thank you ${nombre}, your message was received. We will contact you at ${email} soon.`
    };
    res.json(response);
});
// Health check route for Vercel
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        language: 'TypeScript',
        framework: 'Express',
        deployment: 'Vercel'
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});
// 404 handler for undefined routes
app.use('*', (req, res) => {
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
exports.default = app;
exports.default = app;
//# sourceMappingURL=index.js.map