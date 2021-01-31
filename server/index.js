const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/workspace-descriptions', async (req, res) => {
  const workspaceDescriptions = await db.getAllWorkspaceDescriptions();
  res.json(workspaceDescriptions);
});

app.get('/api/workspace-description/:id', async (req, res) => {
  const { id } = req.params;
  const workspaceDescription = await db.getWorkspaceDescriptionById(id);
  res.json(workspaceDescription);
});

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT ? process.env.PORT : 6060;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
