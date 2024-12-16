import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

export default function ItemLista(props) {
  const [imageError, setImageError] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [naoConfirmado, setNaoConfirmado] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const confirmadoState = localStorage.getItem(`confirmado-${props.agendamento.id}`);
    const naoConfirmadoState = localStorage.getItem(`naoConfirmado-${props.agendamento.id}`);
    if (confirmadoState) {
      setConfirmado(JSON.parse(confirmadoState));
    }
    if (naoConfirmadoState) {
      setNaoConfirmado(JSON.parse(naoConfirmadoState));
    }
  }, [props.agendamento.id]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`confirmado-${props.agendamento.id}`, JSON.stringify(confirmado));
  }, [confirmado, props.agendamento.id]);

  useEffect(() => {
    localStorage.setItem(`naoConfirmado-${props.agendamento.id}`, JSON.stringify(naoConfirmado));
  }, [naoConfirmado, props.agendamento.id]);

  function confirmaExclusao(id, nome) {
    Swal.fire({
      title: `Confirma Exclusão do Agendamento de "${nome}"?`,
      text: "Esta operação não poderá ser desfeita",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF4747",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim. Excluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.exclui(id);
        Swal.fire("Excluído!", "Agendamento excluído com sucesso", "success");
      }
    });
  }

  console.log('URL da imagem:', props.agendamento.capa);

  const formattedDate = format(new Date(props.agendamento.data), 'dd/MM/yyyy');

  return (
    <tr>
      <td>
        <img
          src={imageError ? '/Logo.png' : `/${props.agendamento.capa}`}
          alt={`Capa de ${props.agendamento.profissional}`}
          width={80}
          onError={() => setImageError(true)}
        />
      </td>
      <td className={props.agendamento.destaque ? "fw-bold" : ""}>
        {props.agendamento.nome}
      </td>
      <td className={props.agendamento.destaque ? "fw-bold" : ""}>
        {props.agendamento.servico}
      </td>
      <td className={props.agendamento.destaque ? "fw-bold" : ""}>
        {props.agendamento.descricao}
      </td>
      <td className={props.agendamento.destaque ? "fw-bold" : ""}>
        {formattedDate}
      </td>
      <td className={props.agendamento.destaque ? "fw-bold" : ""}>
        {props.agendamento.hora}
      </td>
      <td>
        <i
          className={`bi ${confirmado ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} text-custom ms-2`}
          style={{ fontSize: 15, cursor: "pointer" }}
          onClick={() => {
            setConfirmado(!confirmado);
            setNaoConfirmado(false); // To ensure only one state is active at a time
          }}
          title="Confirmar"
        ></i>
        <i
          className={`bi ${naoConfirmado ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'} text-custom ms-2`}
          style={{ fontSize: 15, cursor: "pointer" }}
          onClick={() => {
            setNaoConfirmado(!naoConfirmado);
            setConfirmado(false); // To ensure only one state is active at a time
          }}
          title="Não Confirmar"
        ></i>
        <i
          className="bi bi-trash-fill text-custom ms-2"
          style={{ fontSize: 15, cursor: "pointer" }}
          onClick={() =>
            confirmaExclusao(props.agendamento.id, props.agendamento.nome)
          }
          title="Excluir"
        ></i>
        <i
          className="bi bi-pencil-square text-custom ms-2"
          style={{ fontSize: 15, cursor: "pointer" }}
          onClick={props.altera}
          title="Alterar"
        ></i>
        <i
          className="bi bi-search text-custom ms-2"
          style={{ fontSize: 15, cursor: "pointer" }}
          onClick={props.consulta}
          title="Consultar"
        ></i>
      </td>
    </tr>
  );
}
