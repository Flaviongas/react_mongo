import { useState } from "react";
import './ui.css';
import Navbar from '../Navbar';
import { buildHtmlTable } from './utilityFunctions';

async function request(isbn, option, data, setResponse, setLoading) {
  setLoading(true); 
  try {
    let response = await fetch("https://fair-kathy-flaviongas-08b2eb54.koyeb.app/api/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "ISBN": isbn, "option": option, "data": data })
    });

    let json = await response.json();

const removeProperties = ["updated_at", "created_at", "id"];
const renameProperties = {
  "title": "Titulo",
  "author": "Autor",
  "year": "Año",
  "editorial": "Editorial",
  "price": "Precio"
};

removeProperties.forEach(prop => delete json[prop]);

Object.entries(renameProperties).forEach(([oldKey, newKey]) => {
  if (json.hasOwnProperty(oldKey)) {
    json[newKey] = json[oldKey];
    delete json[oldKey];
  }
});
    setResponse(buildHtmlTable([json])); 
  } catch (error) {
    setResponse("Error al modificar el libro");
  } finally {
    setLoading(false); 
  }
}

export default function Update() {
  const [isbn, setIsbn] = useState("");  
  const [option, setOption] = useState(1); 
  const [data, setData] = useState(""); 
  const [response, setResponse] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = () => {
    if (isbn.length === 0 || isNaN(isbn)) {
      setResponse("ISBN no es un número");
      return;
    }
    request(Number(isbn), option, data, setResponse, setLoading); 
  };

  return (
    <>
      <Navbar />
      <div className='w-1/2 mx-auto flex flex-col m-5'>
        <label className='text-center font-bold text-sm'>Ingresa el ISBN del libro</label>
        <input
          type="text"
          name="isbn"
          placeholder='ISBN'
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
        />

        <label className='text-center font-bold text-sm'>¿Qué dato vas a modificar?</label>
        <select
          name="option"
          value={option}
          onChange={(e) => setOption(Number(e.target.value))}
        >
          <option value="1">Modificar ISBN</option>
          <option value="2">Modificar titulo</option>
          <option value="3">Modificar autor</option>
          <option value="4">Modificar año</option>
          <option value="5">Modificar editorial</option>
          <option value="6">Modificar precio</option>
        </select>

        <input
          type="text"
          name="data"
          placeholder='Ingrese el dato nuevo'
          value={data}
          onChange={(e) => setData(e.target.value)}
          className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 mb-5'
        />

        <button
          type="submit"
          value="Submit"
          id="update"
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={handleSubmit}
          disabled={loading} 
        >
          {loading ? "Modificando..." : "Modificar libro"}
        </button>

        <div id='answer-container' className='text-center'>
          {response && <div id="result" className='mt-5 text-center font-bold'>{response}</div>}
        </div>
      </div>
    </>
  );
}

