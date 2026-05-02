import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Basic fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);

global.Response = jest.fn(() => ({
  json: () => Promise.resolve({}),
  ok: true,
}));

global.Headers = jest.fn(() => ({
  append: jest.fn(),
  get: jest.fn(),
}));
