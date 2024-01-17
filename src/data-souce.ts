import { DataSource } from 'typeorm';
import { Book } from './models/Book';
import { Member } from './models/Member';
import { Transaction } from './models/Transaction';
import dotenv from "dotenv"

const env = dotenv.config();

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: +process.env.DBPORT,
   username: process.env.DB_username,
   password: process.env.DB_password,
   database: process.env.DB_database,
   synchronize: true,
   logging: false,
   entities: [Book,Member,Transaction],
   subscribers: [],
   migrations: [],
});