// middleware/cors.js
const Cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: 'http://localhost',
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

const cors = Cors(corsOptions)

module.exports = cors