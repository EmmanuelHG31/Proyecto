const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Simulación de usuarios en memoria
let users = [
  { username: 'admin', password: '1234', email: 'admin@example.com' }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para las vistas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/recover', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'recover.html'));
});

app.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'delete.html'));
});

// Login POST
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.send(`<h2>¡Bienvenido, ${username}!</h2><a href="/">Cerrar sesión</a>`);
  } else {
    res.send('<h2>Usuario o contraseña incorrectos.</h2><a href="/">Volver</a>');
  }
});

// Recuperar contraseña POST
app.post('/recover', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (user) {
    res.send(`<h2>Hola ${user.username}, tu contraseña es: <strong>${user.password}</strong></h2><a href="/">Iniciar sesión</a>`);
  } else {
    res.send('<h2>Email no encontrado.</h2><a href="/recover">Volver</a>');
  }
});

// Eliminar cuenta POST
app.post('/delete', (req, res) => {
  const { username } = req.body;
  const userIndex = users.findIndex(u => u.username === username);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send(`<h2>Usuario ${username} eliminado exitosamente.</h2><a href="/">Volver al login</a>`);
  } else {
    res.send('<h2>Usuario no encontrado.</h2><a href="/delete">Volver</a>');
  }
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
