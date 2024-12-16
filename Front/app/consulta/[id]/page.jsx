"use client";
import Link from "next/link";
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

async function getAgendamento(id) {
  const response = await fetch(`http://localhost:3003/Agendado/${id}`);
  const dado = await response.json();
  return dado;
}

export default function Consulta({ params }) {
  const [agendamento, setAgendamento] = useState(null);

  useEffect(() => {
    async function fetchAgendamento() {
      const data = await getAgendamento(params.id);
      setAgendamento(data);
    }
    fetchAgendamento();
  }, [params.id]);

  if (!agendamento) {
    return <div>Carregando...</div>;
  }

  // Formatando a data
  const formattedDate = format(new Date(agendamento.data), 'dd/MM/yyyy');

  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Agendamento</h2>
      <form>
        <div className="row">
          <div className="col-sm-6">
            <p className="form-label">Capa da Profissional:</p>
            <img src={`/${agendamento.capa}`} alt={`Capa da Profissional ${agendamento.capa}`} width={210} height={210} className="mx-auto d-block" />
          </div>
          <div className="col-sm-12">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input type="text" className="form-control custom-border" id="nome" value={agendamento.nome} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="contato" className="form-label">Contato:</label>
            <input type="text" className="form-control custom-border" id="contato" value={agendamento.contato} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="nascimento" className="form-label">Nascimento:</label>
            <input type="text" className="form-control custom-border" id="nascimento" value={agendamento.nascimento} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="endereco" className="form-label">Endereço:</label>
            <input type="text" className="form-control custom-border" id="endereco" value={agendamento.endereco} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="servico" className="form-label">Serviço:</label>
            <input type="text" className="form-control custom-border" id="servico" value={agendamento.servico} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="descricao" className="form-label">Descrição:</label>
            <input type="text" className="form-control custom-border" id="descricao" value={agendamento.descricao} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="duracao" className="form-label">Duração:</label>
            <input type="text" className="form-control custom-border" id="duracao" value={agendamento.duracao} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="data" className="form-label">Data:</label>
            <input type="text" className="form-control custom-border" id="data" value={formattedDate} readOnly />
          </div>
          <div className="col-sm-6 mt-2">
            <label htmlFor="hora" className="form-label">Hora:</label>
            <input type="text" className="form-control custom-border" id="hora" value={agendamento.hora} readOnly />
          </div>
          <div className="col-sm-12 mt-2">
            <label htmlFor="profissional" className="form-label">Profissional:</label>
            <input type="text" className="form-control custom-border" id="profissional" value={agendamento.profissional} readOnly />
          </div>
        </div>
        <br />
        <button className="btn btn-outline-custom-secondary float-end mb-3 w-auto px-3 py-2">
          <Link className="link-custom" href="/listagem">Voltar</Link>
        </button>
      </form>
    </div>
  );
}
