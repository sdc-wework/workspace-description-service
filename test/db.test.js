const {
  mongoose,
  WorkspaceDescription,
} = require('../database/index.js');

describe('database', () => {

  afterAll(async () => {
    mongoose.disconnect();
  });

  it('should insert a doc into collection', async () => {
    const mockUser = {
      id: 0,
      name: 'Some workspace',
      url: 'some-workspace',
      descriptionHeadline: 'Some workspace description headline',
      description: 'Some workspace description',
    };
    await WorkspaceDescription.create(mockUser);
    const insertedUser = await WorkspaceDescription.findOne({ id: 0 });

    const shapedData = {};
    for (let key in mockUser) {
      shapedData[key] = insertedUser[key];
    }

    expect(shapedData).toEqual(mockUser);
  });
});

