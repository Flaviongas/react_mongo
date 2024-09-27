
import Navbar from '../Navbar';

async function request() {
  var select = Number(document.getElementsByName("delete")[0].value);
  var body = document.getElementById('lname').value
  if (select != null) {

    let response = await fetch("http://127.0.0.1:8080/delete", {
      method: "POST",
      body: JSON.stringify({ "option": select, "data": body })

    });
    let answer = await response.text()
    console.log(answer)
    var p = document.getElementById("result")
    p.innerText = answer
  } else {
    p.innerText = "Libro no encontrado"

  }
  //localhost:8080/search -d '{ "option": 3, "data": "a" }'

}
export default function Delete() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-1/2 mx-auto flex flex-col'>
        <label >Tipo Borrado</label>
        <select name="delete" >
          <option value="1">Por ISBN</option>
          <option value="2">Por nombre</option>
        </select>
        <label >Ingresa el dato:</label>
        <input type="text" id="lname" name="lname" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" />
        <button type="submit" value="Borrar" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={request}>Borrar</button>
        <p id='result'></p>
      </div>
    </>
  );
}

