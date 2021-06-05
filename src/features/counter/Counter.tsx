import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getWeather, selectWeather } from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const weather = useAppSelector(selectWeather);
  console.log("weather", weather);

  const dispatch = useAppDispatch();
  const [city, setCity] = useState("Moscow");

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className={styles.asyncButton}
          onClick={() => dispatch(getWeather(city))}
        >
          Add Async
        </button>

        <button
          className={styles.asyncButton}
          onClick={() => dispatch(getWeather(city))}
        >
          asdfasdfasd
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "98%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid black",
              width: "33%",
            }}
          >
            Текущее время
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid black",
              width: "33%",
            }}
          >
            Температура в градусах
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid black",
              width: "33%",
            }}
          >
            Влажность
          </div>
        </div>

        {weather.weather.weathers.length > 0 &&
          weather.weather.weathers.map((el) => {
            return (
              <div
                style={{ display: "flex", alignItems: "center", width: "98%" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid black",
                    width: "33%",
                  }}
                >
                  {el.date.toTimeString()}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid black",
                    width: "33%",
                  }}
                >
                  {el.temp}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid black",
                    width: "33%",
                  }}
                >
                  {el.humidity}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
