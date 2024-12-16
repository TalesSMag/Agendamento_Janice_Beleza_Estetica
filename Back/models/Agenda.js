import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Agenda = sequelize.define('agenda', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contato: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nascimento: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  servico: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  duracao: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  data: {
    type: DataTypes.DATE(),
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME(),
    allowNull: false
  },
  profissional: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  capa: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  data_hora: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.data}T${this.hora}`;
    }
  }
}, {
  paranoid: true
});