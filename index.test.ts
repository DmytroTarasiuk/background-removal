import request from 'supertest';
import { app, server } from './index';

const testImagePath = './images/testImage.jpg';

jest.mock('@imgly/background-removal-node', () => ({
  removeBackground: jest.fn(async () => {
    return {
      arrayBuffer: async () => new ArrayBuffer(0),
    };
  }),
  Config: {},
}));

describe('Image Background Removal API', () => {
  afterAll(() => {
    server.close();
  });

  test('POST /remove-background - Successful removal', async () => {
    const response = await request(app).post('/remove-background').attach('image', testImagePath);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  }, 1000);

  test('POST /remove-background - Invalid file type', async () => {
    const response = await request(app)
      .post('/remove-background')
      .attach('image', './images/test.txt');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Please upload a valid image file.',
    });
  });
});
