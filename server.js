import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/mongodb.js"; 

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
  });
};

startServer();