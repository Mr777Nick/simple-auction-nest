/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const queryBuilderMockFactory: () => MockType<SelectQueryBuilder<any>> =
  jest.fn(() => ({
    getManyAndCount: jest.fn((entity) => [[entity], 15]),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
  }));

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
    findByClientId: jest.fn((entity) => entity),
    createQueryBuilder: jest.fn((entity) => queryBuilderMockFactory()),
  }),
);

// @ts-ignore
export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
  }),
);
