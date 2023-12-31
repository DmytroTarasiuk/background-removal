import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testPathIgnorePatterns: ['/dist/'],
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
};

export default config;
