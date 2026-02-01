import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB: Conexão com o banco realizado com sucesso');
  } catch (error) {
    console.error('MongoDB: Erro ao conectar com o banco', error);
    process.exit(1);
  }
};

export default connectDB;