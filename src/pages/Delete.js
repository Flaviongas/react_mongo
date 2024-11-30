import { useState } from 'react';
import './ui.css';
import Navbar from '../Navbar';

export default function Delete() {
  const [select, setSelect] = useState(1);
  const [body, setBody] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async () => {
    if (!body) {
      setResult('Ingrese un dato');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://fair-kathy-flaviongas-08b2eb54.koyeb.app/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "option": select, "data": body })
      });

      const answer = await response.text();
      setResult(answer);
    } catch (error) {
      setResult('Error al eliminar el libro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto flex flex-col m-5">
        <label className="text-center font-bold text-xl">Tipo de Borrado</label>
        <select
          name="delete"
          value={select}
          onChange={(e) => setSelect(Number(e.target.value))}
        >
          <option value="1">Por ISBN</option>
          <option value="2">Por nombre</option>
        </select>

        <input
          type="text"
          id="lname"
          name="lname"
          placeholder="Ingresa el parametro de busqueda"
          className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 mb-5"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button
          type="button"
          id="delete"
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={handleRequest}
          disabled={isLoading}
        >
          {isLoading ? 'Eliminando...' : 'Eliminar libro'}
        </button>

        <p id="result" className="mt-5 text-center font-bold">{result}</p>
      </div>
    </>
  );
}

