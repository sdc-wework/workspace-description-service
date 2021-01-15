require('./init.js');
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

const photoSchema = mongoose.Schema({
  _id: Number,
  workspaceId: Number,
  description: String,
  url: String,
});
const Photo = mongoose.model('Photo', photoSchema);

module.exports = {
  WorkspaceDescription,
  Photo,
};

