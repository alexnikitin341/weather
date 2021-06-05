import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getWeatherData } from "./counterAPI";

export interface weatherOneState {
  temp: number;
  date: Date;
  humidity: number;
}
export interface weathersState {
  weathers: weatherOneState[];
  status: "idle" | "loading" | "failed";
}

const initialState: weathersState = {
  weathers: [],
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
    addWeather: (state, action) => {
      console.log("action", action);

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
          date: new Date(),
        };
        state.weathers.push(newWeather);
      });
  },
});

export const { addWeather } = weather.actions;

export const selectWeather = (state: RootState) => state;

export default weather.reducer;
