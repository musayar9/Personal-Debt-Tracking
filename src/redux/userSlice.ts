import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("login", async (formData) => {
  try {
    const res = await fetch("https://study.logiper.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    console.log(res);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
});

interface UserState {
  user: object | null;
  error: string |  null;
  userStatus: string;
}

const initialState: UserState = {
  user: null,
  error: null ,
  userStatus: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.userStatus = "loading";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      (state.userStatus = "success"), (state.user = action.payload);
    });

    builder.addCase(login.rejected, (state, action) => {
      (state.userStatus = "failed"), (state.user = action.error);
    });
  },
});

export default userSlice.reducer;
