import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL: Conexão com o banco realizado com sucesso');
  } catch (error) {
    console.error('PostgreSQL: Erro ao conectar com o banco:', error);
    process.exit(1);
  }
};

export { sequelize, connectDB };