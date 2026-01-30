import authService from '../services/authService.js';

export const loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    if (!result.success) {
      return res.status(result.statusCode ?? 401).json({ error: result.error });
    }

    return res.json(result.data);
  } catch {
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
};