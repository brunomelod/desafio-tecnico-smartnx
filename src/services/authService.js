import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';

class AuthService {
  async login({ username, password }) {
    try {
      const user = await User.findOne({ username }).select('+password');
      if (!user) return { success: false, statusCode: 401, error: 'Usuário não encontrado' };

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) return { success: false, statusCode: 401, error: 'Senha incorreta' };

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
      );

      return {
        success: true,
        data: { token, user: { username: user.username, name: user.name } },
      };
    } catch (error) {
      return { success: false, statusCode: 500, error: 'Erro ao fazer login' };
    }
  }
}

export default new AuthService();