const faker = require('faker');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

const output = __dirname + '/seedWorkspaces.csv';

// Create some fake data using the faker lib. Returns a template string to be inserted into a csv file as a single line
function createEntry(i) {
    const id = i + 1;
    let ownerId;
    const name = faker.commerce.productName();
    let url = name.toLowerCase().split(' ').join('-');
    const descriptionHeadline = faker.lorem.words(3);
    const description = faker.lorem.words(35);
    if (i < 1365476) {
      ownerId = i + 1;
    } else {
      ownerId = Math.floor(Math.random() * 1365476 + 1);
    }
    return `${id},${name},${url},${descriptionHeadline},${description},${ownerId}\n`;
}

const stream = fs.createWriteStream(output);

async function writeToCsvFile() {
  let rows = args['rows'] || 10000000;
  stream.write('id,name,url,descriptionheadline,description,ownerId\n');
  for (let i = 0; i < rows; i++) {
    stream.write(createEntry(i), 'utf-8');
  }
  stream.end();
}


async function seed() {
  await writeToCsvFile();
  console.log('seeding script finished. "workspaces" created');
}

seed();