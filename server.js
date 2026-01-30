import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/mongodb.js"; 
import { connectDB as connectDBPostgres } from "./src/config/postgres.js";
import { sequelize } from "./src/models/index.js";

const startServer = async () => {
  await connectDB();
  await connectDBPostgres();

  await sequelize.sync();

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
  });
};

startServer().catch(error => {
  console.error('Erro ao iniciar o servidor:', error);
  process.exit(1);
});