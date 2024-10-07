import './ui.css'
import Navbar from '../Navbar';
var _table_ = document.createElement('table'),
  _tr_ = document.createElement('tr'),
  _th_ = document.createElement('th'),
  _td_ = document.createElement('td');

function buildHtmlTable(arr) {
  var table = _table_.cloneNode(false),
    columns = addAllColumnHeaders(arr, table);
  for (var i = 0, maxi = arr.length; i < maxi; ++i) {
    var tr = _tr_.cloneNode(false);
    for (var j = 0, maxj = columns.length; j < maxj; ++j) {
      var td = _td_.cloneNode(false);
      var cellValue = arr[i][columns[j]];
      td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

function addAllColumnHeaders(arr, table) {
  var columnSet = [],
    tr = _tr_.cloneNode(false);
  for (var i = 0, l = arr.length; i < l; i++) {
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
        columnSet.push(key);
        var th = _th_.cloneNode(false);
        th.appendChild(document.createTextNode(key));
        tr.appendChild(th);
      }
    }
  }
  table.appendChild(tr);
  return columnSet;
}
async function request() {
  document.getElementById("search").disabled = true;
  setTimeout(function() {
    document.getElementById("search").disabled = false;
  }, 2000);
  var div = document.getElementById("result")
  div.innerHTML = ""
  var select = Number(document.getElementsByName("search")[0].value);
  var body = document.getElementById('lname').value
  let response = await fetch("https://flavio02.matyplop.cl/rust/search", {
    method: "POST",
    body: JSON.stringify({ "option": select, "data": body })

  });
  let json = await response.json()
  console.log(json)
  if (json.length === 0) {
    div.innerHTML = "Libro no encontrado"
    div.style.textAlign = "center"
    div.style.margin = "15px"
  }
  else {

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

