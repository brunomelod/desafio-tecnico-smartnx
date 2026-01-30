import commentService from '../services/commentService.js';

export const addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;
    
    const result = await commentService.createComment({ postId, content, userId });
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }
    
    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await commentService.deleteComment(id);
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir comentário' });
  }
};