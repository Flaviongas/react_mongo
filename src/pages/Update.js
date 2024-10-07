
import './ui.css'
import Navbar from '../Navbar';
async function request() {
  document.getElementById("update").disabled = true;
  setTimeout(function() {
    document.getElementById("update").disabled = false;
  }, 2000);
  var isbn = Number(document.getElementsByName('isbn')[0].value)
  var select = Number(document.getElementsByName("option")[0].value);
  var data = document.getElementsByName('data')[0].value
  console.log(select)
  let response = await fetch("https://flavio02.matyplop.cl/rust/update", {
    method: "POST",
    body: JSON.stringify({ "ISBN": isbn, "option": select, "data": data })

  });
  let answer = await response.text()
  console.log(answer)
  var p = document.getElementById("result")
  p.innerText = answer

}
export default function Update() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-1/2 mx-auto flex flex-col m-5'>
        <label className='text-center font-bold text-sm'>Ingresa el ISBN del libro</label>
        <input type="text" id="lname" name="isbn" placeholder='ISBN' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" />

        <label className='text-center font-bold text-sm'>¿Qué dato vas a modificar?</label>
        <select name="option" >
          <option value="1">Modificar ISBN</option>
          <option value="2">Modificar titulo</option>
          <option value="3">Modificar autor</option>
          <option value="4">Modificar año</option>
          <option value="5">Modificar editorial</option>
          <option value="6">Modificar precio</option>
        </select>
        <input type="text" id="lname" name="data" placeholder='Ingrese el dato nuevo' className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 mb-5' />
        <button type="submit" value="Submit" id='update' className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={request}>Modificar libro</button>
        <p id='result' className='mt-5 text-center font-bold'></p>
      </div>
    </>
    //    ISBN: u64,
    //option: u64,
    //data: String,

  );
}

