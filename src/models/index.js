import { sequelize } from '../config/postgres.js';
import Post from './Post.js';
import Comment from './Comment.js';

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export { sequelize, Post, Comment };