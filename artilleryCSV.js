const fs = require('fs');

const output = './artillery.csv';

const stream = fs.createWriteStream(output);

async function writeToCsvFile() {
  stream.write('id\n');
  for (let i = 9300000; i < 10000000; i++) {
    stream.write(i + '\n');
  }
  stream.end();
}

async function seed() {
  await writeToCsvFile();
  console.log('seeding script finished. "artillery" created');
}

seed();