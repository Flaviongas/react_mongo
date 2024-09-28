import './ui.css'
import Navbar from '../Navbar';
async function request() {
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
  if (json == null) {
    div.innerHTML = "Libro no encontrado"
  }
  else if (select === 3) {
    for (const key in json) {
      console.log();
      var para = document.createElement("p");
      para.style.textAlign = "center"
      var isbn = document.createTextNode(`ISBN: ${json[key].ISBN}`)
      var titulo = document.createTextNode(`
      Titulo: ${json[key].title}
`)
      var autor = document.createTextNode(`
Autor: ${json[key].author}
`)
      var edit = document.createTextNode(`
Editorial: ${json[key].editorial}
`)
      var precio = document.createTextNode(`
Precio: ${json[key].price}
`)
      var precioo = document.createTextNode(`
Año: ${json[key].year}
`);
      para.appendChild(isbn);
      para.appendChild(document.createElement('br'));
      para.appendChild(titulo);
      para.appendChild(document.createElement('br'));
      para.appendChild(autor);
      para.appendChild(document.createElement('br'));
      para.appendChild(edit);
      para.appendChild(document.createElement('br'));
      para.appendChild(precio);
      para.appendChild(document.createElement('br'));
      para.appendChild(precioo);
      para.appendChild(document.createElement('br'));
      div.appendChild(para);
      div.appendChild(document.createElement('br'));
    }
  } else {
    var para = document.createElement("p");
    para.style.textAlign = "center"
    var isbn = document.createTextNode(`ISBN: ${json.ISBN}`)
    var titulo = document.createTextNode(`
      Titulo: ${json.title}
`)
    var autor = document.createTextNode(`
Autor: ${json.author}
`)
    var edit = document.createTextNode(`
Editorial: ${json.editorial}
`)
    var precio = document.createTextNode(`
Precio: ${json.price}
`)
    var precioo = document.createTextNode(`
Año: ${json.year}
`);
    para.appendChild(isbn);
    para.appendChild(document.createElement('br'));
    para.appendChild(titulo);
    para.appendChild(document.createElement('br'));
    para.appendChild(autor);
    para.appendChild(document.createElement('br'));
    para.appendChild(edit);
    para.appendChild(document.createElement('br'));
    para.appendChild(precio);
    para.appendChild(document.createElement('br'));
    para.appendChild(precioo);
    para.appendChild(document.createElement('br'));
    div.appendChild(para);

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
        <button type="submit" value="Submit" className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={request}>Buscar</button>
        <div id='result'></div>
      </div>
    </>
  );
}

