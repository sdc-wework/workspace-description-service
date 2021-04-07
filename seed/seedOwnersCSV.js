const faker = require('faker');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

const output = './seedOwners.csv';

function createOwner(i) {
  const id = i + 1;
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return `${id},${firstName},${lastName}\n`;
}

const stream = fs.createWriteStream(output);

async function writeToCsvFile() {
  const rows = 1365476;
  stream.write('id,firstName,lastName\n');
  for (let i = 0; i < rows; i++) {
    stream.write(createOwner(i), 'utf-8');
  }
  stream.end();
}

async function seed() {
  await writeToCsvFile();
  console.log('seeding script finished. "owners" created');
}

seed();