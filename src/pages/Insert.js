import Navbar from '../Navbar';
import './ui.css'
async function request() {
  document.getElementById("insert").disabled = true;
  setTimeout(function() {
    document.getElementById("insert").disabled = false;
  }, 2000);
  var ISBN = Number(document.getElementsByName("ISBN")[0].value);
  var title = document.getElementsByName("title")[0].value
  var author = document.getElementsByName("author")[0].value
  var year = Number(document.getElementsByName("year")[0].value);
  var editorial = document.getElementsByName("editorial")[0].value
  var price = Number(String(document.getElementsByName("price")[0].value).replace('.', ''));
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
      <div className='w-1/2 mx-auto flex flex-col m-5'>
        <input type="text" id="lname" name="ISBN" placeholder='Ingresa ISBN' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" />
        <input type="text" id="lname" name="title" placeholder='Ingresa titulo' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" />
        <input type="text" id="lname" name="author" placeholder='Ingresa autor' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" />
        <input type="text" id="lname" name="year" placeholder='Ingresa año' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" />
        <input type="text" id="lname" name="editorial" placeholder=' Ingresa editorial' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" />
        <input type="text" id="lname" name="price" placeholder=' Ingresa precio' className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 mb-5" />

        <button type="submit" value="Submit" id='insert' className="text-white focus:ring-4 focus:outline-none  font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={request}>Ingresar libro</button>
        <p id='result' className='mt-5 text-center font-bold'></p>
      </div>
    </>
  );
}
