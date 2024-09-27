import './App.css';
import Navbar from './Navbar';
import Mongo from './mongo.png';
function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className='w-3/4 mx-auto flex flex-col text-center'>
        <h1 className='text-2xl font-bold'>Bienvenido a la Base de Datos de Libros en MongoDB</h1>
        <img src={Mongo} alt="" className='w-1/2 mx-auto' />
        <p>Este proyecto fue hecho con React de Front-End y Tide (de Rust) de Back-End</p>
        <p>Después de apretar una opción, espere unos segundos</p>
      </div>
    </>
  );
}

export default App;

