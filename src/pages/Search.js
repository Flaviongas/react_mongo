import './ui.css'
import Navbar from '../Navbar';
import { buildHtmlTable } from './utilityFunctions';


async function request() {
  document.getElementById("search").disabled = true;
  setTimeout(function() {
    document.getElementById("search").disabled = false;
  }, 2000);
  var div = document.getElementById("result")
  div.innerHTML = ""
  var select = Number(document.getElementsByName("search")[0].value);
  var body = document.getElementById('lname').value
  let response = await fetch("https://fair-kathy-flaviongas-08b2eb54.koyeb.app/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "option": select, "data": body })

  });

  let json = await response.json()

  if (json.length === 0 || typeof json == 'undefined') {
    div.innerHTML = "<b>Libro no encontrado</b>"
  }
  else {
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("created_at")) {
        delete it["created_at"]
      }
    });
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("updated_at")) {
        delete it["updated_at"]
      }
    });
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("id")) {
        delete it["id"]
      }
    });
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("title")) {
        it["Titulo"] = it.title;
        delete it["title"]
      }
    });
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("author")) {
        it["Autor"] = it.author;
        delete it["author"]
      }
    });
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("year")) {
        it["Año"] = it.year;
        delete it["year"]
      }
    });
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("editorial")) {
        it["Editorial"] = it.editorial;
        delete it["editorial"]
      }
    });
    Array.prototype.forEach.call(json, function(it) {
      if (it.hasOwnProperty("price")) {
        it["Precio"] = it.price;
        delete it["price"]
      }
    });
    div.appendChild(buildHtmlTable(json));

  }

}
export default function Search() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-1/2 mx-auto flex flex-col m-5'>
        <label className='text-center font-bold text-xl'>Tipo de busqueda</label>
        <select name="search" >
          <option value="1">Por ISBN</option>
          <option value="2">Por nombre</option>
          <option value="3">Mostrar todos los datos</option>
        </select>
        <input type="text" id="lname" name="lname" placeholder='Ingresa el parametro de busqueda' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 mb-5" />
        <button type="submit" value="Submit" id="search" className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={request}>Buscar libro</button>
      </div>
      <div id='result' className='w-3/4 mx-auto text-center'></div>
    </>
  );
}

