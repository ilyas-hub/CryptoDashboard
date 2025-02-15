import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchCurrentPrice = createAsyncThunk(
  "crypto/fetchCurrentPrice",
  async (coin, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true`
      );
      return { coin, data: response.data };
    } catch (error) {
      console.error("Error fetching current price:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHistoricalData = createAsyncThunk(
  "crypto/fetchHistoricalData",
  async (coin, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`
      );
      return { coin, data: response.data };
    } catch (error) {
      console.error("Error fetching historical data:", error);
      return rejectWithValue(error.message);
    }
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    selectedCoin: "bitcoin",
    currentPrice: null,
    historicalData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPrice = action.payload.data;
      })
      .addCase(fetchCurrentPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHistoricalData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.loading = false;
        state.historicalData = action.payload.data;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCoin } = cryptoSlice.actions;

export default cryptoSlice.reducer;
