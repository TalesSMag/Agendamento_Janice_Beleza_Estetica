'use client'
import { useEffect, useState } from "react"
import ItemLista from "@/components/ItemLista"
import { useRouter } from "next/navigation"
import Pesquisa from "@/components/Pesquisa"
import '../styles.css';
import { format } from 'date-fns';

export default function Listagem() {

  const [agendamentos, setAgendamentos] = useState([])
  const [agendamentosFiltrado, setAgendamentosFiltrados ] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [opcaoOrdenacao, setOpcaoOrdenacao] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1);

  const router = useRouter()
  
  useEffect(() => {
    async function getAgendamentos() {
      const response = await fetch("http://localhost:3003/agendados")
      const dados = await response.json()
      console.log("Dados recebidos:", dados); // Log para verificar os dados recebidos da API
      setAgendamentosFiltrados(dados)
      setIsLoading(false)
    }
    getAgendamentos()
  }, [])
  
  const itensPorPagina = 10; // Exibir 10 itens por página

  function getAgendamentosPorPagina() {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return agendamentosFiltrado.slice(inicio, fim);
  }
  
  function Paginas() {
    const totalPaginas = Math.ceil(agendamentosFiltrado.length / itensPorPagina);
  
    return (
      <div className="d-flex justify-content-center m-3">
        <button
          className="paginacao-button me-2"
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
        >
          Anterior
        </button>
        <span className="paginacao-info">Página {paginaAtual} de {totalPaginas}</span>
        <button
          className="paginacao-button ms-2"
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próxima
        </button>
      </div>
    );
  }
  

  async function excluiAgendamento(id) {
    const response = await fetch("http://localhost:3003/agendado_delete/" + id, {
      method: "DELETE"
    })
    const novosDados = agendamentos.filter(agendamento => agendamento.id != id)
    setAgendamentosFiltrados(novosDados)
  }

  async function destacaAgendamento(id, dest_atual) {
    await fetch("http://localhost:3003/agendados/" + id,
      {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ destaque: !dest_atual })
      })
    const indiceAlterado = agendamentos.findIndex(agendamento => agendamento.id == id)
    const novosDados = [...agendamentos]
    novosDados[indiceAlterado].destaque = !dest_atual
    setAgendamentos(novosDados)
  }

  const listaAgendamentos =  getAgendamentosPorPagina().map(agendamento => (
    <ItemLista key={agendamento.id}
      agendamento={agendamento}
      exclui={() => excluiAgendamento(agendamento.id)}
      altera={() => router.push('altera/' + agendamento.id)}
      consulta={() => router.push('consulta/' + agendamento.id)}
      destaca={() => destacaAgendamento(agendamento.id, agendamento.destaque)}
    />
  ))

  function BuscaAgendamentos(data) {
    const pesquisa = data.pesq.toUpperCase()
    async function getAgendamento() {
      const response = await fetch("http://localhost:3003/agendados")
      const dados = await response.json()

      const novosDados = dados.filter(agendamentos =>
        agendamentos.nome.toUpperCase().includes(pesquisa) || agendamentos.servico.toUpperCase().includes(pesquisa)
      )
      setAgendamentosFiltrados(novosDados)

      // Reiniciar a página para exibir os resultados corretamente
      setPaginaAtual(1);
    }
    getAgendamento()
  }

  function ordenarSelecione() {
    const agendamentosOrdenados = [...agendamentos].sort((a, b) => a.data.localeCompare(b.data));
    setAgendamentosFiltrados(agendamentosOrdenados);
  }

  function ordenarData() {
    const agendamentosOrdenados = [...agendamentos].sort((a, b) => new Date(b.data) - new Date(a.data)); // Mais recente primeiro
    setAgendamentosFiltrados(agendamentosOrdenados);
  }

  function ordenarPorDataAtual() {
    const hoje = format(new Date(), 'yyyy-MM-dd'); // Obtém a data de hoje no formato YYYY-MM-DD
    console.log("Data de hoje:", hoje); // Log para verificar a data de hoje
    const agendamentosDoDia = agendamentos.filter(agendamento => {
      const dataAgendamento = format(new Date(agendamento.data), 'yyyy-MM-dd'); // Formata a data do agendamento para YYYY-MM-DD
      console.log("Data do agendamento:", dataAgendamento); // Log para verificar a data do agendamento
      return dataAgendamento === hoje;
    });
    console.log("Agendamentos de hoje:", agendamentosDoDia); // Log para verificar os agendamentos do dia
    setAgendamentosFiltrados(agendamentosDoDia);
  }

  function ordenarAgendamentos() {
    switch (opcaoOrdenacao) {
      case 'selecione':
        ordenarSelecione();
        break;
      case 'data':
        ordenarData();
        break;
      case 'hoje':
        ordenarPorDataAtual();
        break;
      default:
        mostraTodos();
        break;
    }
  }

  useEffect(() => {
    ordenarAgendamentos();
  }, [opcaoOrdenacao]);

  function mostraTodos() {
    async function getAgendamentos() {
      const response = await fetch("http://localhost:3003/agendados");
      const dados = await response.json();
      setAgendamentos(dados);
      setIsLoading(false);
    }
    getAgendamentos();
  }

  if (isLoading) {
    return (
      <div className="container">
        <h2>Listagem de Agendamentos</h2>
        <h5>Aguarde... Carregando os dados</h5>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="col-sm-6 mt-3">Listagem de Agendamentos</h2>
        <div className="col-sm-6 mt-2"> 
          <Pesquisa filtra={BuscaAgendamentos} mostra={mostraTodos} />
        </div>
        <div className="col-sm-12 mt-3">
          <select className="form-select custom-border" value={opcaoOrdenacao} onChange={(e) => setOpcaoOrdenacao(e.target.value)}>
            <option value="selecione">Selecione</option>
            <option value="data">Mais Recentes</option>
            <option value="hoje">Agendamentos de Hoje</option>
          </select>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Capa</th>
            <th>Nome</th>
            <th>Serviço</th>
            <th>Descrição</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaAgendamentos}
        </tbody>
      </table>
      <Paginas />
    </div>
  )
}
