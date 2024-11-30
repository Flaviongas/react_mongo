import { useState } from 'react';
import Navbar from '../Navbar';
import './ui.css'



async function sendRequest() {
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
  try {

    const response = await fetch("https://fair-kathy-flaviongas-08b2eb54.koyeb.app/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "ISBN": ISBN, "title": title, "author": author, "year": year, "editorial": editorial, "price": price })

    });
    let answer = await response.text()
    var p = document.getElementById("result")
    p.innerText = answer
  } catch (error) {
    console.error(error)
  }

}
function input(inputData) {
  return (
    <>
      <label
        htmlFor={inputData}
        className="block text-sm font-medium text-gray-700"
      >{`Ingresa ${inputData}`}</label>

      <input type="text" name={inputData} placeholder={`Ingresa ${inputData}`} className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" />
    </>
  )
}
export default function Insert() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-1/2 mx-auto flex flex-col m-5'>
        {["ISBN", "Título", "Autor", "Año", "Editorial", "Precio"].map((field) =>
          input(field))}

        <button type="submit" value="Submit" id='insert' className="text-white focus:ring-4 focus:outline-none  font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={sendRequest}>Ingresar libro</button>
        <p id='result' className='mt-5 text-center font-bold'></p>
      </div>
    </>
  );
}
