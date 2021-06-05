import { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getWeather, selectWeather, weatherOneState } from "./weatherSlice";
import styles from "./Weather.module.css";

interface SortParametr {
  value: "date" | "temp" | "humidity";
  asc: boolean;
}

export function Weather() {
  const { weather } = useAppSelector(selectWeather);

  const dispatch = useAppDispatch();
  const [city, setCity] = useState("Moscow");
  const [sortParametr, setSortParametr] = useState<SortParametr>({
    value: "temp",
    asc: true,
  });
  const [sortingData, setSortingData] = useState<weatherOneState[]>(
    weather.weathers
  );
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<any>();

  const isCold: boolean =
    weather.weathers?.[weather.weathers.length - 1]?.temp < 0;

  const changeSortParametr = (value: "date" | "temp" | "humidity") => {
    if (value === sortParametr.value) {
      return setSortParametr((prev) => ({ ...prev, asc: !prev.asc }));
    }
    setSortParametr({ value, asc: false });
  };

  const sorting = useCallback(
    (weathers: weatherOneState[], sortParametr: SortParametr) => {
      const newSortingData = [...weathers].sort(
        (a: weatherOneState, b: weatherOneState) => {
          if (a[sortParametr.value] > b[sortParametr.value]) {
            return sortParametr.asc ? -1 : 1;
          }

          if (a[sortParametr.value] < b[sortParametr.value]) {
            return sortParametr.asc ? 1 : -1;
          }

          return 0;
        }
      );

      setSortingData(newSortingData);
    },
    [setSortingData]
  );

  useEffect(() => {
    if (weather.weathers.length > 0) {
      sorting(weather.weathers, sortParametr);
    }
  }, [weather, sortParametr, setSortingData, sorting]);

  const monitoring = () => {
    if (isMonitoring) {
      dispatch(getWeather(city));
      const newInterval = setInterval(() => dispatch(getWeather(city)), 30000);
      setIntervalId(newInterval);
    } else {
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    monitoring();
  }, [isMonitoring, city]);

  return (
    <div className={`${styles.container} ${isCold && styles.cold}`}>
      <div className={styles.header}>
        <div className={styles.textbox}>
          Введите нужный город
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <button
          className={`${styles.monitoringButton} ${
            isMonitoring && styles.activeMonitoing
          }`}
          onClick={() => setIsMonitoring((prev) => !prev)}
        >
          {isMonitoring ? "Закончить мониторинг" : "Начать мониторинг"}
        </button>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableRow}>
          <div
            className={styles.tableCell}
            onClick={() => changeSortParametr("date")}
          >
            Текущее время
          </div>
          <div
            className={styles.tableCell}
            onClick={() => changeSortParametr("temp")}
          >
            Температура в градусах
          </div>
          <div
            className={styles.tableCell}
            onClick={() => changeSortParametr("humidity")}
          >
            Влажность
          </div>
        </div>

        {sortingData.length > 0 &&
          sortingData.map((el) => {
            return (
              <div key={el.date} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  {new Date(el.date).toLocaleTimeString()}
                </div>
                <div className={styles.tableCell}>{el.temp}</div>
                <div className={styles.tableCell}>{el.humidity}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
