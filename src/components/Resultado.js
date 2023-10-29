import React from "react";

export default function Resultado({ datosClima }) {
  if (!datosClima) return null; // Si no hay datos, no renderizamos nada

  const { name, main, weather } = datosClima; //Extraemos los datos que necesitamos

  return (
    <div className="resultado">
      <h2>Weather in {name}</h2>
      <div className="weather-icon">
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
        alt={weather[0].description}
      />
      </div>
      <p>Temperatura: {main.temp} °C</p>
      <p>Max Temperature: {main.temp_max}</p>
      <p>Min Temperature: {main.temp_min}</p>
      <p>{weather[0].description}</p>
    </div>
  );
}
