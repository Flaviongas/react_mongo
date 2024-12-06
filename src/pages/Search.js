import { useState, useEffect } from "react";
import './ui.css';
import Navbar from '../Navbar';
import { buildHtmlTable } from './utilityFunctions';

async function request(select, body, setResponse, setLoading) {
  setLoading(true);
  let response = await fetch("https://fair-kathy-flaviongas-08b2eb54.koyeb.app/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "option": select, "data": body })
  });

  let json = await response.json();

  if (json.length === 0 || typeof json === 'undefined') {
    setResponse("<b>Libro no encontrado</b>");
  } else {
    console.log(json)
    const propertyMapping = {
      "title": "Titulo",
      "author": "Autor",
      "year": "Año",
      "editorial": "Editorial",
      "price": "Precio"
    };

    json.forEach(it => {
      ["created_at", "updated_at", "id"].forEach(prop => {
        if (Object.hasOwn(it, prop)) {
          delete it[prop];
        }
      });

      Object.entries(propertyMapping).forEach(([oldKey, newKey]) => {
        if (Object.hasOwn(it, oldKey)) {
          it[newKey] = it[oldKey];
          delete it[oldKey];
        }
      });
    });

    setResponse(buildHtmlTable(json));
  }

  setLoading(false);
}

export default function Search() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (select === 3) {
      //add
      setIsHidden(true)
      console.log("TRUE")
    } else {

      console.log("FALSE")
      setIsHidden(false)
    }
  }, [select]);

  const handleSearch = () => {
    request(select, searchTerm, setResponse, setLoading);
  };

  return (
    <>
      <Navbar />
      <div className='w-1/2 mx-auto flex flex-col m-5'>
        <label className='text-center font-bold text-xl'>Tipo de busqueda</label>
        <select
          name="search"
          value={select}
          onChange={(e) => setSelect(Number(e.target.value))}
        >
          <option value="1">Por ISBN</option>
          <option value="2">Por nombre</option>
          <option value="3">Mostrar todos los datos</option>
        </select>
        <input
          type="text"
          id="lname"
          name="lname"

          style={{ display: isHidden ? 'none' : 'block' }}
          placeholder='Ingresa el parametro de busqueda'
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 mb-5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          value="Submit"
          id="search"
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar libro"}
        </button>
      </div>
      <div id='result' className='w-3/4 mx-auto text-center'>
        {response}
      </div>
    </>
  );
}
