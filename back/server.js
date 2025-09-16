const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'cambia_este_secreto';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Permite peticiones desde el front servido por XAMPP (http://localhost/...)
app.use(cors()); // Simple y efectivo para demo
app.use(express.json());

// "BD" en memoria (demo)
const USERS = [
  { username: 'admin', password: '1234', name: 'Administrador', roles: ['admin'] },
  { username: 'user',  password: '1234', name: 'Usuario Demo',   roles: ['user']  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  const found = USERS.find(u => u.username === username && u.password === password);
  if (!found) {
    return res.status(401).json({ error: 'Usuario o contraseña no válidos' });
  }

  const payload = {
    sub: found.username,
    name: found.name,
    roles: found.roles
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'jwt-xampp-demo'
  });

  res.json({ token });
});

// Middleware para proteger rutas
function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const [type, token] = auth.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token ausente o mal formado' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET, { issuer: 'jwt-xampp-demo' });
    req.user = decoded; // adjuntamos el payload al request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o caducado' });
  }
}

// Ejemplo de endpoint protegido
app.get('/api/profile', verifyToken, (req, res) => {
  // req.user proviene del token
  res.json({
    message: 'Acceso concedido',
    user: req.user
  });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
