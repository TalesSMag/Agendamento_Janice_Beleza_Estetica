// Importa o hook useForm da biblioteca react-hook-form, que facilita a manipulação de formulários no React.
import { useForm } from "react-hook-form"

// Define o componente funcional Pesquisa. Ele recebe props como argumento.
export default function Pesquisa(props) {
  // Extrai as funções register e handleSubmit do hook useForm.
  const { register, handleSubmit } = useForm()
  
  // Retorna o JSX que define a estrutura do formulário.
  return (
    // Define um formulário com classes Bootstrap para organização e estilização.
    <form className="row row-cols-lg-auto-4 g-3"
      // Define a função a ser chamada no evento de submit do formulário. props.filtra é passada para handleSubmit.
      onSubmit={handleSubmit(props.filtra)}
      // Define a função a ser chamada no evento de reset do formulário. props.mostra é usada.
      onReset={props.mostra}>
      
      {/* Define um div para o campo de entrada do formulário */}
      <div className="col-sm-10">
        {/* Define um campo de entrada de texto com classes Bootstrap para estilização */}
        <input type="text" className="form-control custom-border mt-2"
          placeholder="Cliente / Serviço"
          // Usa a função register para registrar o campo de entrada com o nome "pesq".
          {...register("pesq")}/>
      </div>
      
      {/* Define um div para o botão de submit do formulário */}
      <div className="col-sm-2 mt-4">
        {/* Define um botão com estilo personalizado para submit */}
        <button className="btn" style={{backgroundColor: "#FF4747", color: "white"}} type="submit">
          {/* Inclui um ícone de pesquisa dentro do botão, usando SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </form>
  )
}
