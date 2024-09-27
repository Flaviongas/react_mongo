import Navbar from '../Navbar';
async function help() {
  var ISBN = Number(document.getElementsByName("ISBN")[0].value);
  var title = document.getElementsByName("title")[0].value
  var author = document.getElementsByName("author")[0].value
  var year = Number(document.getElementsByName("year")[0].value);
  var editorial = document.getElementsByName("editorial")[0].value
  var price = Number(document.getElementsByName("price")[0].value);
  let response = await fetch("https://flavio02.matyplop.cl/rust/insert", {
    method: "POST",
    body: JSON.stringify({ "ISBN": ISBN, "title": title, "author": author, "year": year, "editorial": editorial, "price": price })

  });
  let answer = await response.text()
  console.log(answer)
  var p = document.getElementById("result")
  p.innerText = answer
  //ISBN: u64,
  //title: String,
  //author: String,
  //year: u64,
  //editorial: String,
  //price: u64,
  //

}
export default function Insert() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-1/2 mx-auto flex flex-col'>
        <label >ISBN</label>
        <input type="text" id="lname" name="ISBN" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <label >Titulo</label>
        <input type="text" id="lname" name="title" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <label >Autor</label>
        <input type="text" id="lname" name="author" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <label >Año</label>
        <input type="text" id="lname" name="year" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <label >Editorial</label>
        <input type="text" id="lname" name="editorial" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <label >Precio</label>
        <input type="text" id="lname" name="price" className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" />

        <button type="submit" value="Insertar" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={help}>Insertar</button>
        <p id='result' className='mt-5'></p>
      </div>
    </>
  );
}
