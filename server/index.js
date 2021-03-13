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

app.post('/api/add', async (req, res) => {
  let body = new db.WorkspaceDescription(req.body)
  const workspace = {
    id: body.id,
    name: body.name,
    url: body.url,
    descriptionHeadline: body.descriptionHeadline,
    description: body.description,
  };
  const desc = await db.WorkspaceDescription.create(workspace)
  res.json(desc);
})

app.patch('/api/update', async (req, res) => {
  const {id, descriptionHeadline} = req.body
  let update = await db.updateWorkspaceDescription(id, descriptionHeadline);
  res.json(update);
})

app.delete('/api/delete/:id', async (req, res) => {
  const { id } = req.params;
  let deleted = await db.deleteWorkspaceDescription(id);
  res.json(deleted);
})

const port = process.env.PORT ? process.env.PORT : 6060;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
