import { sequelize } from '../config/postgres.js';
import { DataTypes } from 'sequelize';

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'comments',
  timestamps: true,
});

export default Comment;