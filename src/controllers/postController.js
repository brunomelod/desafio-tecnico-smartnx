import postService from '../services/postService.js';

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    
    const result = await postService.createPost({ title, content, userId });
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar post' });
  }
};

export const listPosts = async (req, res) => {
  try {
    const result = await postService.getAllPosts();
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar posts' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const result = await postService.updatePost(id, { title, content });
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }
    
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await postService.deletePost(id);
    
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir post' });
  }
};