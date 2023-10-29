import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Pronostico({ ciudad }) {
  const [dataPronostico, setDataPronostico] = useState(null);

  useEffect(() => {
    const apiKey = "0dae4fc53ada99bb77c5eacfec41a1ad";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=en`
      )
      .then((response) => {
        setDataPronostico(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the forecast", error);
      });
  }, [ciudad]);

  if (!dataPronostico) return null;

  return (
    <div className="pronostico">
      {dataPronostico.list.slice(0, 5).map((item, index) => (
        <div key={index}>
          <h4>{item.dt_txt}</h4>
          <p>Temp: {item.main.temp} °C</p>
          <p>{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}
