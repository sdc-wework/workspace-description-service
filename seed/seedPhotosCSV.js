const faker = require('faker');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

const output = './seedPhotos.csv';

let photoId = 1;

function createPhotos(workspaceId) {
  const random = Math.floor(Math.random() * 10 + 4);
  let string = '';
  for (let i = 0; i < random; i++) {
    let id = photoId;
    const url = faker.image.imageUrl();
    photoId++;
    string += `${id},${url},${workspaceId}\n`;
  }
  return string;
}

const stream = fs.createWriteStream(output);

async function writeToCsvFile() {
  const workspaces =10000000;
  stream.write('id,url,workspaceId\n');
  for(let i = 0; i < workspaces; i++) {
    stream.write(createPhotos(i + 1));
  }
  stream.end();
}

async function seed() {
  await writeToCsvFile();
  console.log('seeding script finished. "photos" created');
}

seed();