import commentService from '../services/commentService.js';

export const addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!postId || !content) {
      return res.status(400).json({ error: 'PostId e content são obrigatórios' });
    }
    
    const result = await commentService.createComment({ postId, content, userId });
    
    if (!result.success) {
      const statusCode = result.statusCode || 400;
      return res.status(statusCode).json({ error: result.error });
    }
    
    res.status(201).json(result.data);
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await commentService.deleteComment(id, userId);
    
    if (!result.success) {
      const statusCode = result.statusCode || 400;
      return res.status(statusCode).json({ error: result.error });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};