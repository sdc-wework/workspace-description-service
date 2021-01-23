const request = require('request');

describe('api', () => {

  const expectedShape = {
    _id: '',
    __v: 0,
    id: 0,
    name: '',
    url: '',
    descriptionHeadline: '',
    description: '',
  };

  it('should respond with a single workspace', async () => {
    const options = {
      'method': 'GET',
      'uri': 'http://localhost:6060/api/workspace-description/1',
    };

    request(options, (error, res, body) => {
      if (error) return error;
      const data = JSON.parse(res.body);
      for (let key in data) {
        expect(typeof data[key]).toEqual(typeof expectedShape[key]);
      }
    });
  });

  it('should respond with all workspaces', async () => {
    const options = {
      'method': 'GET',
      'uri': 'http://localhost:6060/api/workspace-descriptions',
    };

    request(options, (error, res, body) => {
      if (error) return error;
      const data = JSON.parse(res.body);
      expect(data.length).toBeGreaterThan(1);
      const first = data[0];
      for (let key in first) {
        expect(typeof first[key]).toEqual(typeof expectedShape[key]);
      }
    });
  });
});

