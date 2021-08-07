import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://marcin:password@localhost:5432/db2');
