import { DataSource } from 'typeorm';
import { Book } from './models/Book';
import { Member } from './models/Member';
import { Transaction } from './models/Transaction';

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'admin',
   database: 'test',
   synchronize: true,
   logging: false,
   entities: [Book,Member,Transaction],
   subscribers: [],
   migrations: [],
});