import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getWeatherData } from "./weatherAPI";

export interface weatherOneState {
  temp: number;
  date: string;
  humidity: number;
}
export interface weathersState {
  weathers: weatherOneState[];
  status: "idle" | "loading" | "failed";
}

const initialState: weathersState = {
  weathers: [
    // { temp: 22, date: new Date().toISOString(), humidity: 44 },
    // { temp: -1, date: new Date(2020).toISOString(), humidity: 78 },
  ],
  status: "idle",
};

export const getWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    const data = await getWeatherData(city);
    return data;
  }
);

export const weather = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addWeather: (state) => {
      state.weathers.push();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.status = "idle";
        const newWeather = {
          temp: action.payload.main.temp,
          humidity: action.payload.main.humidity,
          date: new Date().toISOString(),
        };
        state.weathers.push(newWeather);
      });
  },
});

export const { addWeather } = weather.actions;

export const selectWeather = (state: RootState) => state;

export default weather.reducer;
