import React, { useState } from "react";
import axios from "axios";

export default function Formulario({ setDatosClima, setCargando, setUsarGeolocalizacion }) {
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setCargando(true);

    const apiKey = process.env.REACT_APP_API_KEY;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`)
    .then(response => {
      setDatosClima(response.data);
      setCargando(false);
      setError(null);
    })
    .catch(error => {
      console.error("Error buscando el clima:", error)
      setCargando(false);
      setError("There was an error fetching the weather. Please try another city.");
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ingresa la ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />
      <button>Buscar Clima</button>
      { error && <p className="error">{error}</p> }
    </form>
  );
}
