const express = require('express');
const sequelize = require('./config/database');
const catatanRoutes = require('./routes/catatanRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: [
    'http://localhost',
    'http://localhost:5173',
    'http://127.0.0.1:5500',
    'https://frontend-123230174-dot-h-03-488115.et.r.appspot.com'
  ],
  methods: ['GET', 'POST', 'PUT','DELETE'],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Notes App API');
});

require('./schema/Catatan');
app.use('/api/v1/catatan', catatanRoutes);

const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(port, () => console.log(`Server running on port ${port}`));
});