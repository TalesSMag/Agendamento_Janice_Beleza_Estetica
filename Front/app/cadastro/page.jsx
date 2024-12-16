'use client';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'; // Adicionando o useEffect para lidar com efeitos colaterais
//import { format } from 'date-fns';
//import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
//import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
//import $ from 'jquery';
import '../styles.css';

import 'react-toastify/dist/ReactToastify.css';

export default function Cadastro() {
  const { register, handleSubmit, reset, setValue  } = useForm();
  const router = useRouter();
  const [fotoProfissional, setFotoProfissional] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [profissionalSelecionada, setProfissionalSelecionada] = useState('');
  const [duracaoSelecionada, setDuracaoSelecionada] = useState('');
  const [clienteEncontrado, setClienteEncontrado] = useState(null);
  const [clientesSugestoes, setClientesSugestoes] = useState([]); // Estado para sugestões
  const [nomeCliente, setNomeCliente] = useState(""); // Estado para armazenar o nome digitado
  const [loading, setLoading] = useState(false);

  // Opções de descrição e duração baseadas nos serviços selecionados
  const descricaoOptions = {
    epilacao: [
      { descricao: "Axila", duracao: "30min" },
      { descricao: "Braço", duracao: "45min" },
      { descricao: "Buço", duracao: "20min" },
      { descricao: "Coxa", duracao: "1h" },
      { descricao: "Meia Perna", duracao: "45min" },
      { descricao: "Perna", duracao: "1h 30min" },
      { descricao: "Nariz", duracao: "15min" },
      { descricao: "Orelha", duracao: "10min" },
      { descricao: "Rosto", duracao: "40min" },
      { descricao: "Virilha", duracao: "1h" }
    ],
    manicure: [
      { descricao: "Mão simples", duracao: "30min" },
      { descricao: "Mão decorada", duracao: "45min" },
      { descricao: "Mão infantil", duracao: "20min" },
      { descricao: "Pé simples", duracao: "45min" },
      { descricao: "Pé decorado", duracao: "1h" },
      { descricao: "Mão em gel", duracao: "1h" },
      { descricao: "Blindagem e esmaltação tradicional", duracao: "1h 15min" },
      { descricao: "Blindagem e esmaltação em gel", duracao: "1h 30min" },
      { descricao: "Remoção de esmaltação em gel", duracao: "30min" },
      { descricao: "Spa de pés", duracao: "1h 30min" },
      { descricao: "Alongamento Fibra", duracao: "1h 30min" },
      { descricao: "Alongamento Gel moldado", duracao: "2h" },
      { descricao: "Manutenção", duracao: "1h" }
    ],
    limpezaPele: [
      { descricao: "Limpeza Profunda", duracao: "1h" },
      { descricao: "Limpeza Profunda com Extração de Cravos", duracao: "1h 30min" }
    ],
    alisamento: [
      { descricao: "Progressiva com formol", duracao: "2h" },
      { descricao: "Progressiva sem formol", duracao: "2h" },
      { descricao: "Semi definitiva", duracao: "2h 30min" },
      { descricao: "Botóx capilar celagem", duracao: "1h 30min" },
      { descricao: "Hidratação", duracao: "45min" },
      { descricao: "Nutrição", duracao: "1h" },
      { descricao: "Reconstrução", duracao: "1h 30min" },
      { descricao: "Tratamento linha Truus", duracao: "1h 15min" }
    ],
    cabelereira: [
      { descricao: "Corte", duracao: "45min" },
      { descricao: "Penteado", duracao: "1h" },
      { descricao: "Escova", duracao: "1h" },
      { descricao: "Mechas de papel", duracao: "1h 30min" },
      { descricao: "Barba", duracao: "30min" },
      { descricao: "Retoque de Raiz", duracao: "1h" },
      { descricao: "Coloração", duracao: "1h 15min" },
      { descricao: "Cronograma Capilar", duracao: "1h 30min" }
    ],
    ciliosSombrancelha: [
      { descricao: "Sombrancelha", duracao: "20min" },
      { descricao: "Design de Sombrancelha", duracao: "30min" },
      { descricao: "Design de Henna", duracao: "45min" },
      { descricao: "Design com coloração", duracao: "1h" },
      { descricao: "Lash Lifting", duracao: "1h 30min" },
      { descricao: "Extenção de cílios", duracao: "1h 15min" },
      { descricao: "Coloração", duracao: "30min" }
    ],
    massagista: [
      { descricao: "Massagem Relaxante", duracao: "1h" },
      { descricao: "Massagem Terapêutica", duracao: "1h 15min" },
      { descricao: "Drenagem Linfática", duracao: "45min" },
      { descricao: "Massagem com Pedras Quentes", duracao: "1h 30min" },
      { descricao: "Bamboo terapia", duracao: "1h 30min" },
      { descricao: "Pacote 4 sessões", duracao: "2h" }
    ]

  };

  //const today = new Date().toISOString().split('T')[0];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ajusta para o início do dia (00:00)

  // Converte para o formato 'yyyy-mm-dd' considerando o fuso horário local
  const formattedDate = today.toLocaleDateString('en-CA'); // 'en-CA' usa o formato 'yyyy-mm-dd'

  function bloquearDomingos(event) {
    const input = event.target; // Referência ao campo de entrada
    const selectedDate = new Date(input.value); // Data selecionada pelo usuário

    // Verifica se a data selecionada é domingo
    if (selectedDate.getDay() === 6) {
        alert("Domingos não podem ser selecionados."); // Mostra alerta
        input.value = ""; // Limpa o campo
    }
  }

  // Função para buscar dados do cliente baseado no nome
  // Função para buscar dados do cliente
const buscarCliente = async (nome) => {
  try {
    const response = await fetch(`http://localhost:3003/agendado_buscar/${nome}`);
    const clientes = await response.json();
    setLoading(false); // Define que a busca foi concluída

    if (clientes.length > 0) {
      setClientesSugestoes(clientes); // Atualiza as sugestões com os resultados
    } else {
      setClientesSugestoes([]); // Limpa as sugestões caso não haja clientes
    }
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    setLoading(false); // Define que a busca foi concluída, mesmo em caso de erro
  }
};


  // useEffect para chamar a função de busca toda vez que o nome mudar
  useEffect(() => {
    if (nomeCliente) {
      bussetLoading(true); // Define que está carregando os dados
      buscarCliente(nomeCliente);
    } else {
      setClientesSugestoes([]); // Limpa as sugestões se o campo estiver vazio
    }
  }, [nomeCliente]); // Dependência no nomeCliente para buscar as sugestões

  // Função para preencher os campos com os dados do cliente selecionado
  const preencherCampos = (cliente) => {
    setValue("contato", cliente.contato);
    setValue("nascimento", cliente.nascimento);
    setValue("endereco", cliente.endereco);
    setClienteEncontrado(cliente); // Marca que o cliente foi encontrado
    setClientesSugestoes([]); // Limpa as sugestões
    setNomeCliente(cliente.nome); // Preenche o nome automaticamente
  };

  // Função para tratar mudanças no nome do cliente
  const handleNomeChange = (e) => {
    const nome = e.target.value;
    setNomeCliente(nome); // Atualiza o nome digitado
  };
  
  // Mapeamento dos profissionais por serviço
  const profissionalOptions = {
    epilacao: "Janice Spindler",
    manicure: "Nome da Profissional Manicure",
    limpezaPele: "Luciane Blank",
    alisamento: "Janice Spindler",
    cabelereira: "Nome da Profissional Cabelereira",
    ciliosSombrancelha: "Lutieli",
    massagista: "Nome da Profissional Massagem",
  };

  // Atualiza o campo Profissional com base no serviço selecionado
  useEffect(() => {
    if (servicoSelecionado && profissionalOptions[servicoSelecionado]) {
      setProfissionalSelecionada(profissionalOptions[servicoSelecionado]);
      setValue("profissional", profissionalOptions[servicoSelecionado]);
    }
  }, [servicoSelecionado, setValue]);

  // Função para atualizar opções de descrição com base no serviço selecionado
  const handleServicoChange = (e) => {
    const servico = e.target.value;
    setServicoSelecionado(servico); // Atualiza o serviço selecionado
    setValue("descricao", ''); // Limpa o valor atual do campo de descrição
    setValue("duracao", ''); // Limpa o valor atual do campo de duração
  };

  // Atualiza a duração selecionada com base na descrição escolhida
  const handleDescricaoChange = (e) => {
    const descricaoSelecionada = e.target.value;
    const duracao = descricaoOptions[servicoSelecionado].find(descricao => descricao.descricao === descricaoSelecionada)?.duracao;
    setDuracaoSelecionada(duracao);
    setValue("duracao", duracao);
  };

  async function enviaDados(data) {
    console.log("Enviando dados:", data); // Log dos dados enviados
    try {
      const agendamento = await fetch("http://localhost:3003/agendar", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data })
      });
      
      //console.log("Resposta do servidor:", agendamento); // Log da resposta do servidor
      
      if (agendamento.status === 201) {
        toast.success("Ok! Agendamento cadastrado com sucesso");
        reset();
        setFotoProfissional(''); 
        
      } else if (agendamento.status === 409) { // Código de status 409 para conflito
        console.error("Conflito detectado");
        toast.error("Já existe um agendamento para este horário. Por favor, escolha outro horário ou verifique os agendamentos existentes.");
        
      } else {
        const errorData = await agendamento.json();
        
        console.error("Erro do servidor:", errorData); // Log dos dados de erro
        toast.error(`Erro... Não foi possível concluir o cadastro: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error); // Log de erros de requisição
      toast.error("Erro... Não foi possível concluir o cadastro");
    }
  }
  
  const handleFotoChange = (e) => {
    const foto = e.target.value;
    setFotoProfissional(foto ? `/${foto}` : '');
  };

  return (
    <div className="container">
      <h2 className="mt-2">Cadastro de Agendamento</h2>
      <form onSubmit={handleSubmit(enviaDados)}>

        <div className="container">
          <h4 className="mt-5 mb-2">Dados do Cliente</h4>
        </div>

        <div className="row">
          <div className="col-sm-8">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input type="text" className="form-control custom-border" id="nome" onChange={handleNomeChange} value={nomeCliente} {...register("nome")} required />
            {/* Exibe as sugestões de clientes em uma lista abaixo do campo */}
            {clientesSugestoes.length > 0 && (
              <ul className="list-group mt-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {loading && <p>Carregando...</p>}
                {clientesSugestoes.map((cliente) => (
                  <li
                    key={cliente.id}
                    className="list-group-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => preencherCampos(cliente)} // Preenche os campos ao selecionar
                  >
                    {cliente.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-sm-4">
            <label htmlFor="contato" className="form-label">Contato:</label>
            <input type="text" className="form-control custom-border" id="contato" {...register("contato")} required disabled={clienteEncontrado !== null} />
          </div>

          <div className="col-sm-6 mt-3">
            <label htmlFor="nascimento" className="form-label">Nascimento:</label>
            <input type="text" className="form-control custom-border" id="nascimento" {...register("nascimento")} required disabled={clienteEncontrado !== null} />
          </div>

          <div className="col-sm-6 mt-3">
            <label htmlFor="endereco" className="form-label">Endereco:</label>
            <input type="text" className="form-control custom-border" id="endereco" {...register("endereco")} required disabled={clienteEncontrado !== null} />
          </div>
        </div>

        <div className="container">
          <h4 className="mt-2 mb-2">Dados do Serviço</h4>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="servico" className="form-label">Serviços:</label>
            <select id="servico" className="form-select custom-border" {...register("servico")} required onChange={handleServicoChange}>
              <option value="">Selecione</option>
              <option value="epilacao">Epilação</option>
              <option value="manicure">Manicure</option>
              <option value="limpezaPele">Limpeza de Pele</option>
              <option value="alisamento">Alisamento Capilar</option>
              <option value="cabelereira">Cabelereira</option>
              <option value="ciliosSombrancelha">Cílios e Sobrancelha</option>
              <option value="massagista">Massagem</option>
            </select>
          </div>

          <div className="col-sm-6">
            <label htmlFor="profissional" className="form-label">Profissional:</label>
            <input type="text" className="form-control custom-border" id="profissional" {...register("profissional")} value={profissionalSelecionada} required />
          </div>

          <div className="col-sm-9 mt-3">
            <label htmlFor="descricao" className="form-label">Descricao:</label>
            <select id="descricao" className="form-select custom-border" {...register("descricao")} required onChange={handleDescricaoChange}>
              <option value="">Selecione</option>
              {descricaoOptions[servicoSelecionado] && descricaoOptions[servicoSelecionado].map((descricao, index) => (
                <option key={index} value={descricao.descricao}>{descricao.descricao}</option>
              ))}
            </select>
          </div>
          
          <div className="col-sm-3 mt-3">
            <label htmlFor="duracao" className="form-label">Duração:</label>
            <input type="text" className="form-control custom-border" id="duracao" {...register("duracao")} value={duracaoSelecionada} required />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-10">
            <label htmlFor="capa" className="form-label">Foto da Profissional:</label>
            <select id="capa" className="form-select custom-border" {...register("capa")} required onChange={handleFotoChange}>
              <option value="Logo.png">Selecione</option>
              <option value="logo_rosa.png">Rosa</option>
              <option value="logo_rosa_claro.png">Rosa Claro</option>
              <option value="logo_lilas.png">Roxo</option>
              <option value="logo_roxo.png">Lilás</option>
              <option value="logo_azul.png">Azul</option>
            </select>
          </div>
          <div className="col-sm-1 d-flex align-items">
            <h1 className="ms-1 mt-3">:</h1>
          </div>
          <div className="col-sm-1 d-flex justify-content-end align-items-center">
            {fotoProfissional && (
              <img 
                src={`${fotoProfissional}`} 
                alt="Foto da Profissional" 
                style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
              />
            )}
          </div>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="mt-2 mb-2">Dados de Agenda</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <label htmlFor="data" className="form-label">Data:</label>
            <input type="date" className="form-control custom-border" id="data"  min={formattedDate} {...register("data")} required onChange={bloquearDomingos} />
          </div>
          <div className="col-sm-3">
            <label htmlFor="hora" className="form-label">Hora:</label>
            <input type="time" className="form-control custom-border" id="hora" {...register("hora")} required min="09:00" max="18:00" />
          </div>
        </div>
        <br />
        <div className="button-container d-flex justify-content-between">
          <div className="d-flex">
            <input type="button" value="Limpar" className="btn btn-outline-custom-secondary me-2"
            onClick={() => {reset();  setProfissionalSelecionada('');  setDuracaoSelecionada('');}} />
            <input type="submit" value="Agendar" className="btn btn-custom-secondary text-white ms-2" />
          </div>
          <input type="button" value="Voltar" className="btn btn-custom-secondary text-white" 
            onClick={() => router.push('/')} />
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
  )
}
