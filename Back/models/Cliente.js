import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Cliente = sequelize.define('cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  contato: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nascimento: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
});
