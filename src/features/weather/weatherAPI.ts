import axios from "axios";

const appid = "8d5d2efaf908a560bb20f65fb9c79c4e";
export async function getWeatherData(city: string) {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`
    );

    return data;
  } catch (error) {
    console.log("error", error);
  }
}
