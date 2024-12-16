"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { format } from 'date-fns'; // Importe a função format do date-fns para formatar a data

import "react-toastify/dist/ReactToastify.css";

export default function Alteracao() {
  const router = useRouter();
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function getAgendamento() {
      if (!params.id) return;
      
      try {
        const response = await fetch(
          "http://localhost:3003/agendado/" + params.id
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do agendamento");
        }
        const dado = await response.json();
        
        // Formata a data utilizando date-fns para o formato YYYY-MM-DD
        const dataFormatada = format(new Date(dado.data), 'yyyy-MM-dd');

        reset({
          nome: dado.nome,
          contato: dado.contato,
          nascimento: dado.nascimento,
          endereco: dado.endereco,
          servico: dado.servico,
          duracao: dado.duracao,
          descricao: dado.descricao,
          data: dataFormatada, // Atribui a data formatada ao campo data
          hora: dado.hora,
          profissional: dado.profissional,
          capa: dado.capa,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do agendamento:", error);
      }
    }
    getAgendamento();
  }, [params.id, reset]);

  async function alteraDados(data) {
    try {
      const response = await fetch(
        "http://localhost:3003/agendado_editar/" + params.id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao editar agendamento");
      }
      toast.success("Informações de agendamento alteradas com sucesso");
    } catch (error) {
      console.error("Erro ao editar agendamento:", error);
      toast.error("Erro ao editar agendamento");
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Editar Agendamento</h2>
      <form onSubmit={handleSubmit(alteraDados)}>
        <div className="container">
          <h4 className="mt-5 mb-2">Dados do Cliente</h4>
        </div>

        <div className="row">
          <div className="col-sm-9">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="nome"
              {...register("nome")}
              required
            />
          </div>

          <div className="col-sm-3">
            <label htmlFor="contato" className="form-label">
              Contato
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="contato"
              {...register("contato")}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-6">
            <label htmlFor="nascimento" className="form-label">
              Nascimento:
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="nascimento"
              {...register("nascimento")}
              required
            />
          </div>

          <div className="col-sm-6">
            <label htmlFor="endereco" className="form-label">
              Endereço:
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="endereco"
              {...register("endereco")}
              required
            />
          </div>
        </div>

        <div className="container">
          <h4 className="mt-2 mb-2">Dados do Serviço</h4>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="servico" className="form-label">
              Serviço:
            </label>
            <select
              id="servico"
              className="form-select custom-border"
              {...register("servico")}
              required
            >
              <option value="selecione">Selecione</option>
              <option value="epilacao">Epilação</option>
              <option value="manicure">Manicure</option>
              <option value="limpezaPele">Limpeza de Pele</option>
              <option value="alisamento">Alisamento Capilar</option>
              <option value="cabelereira">Cabelereira</option>
              <option value="massagista">Massagem</option>
            </select>
          </div>

          <div className="col-sm-6">
            <label htmlFor="duracao" className="form-label">
              Duração:
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="duracao"
              {...register("duracao")}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-12">
            <label htmlFor="descricao" className="form-label">
              Descrição:
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="descricao"
              {...register("descricao")}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-12">
            <label htmlFor="profissional" className="form-label">
              Profissional:
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="profissional"
              {...register("profissional")}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-12">
            <label htmlFor="capa" className="form-label">
              Foto da Profissional:
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="capa"
              {...register("capa")}
              required
            />
          </div>
        </div>

        <div className="container">
          <h4 className="mt-2 mb-2">Dados de Agenda</h4>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <label htmlFor="data" className="form-label">
              Data:
            </label>
            <input
              type="date"
              className="form-control custom-border"
              id="data"
              {...register("data")}
              required
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="hora" className="form-label">
              Horário:
            </label>
            <input
              type="text"
              className="form-control custom-border"
              id="hora"
              {...register("hora")}
              required
            />
          </div>
        </div>

        <br />
        <div className="button-container d-flex justify-content-between">
          <div className="d-flex">
            <input
              type="button"
              value="Limpar"
              className="btn btn-outline-custom-secondary me-2"
              onClick={() => reset()}
            />
            <input
              type="submit"
              value="Agendar"
              className="btn btn-custom-secondary text-white ms-2"
            />
          </div>
          <input
            type="button"
            value="Voltar"
            className="btn btn-custom-secondary text-white"
            onClick={() => router.push('/listagem')}
          />
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
