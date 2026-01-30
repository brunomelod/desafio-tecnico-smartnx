import User from '../models/User.js';

class UserService {
  async register({ name, username, password }) {
    try {
      await User.create({ name, username, password });
      return { success: true, data: { message: 'Usuário cadastrado com sucesso' } };
    } catch (error) {
      if (error?.code === 11000) {
        return { success: false, statusCode: 409, error: 'Username já em uso' };
      }
      if (error?.name === 'ValidationError') {
        return { success: false, statusCode: 400, error: error.message };
      }
      return { success: false, statusCode: 500, error: 'Erro ao cadastrar usuário' };
    }
  }
}

export default new UserService();