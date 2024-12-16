import { Cliente } from '../models/Cliente.js';
import { Op } from 'sequelize'; // Importação do operador Sequelize

// Função para listar todos os clientes ou buscar pelo nome
export const clienteIndex = async (req, res) => {
  try {
    const { nome } = req.query; // Obtém o parâmetro 'nome' da URL

    // Se um nome foi fornecido, faz uma busca com o operador LIKE
    const whereClause = nome
      ? { nome: { [Op.like]: `%${nome}%` } } // Busca parcial com o nome
      : {}; // Se não, busca todos os clientes

    // Busca os clientes no banco de dados com a cláusula de busca
    const clientes = await Cliente.findAll({ where: whereClause });

    // Retorna os clientes encontrados com status 200 (OK)
    res.status(200).json(clientes);
  } catch (error) {
    // Em caso de erro, retorna status 400 (Bad Request) e o erro
    res.status(400).send(error);
  }
};

// Função para criar um novo cliente
export const clienteCreate = async (req, res) => {
  // Extrai os dados do corpo da requisição
  const { nome, contato, nascimento, endereco } = req.body;

  // Se algum dos atributos não foi informado
  if (!nome || !contato || !nascimento || !endereco) {
    // Retorna status 400 (Bad Request) com mensagem de erro
    res.status(400).json({ id: 0, msg: 'Erro... Informe os dados' });
    return;
  }

  try {
    // Cria um novo cliente com os dados fornecidos
    const cliente = await Cliente.create({
      nome,
      contato,
      nascimento,
      endereco,
    });
    // Retorna o cliente criado com status 201 (Created)
    res.status(201).json(cliente);
  } catch (error) {
    // Em caso de erro, retorna status 400 (Bad Request) e o erro
    res.status(400).send(error);
  }
};
