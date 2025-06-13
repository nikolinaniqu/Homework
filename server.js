import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
// Password for Max: "password123", for Emilia: "secret456"
const users = [
  { name: 'Max', username: 'max1234', passwordHash: '$2b$10$wKj1nQw8vQw8vQw8vQw8vOQw8vQw8vQw8vQw8vQw8vQw8vQw8vQw8v' },
  { name: 'Emilia', username: 'emilly25', passwordHash: '$2b$10$zKj1nQw8vQw8vQw8vQw8vOQw8vQw8vQw8vQw8vQw8vQw8vQw8vQw8v' },
];

app.use(express.json());
app.use(express.static("public"));
const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).send('Benutzername oder Passwort falsch');
  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if (err || !result) return res.status(401).send('Benutzername oder Passwort falsch');
    req.user = user;
    next();
  });
};

app.post('/login', authenticate, (req, res) => {
  res.send(`Willkommen, ${req.user.name}!`);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
