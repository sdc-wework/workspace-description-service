const https = require('https');
const path = require('path');
const fs = require('fs');

const { WorkspaceDescription } = require('./index.js');

const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const get = url => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let result = '';
      res.on('data', data => {
        result += data.toString();
      });
      res.on('end', data => {
        resolve(result);
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

const getHipsum = async (params = { paras: 1 }) => {
  const paramsArray = [];

  for (let param in params) {
    paramsArray.push(`${param}=${params[param]}`);
  }

  const url = `https://hipsum.co/api/?type=hipster-centric&${paramsArray.join('&')}`;
  const data = await get(url);
  return JSON.parse(data);
};

const generateData = async () => {
  const workspaces = [];

  const data = await getHipsum({ paras: 100 });

  for (let i = 0; i < data.length; i++) {
    const paragraph = data[i].replace(/\s+/g, ' ');
    const sentences = paragraph.split('. ');
    const nameLength = randomIntBetween(1, 2);
    const headlineLength = randomIntBetween(4, 7);

    const name = sentences[0].slice(0, -1).split(' ').slice(0, nameLength).join(' ').replace(/[,.?'"]/g, '');
    const url = name.toLowerCase().split(' ').join('-');
    const headline = sentences[1].split(' ').slice(0, nameLength).join(' ').replace(/[,.?'"]/g, '');
    const description = sentences.concat(sentences).join('. ');

    const workspace = {
      id: i + 1,
      name: name,
      url: url,
      descriptionHeadline: headline,
      description: description,
    };

    workspaces.push(workspace);
  }

  await WorkspaceDescription.deleteMany({});
  const workspaceDescriptions = await WorkspaceDescription.create(workspaces);

  console.log(`Generated: ${workspaceDescriptions.length} workspace descriptions`);

  process.exit();
};

generateData();

