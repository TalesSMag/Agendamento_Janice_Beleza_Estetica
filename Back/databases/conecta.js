import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "agendamentos", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});