import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Pronostico from "./components/Pronostico";
import axios from "axios";
import "./App.css";
import { ClipLoader } from "react-spinners";

function App() {
  const [ciudad, setCiudad] = useState(""); // Añadido el estado para ciudad
  const [datosClima, setDatosClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const apiKey = '0dae4fc53ada99bb77c5eacfec41a1ad';
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`)
              .then(response => {
                  setDatosClima(response.data);
              })
              .catch(error => {
                  console.error("Error fetching weather by location:", error);
                  setError("There was an error fetching weather based on your location.");
              })
      }, (error) => {
          console.error("Error fetching geolocation:", error);
          setError("Couldn't fetch your location. Please enter a city.");
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setError("Your browser does not support geolocation. Please enter a city.");
    }
  }, []);

  return (
    <div className="app">
      {/* Si hay un error, lo mostramos */}
      {error && <p>{error}</p>}
      
      {/* Luego, si no estamos cargando datos, mostrar los resultados y el pronóstico */}
      {cargando ? (
        <ClipLoader color="#FFD700" size={50} />
      ) : (
        <>
          <Resultado datosClima={datosClima} />
          <Pronostico ciudad={ciudad} />
        </>
      )}

      {/* Finalmente, el formulario de búsqueda */}
      <Formulario
        setDatosClima={setDatosClima}
        setCargando={setCargando}
        setCiudad={setCiudad}
      />
    </div>
  );
}

export default App;
