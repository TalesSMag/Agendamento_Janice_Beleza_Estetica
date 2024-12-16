import { Agenda } from '../models/Agenda.js'
import { Op } from 'sequelize'

// Função para listar todos os itens da agenda
export const agendaIndex = async (req, res) => {
  try {
    // Busca todos os itens da agenda no banco de dados
    const agendados = await Agenda.findAll()
    // Retorna os itens com status 200 (OK)
    res.status(200).json(agendados)
  } catch (error) {
    // Em caso de erro, retorna status 400 (Bad Request) e o erro
    res.status(400).send(error)
  }
}

// Função para criar um novo item na agenda
export const agendaCreate = async (req, res) => {
  const { nome, contato, nascimento, endereco, servico, profissional, descricao, duracao, capa, data, hora } = req.body;

  if (!nome || !contato || !nascimento || !endereco || !servico || !profissional || !descricao || !duracao || !capa || !data || !hora) {
    return res.status(400).json({ id: 0, msg: "Erro... Informe todos os dados" });
  }

  try {
    // Cria o agendamento no banco de dados
    const agenda = await Agenda.create({
      nome, contato, nascimento, endereco, servico, profissional, descricao, duracao, capa, data, hora
    });

    return res.status(201).json(agenda);

  } catch (error) {
    console.error(error); // Exibe o erro para debug
    return res.status(500).json({ msg: "Erro ao criar o agendamento", error });
  }
};


// Função para remover um item da agenda
export const agendaDestroy = async (req, res) => {
  // Extrai o id dos parâmetros da requisição
  const { id } = req.params

  try {
    // Remove o item da agenda com o id fornecido
    await Agenda.destroy({ where: { id } });
    // Retorna mensagem de sucesso com status 200 (OK)
    res.status(200).json({ msg: "Ok! Removido com Sucesso" })
  } catch (error) {
    // Em caso de erro, retorna status 400 (Bad Request) e o erro
    res.status(400).send(error)
  }
}

// Função para buscar itens da agenda por nome
export const agendaSearch = async (req, res) => {
  const { nome } = req.query; // Extrai o parâmetro de consulta "nome" da URL

  try {
    if (!nome) {
      return res.status(400).json({ error: "O parâmetro 'nome' é obrigatório." });
    }

    // Busca todos os itens da agenda que contenham o nome fornecido (case-insensitive)
    const agendados = await Agenda.findAll({
      where: {
        nome: {
          [Op.iLike]: `%${nome}%` // Busca por nome parcial (case-insensitive)
        }
      },
      attributes: ['id', 'nome', 'contato', 'nascimento', 'endereco'] // Retorna apenas os campos necessários
    });

    if (agendados.length === 0) {
      return res.status(404).json({ error: "Nenhum agendamento encontrado com o nome fornecido." });
    }

    // Retorna os itens encontrados com status 200 (OK)
    return res.status(200).json(agendados);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    // Em caso de erro, retorna status 500 (Internal Server Error) e o erro
    return res.status(500).json({ error: "Erro ao buscar agendamentos." });
  }
};


// Função para editar um item da agenda
export const agendaEdit = async (req, res) => {
  // Extrai o id dos parâmetros da requisição
  const { id } = req.params; 
  // Extrai os dados do corpo da requisição
  const dadosAgenda = req.body; 
  try {
    // Busca o item da agenda pelo id
    const itemAgenda = await Agenda.findByPk(id);
    // Se o item não for encontrado, retorna status 404 (Not Found) com mensagem de erro
    if (!itemAgenda) {
      return res.status(404).json({ error: 'Item da agenda não encontrado' });
    }
    // Atualiza o item da agenda com os novos dados
    await itemAgenda.update(dadosAgenda);
    // Retorna o item atualizado com status 200 (OK)
    return res.status(200).json(itemAgenda);
  } catch (error) {
    // Em caso de erro, retorna status 500 (Internal Server Error) e o erro
    return res.status(500).json({ error: 'Erro ao atualizar o item da agenda' });
  }
}

// Função para mostrar os detalhes de um item da agenda
export const agendaShow = async (req, res) => {
  // Extrai o id dos parâmetros da requisição
  const { id } = req.params

  try {
    // Busca o item da agenda pelo id
    const agenda = await Agenda.findByPk(id)
    // Retorna o item encontrado com status 200 (OK)
    res.status(200).json(agenda)
  } catch (error) {
    // Em caso de erro, retorna status 400 (Bad Request) e o erro
    res.status(400).send(error)
  }
}

// Função para buscar datas bloqueadas de um profissional
export const getDatasBloqueadas = async (req, res) => {
  const { profissional } = req.query;

  // Verifica se o parâmetro "profissional" foi fornecido
  if (!profissional) {
    return res.status(400).json({ error: 'O campo "profissional" é obrigatório.' });
  }

  try {
    // Busca os agendamentos da profissional
    const agendamentos = await Agenda.findAll({
      where: { profissional },
      attributes: ['data', 'hora'], // Retorna apenas as colunas necessárias
    });

    // Organiza os agendamentos por data
    const datasOrganizadas = agendamentos.reduce((datas, agendamento) => {
      const hora = parseInt(agendamento.hora.split(':')[0], 10); // Extrai a hora
      const isManha = hora >= 9 && hora < 12; // Período da manhã
      const isTarde = hora >= 12 && hora <= 18; // Período da tarde

      // Inicializa a data no objeto se ainda não estiver presente
      if (!datas[agendamento.data]) {
        datas[agendamento.data] = { manha: 0, tarde: 0 };
      }

      // Conta os horários por período
      if (isManha) datas[agendamento.data].manha++;
      if (isTarde) datas[agendamento.data].tarde++;

      return datas;
    }, {});

    // Filtra as datas que atendem aos critérios de bloqueio
    const datasBloqueadas = Object.entries(datasOrganizadas)
      .filter(([data, { manha, tarde }]) => manha >= 1 && tarde >= 2)
      .map(([data]) => data); // Retorna apenas as datas

    return res.status(200).json(datasBloqueadas); // Retorna as datas bloqueadas
  } catch (error) {
    console.error('Erro ao buscar datas bloqueadas:', error);
    return res.status(500).json({ error: 'Erro ao buscar datas bloqueadas.' });
  }
};

