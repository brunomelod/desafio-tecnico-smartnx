import { sequelize } from '../config/postgres.js';
import { DataTypes } from 'sequelize';

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'posts',
  timestamps: true,
});

export default Post;