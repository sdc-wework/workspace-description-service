require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

const mongo = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb://localhost/spacework';
mongoose.connect(mongo, { useUnifiedTopology: true, useNewUrlParser: true });

const workspaceDescriptionSchema = mongoose.Schema({
  _id: Number,
  name: String,
  url: String,
  descriptionHeadline: String,
  description: String,
});
const WorkspaceDescription = mongoose.model('WorkspaceDescription', workspaceDescriptionSchema);

module.exports = {
  WorkspaceDescription,
};

