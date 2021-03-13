const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongo = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb://localhost/spacework';
mongoose.connect(mongo, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

const workspaceDescriptionSchema = mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  descriptionHeadline: String,
  description: String,
});
const WorkspaceDescription = mongoose.model('WorkspaceDescription', workspaceDescriptionSchema);

const getAllWorkspaceDescriptions = async () => await WorkspaceDescription.find({}).exec();

const getWorkspaceDescriptionById = async id => await WorkspaceDescription.findOne({ id });

const createUniqueWorkspaceDescription = async (data) => {
  const existing = await WorkspaceDescription.find(data).exec();
  if (existing === null | existing.length === 0) {
    return await model.create(data);
  }
};

const saveWorkspaceDescription = async (data) => {
  return await createUniqueWorkspaceDescription(data);
};

const updateWorkspaceDescription = async (id, update) => {
  return await WorkspaceDescription.findOneAndUpdate({id: id}, {descriptionHeadline: update}, {new: true});
}

const deleteWorkspaceDescription = async (id) => {
  return await WorkspaceDescription.findOneAndDelete({id: id})
}

module.exports = {
  mongoose,
  WorkspaceDescription,
  getAllWorkspaceDescriptions,
  getWorkspaceDescriptionById,
  saveWorkspaceDescription,
  updateWorkspaceDescription,
  deleteWorkspaceDescription
};

