import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./ui.css";

async function sendRequest(bookData, setResponse, setDisabled) {
  setDisabled(true);
  try {
    const response = await fetch(
      "https://fair-kathy-flaviongas-08b2eb54.koyeb.app/api/insert",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      }
    );

    const answer = await response.text();
    setResponse(answer);
  } catch (error) {
    setResponse("Error: Could not send data");
    console.error(error);
  } finally {
    setTimeout(() => setDisabled(false), 2000);
  }
}

export default function Insert() {
  const [formData, setFormData] = useState({
    ISBN: "",
    title: "",
    author: "",
    year: "",
    editorial: "",
    price: "",
  });
  const [response, setResponse] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const mapping = {
      "ISBN": "ISBN",
      "Título": "title",
      "Autor": "author",
      "Año": "year",
      "Editorial": "editorial",
      "Precio": "price"
    }
    setFormData({ ...formData, [mapping[name]]: value });
  };

  const handleSubmit = async () => {
    const formattedData = {
      ISBN: Number(formData.ISBN),
      title: formData.title,
      author: formData.author,
      year: Number(formData.year),
      editorial: formData.editorial,
      price: Number(String(formData.price).replace(".", "")),
    };
    await sendRequest(formattedData, setResponse, setDisabled);
  };

  return (
    <>
      <Navbar />
      <div className="w-1/2 mx-auto flex flex-col m-5">
        {["ISBN", "Título", "Autor", "Año", "Editorial", "Precio"].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700"
            >
              {`Ingresa ${field}`}
            </label>
            <input
              type={field === "ISBN" || field === "Año" || field === "Precio" ? "number" : "text"}
              id={field}
              name={field}
              placeholder={`Ingresa ${field}`}
              value={formData[field]}
              onChange={handleChange}

              onKeyDown={(e) => {
                if (field === "ISBN" || field === "Año" || field === "Precio") {
                  if (!/[0-9]|Backspace|Tab|Enter|Delete|ArrowLeft|ArrowRight/.test(e.key)) {
                    e.preventDefault();
                  }
                }
              }}

              className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
            />
          </div>
        ))}
        <button
          type="button"
          id="insert"
          disabled={disabled}
          className={`text-white focus:ring-4 focus:outline-none font-medium rounded-2xl text-sm w-full sm:w-auto px-5 py-2.5 text-center ${disabled ? "bg-gray-400" : "bg-pink-500"
            }`}
          onClick={handleSubmit}
        >
          {disabled ? "Enviando..." : "Ingresar libro"}
        </button>
        <p id="result" className="mt-5 text-center font-bold">
          {response}
        </p>
      </div>
    </>
  );
}


