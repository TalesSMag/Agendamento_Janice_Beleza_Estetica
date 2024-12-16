import Link from "next/link";
import './styles.css';

export default function Logo() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container justify-content-center">
        <Link className="navbar-brand" href="/">
          <img
            src="../logo_em_cima.png"
            alt="Logo"
            className="logo"
          />
          <h2 className="float-end mt-2 ms-2 text-white"></h2>
        </Link>
      </div>
    </nav>
  );
}
