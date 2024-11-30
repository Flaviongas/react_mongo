
import './ui.css'
import Navbar from '../Navbar';

async function request() {
  document.getElementById("delete").disabled = true;
  setTimeout(function() {
    document.getElementById("delete").disabled = false;
  }, 2000);
  var select = Number(document.getElementsByName("delete")[0].value);
  var body = document.getElementById('lname').value
  var p = document.getElementById("result")
  if (select != null && body !== '') {

    let response = await fetch("https://fair-kathy-flaviongas-08b2eb54.koyeb.app/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "option": select, "data": body })

    });
    let answer = await response.text()
    console.log(answer)
    p.innerText = answer
  } else {
    p.innerText = "Ingrese un dato"

  }

}
export default function Delete() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-1/2 mx-auto flex flex-col m-5'>
        <label className='text-center font-bold text-xl'>Tipo de Borrado</label>
        <select name="delete" >
          <option value="1">Por ISBN</option>
          <option value="2">Por nombre</option>
        </select>
        <input type="text" id="lname" name="lname" placeholder='Ingresa el parametro de busqueda' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 mb-5" />
        <button type="submit" value="Submit" id='delete' className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={request}>Eliminar libro</button>
        <p id='result' className='mt-5 text-center font-bold'></p>
      </div>
    </>
  );
}

