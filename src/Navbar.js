import { Outlet, Link } from "react-router-dom";
import './navbar.css'
export default function Navbar() {
  return (
    <div className="container-fluid" id="navbar">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid min-h-24">
          <div className="mx-auto ">
            <ul className="nav navbar-nav flex flex-row justify-around pt-10">
              <li><Link id="len1" className="hoverable" to="/insert">Insertar Libro</Link></li>
              <li><Link id="len2" className="hoverable" to="/search">Buscar Libro(s)</Link></li>
              <li><Link id="len3" className="hoverable" to="/update">Modificar Libro</Link></li>
              <li><Link id="len4" className="hoverable" to="/delete">Eliminar Libro</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

