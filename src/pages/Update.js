
import Navbar from '../Navbar';
//    ISBN: u64,
//option: u64,
//data: String,
async function request() {
  var isbn = Number(document.getElementsByName('isbn')[0].value)
  var select = Number(document.getElementsByName("option")[0].value);
  var data = document.getElementsByName('data')[0].value
  console.log(select)
  let response = await fetch("http://127.0.0.1:8080/update", {
    method: "POST",
    body: JSON.stringify({ "ISBN": isbn, "option": select, "data": data })

  });
  let answer = await response.text()
  console.log(answer)
  var p = document.getElementById("result")
  p.innerText = answer
  //localhost:8080/search -d '{ "option": 3, "data": "a" }'

}
export default function Update() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-1/2 mx-auto flex flex-col'>
        <label >ISBN:</label>
        <input type="text" id="lname" name="isbn" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

        <label >Que dato vas a modificar?</label>
        <select name="option" >
          <option value="1">Modificar ISBN</option>
          <option value="2">Modificar titulo</option>
          <option value="3">Modificar autor</option>
          <option value="4">Modificar año</option>
          <option value="5">Modificar editorial</option>
          <option value="6">Modificar precio</option>
        </select>
        <label >Nuevo dato:</label>
        <input type="text" id="lname" name="data" className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5' />
        <button type="submit" value="Modificar" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={request}>Modificar</button>
        <p id='result'></p>
      </div>
    </>
    //    ISBN: u64,
    //option: u64,
    //data: String,

  );
}

