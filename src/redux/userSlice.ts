import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("login", async (formData) => {
  try {
    const res = await fetch("https://study.logiper.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
});

export const createDebt = createAsyncThunk(
  "createDebt",
  async ({ formData, token }: { formData: FormValues; token: string }) => {
    console.log("token", token);
    console.log("formData", formData);
    try {
      const res = await fetch("https://study.logiper.com/finance/debt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

   

      const data = await res.json();
      console.log(data)
      return data;
    } catch (error) {
      return error;
    }
  }
);

interface UserState {
  user: object | null;
  error: string | null;
  userStatus: string;
  debtStatus: string;
  debt: object | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  userStatus: "idle",
  debtStatus: "idle",
  debt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      (state.user = null), (state.error = null), (state.userStatus = "idle");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.userStatus = "loading";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      (state.userStatus = "success"), (state.user = action.payload);
    });

    builder.addCase(login.rejected, (state, action) => {
      (state.userStatus = "failed"), (state.error = action.payload);
    });

    // create debt
    builder.addCase(createDebt.pending, (state) => {
      state.debtStatus = "loading";
    });

    builder.addCase(createDebt.fulfilled, (state, action) => {
      (state.debtStatus = "success"), (state.debt = action.payload);
    });

    builder.addCase(createDebt.rejected, (state, action) => {
      (state.debtStatus = "failed"), (state.error = action.payload);
    });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
