import userService from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const result = await userService.register(req.body);

    if (!result.success) {
      return res.status(result.statusCode ?? 400).json({ error: result.error });
    }

    return res.status(201).json(result.data);
  } catch {
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};