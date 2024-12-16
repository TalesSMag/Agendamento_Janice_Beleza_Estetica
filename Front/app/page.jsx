import './styles.css';
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <>
    <Logo />
    <div className="container d-flex justify-content-center">
      <ul className="navbar-nav d-flex flex-row">
        <li className="nav-item mx-5">
          <Link className="btn btn-outline-custom-secondary fs-1 btn-lg text-dark" width="500px" href="/cadastro">
            Agendar
            <div className="icon">
              <i className="bi bi-plus-circle"></i>
            </div>
          </Link>
        </li>
        <li className="nav-item mx-5">
          <Link className="btn btn-outline-custom-secondary fs-1 btn-lg text-dark" width="500px" href="/listagem">
            Agendados
            <div className="icon">
              <i className="bi bi-list-task"></i>
            </div>
          </Link>
        </li>
      </ul>
    </div>
    </>
  )
}
