import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserState, FormValues } from "../types/interfaces";

export const createDebt = createAsyncThunk(
  "createDebt",
  async ({ formData, token }: { formData: FormValues; token: string }) => {
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

      return data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchDebt = createAsyncThunk(
  "getDebtData",
  async ({ token }: { token: string }) => {
    try {
      const res = await fetch("https://study.logiper.com/finance/debt", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getDebtId = createAsyncThunk(
  "getDebtId",
  async ({ token, debtId }: { token: string; debtId: string }) => {
    try {
      const res = await fetch(
        `https://study.logiper.com/finance/debt/${debtId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const initialState: UserState = {
  user: null,
  error: "",
  userStatus: "idle",
  debtStatus: "idle",
  debt: null,
  debtDataLength: "",
  debtData: null,
  debtIdData: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      ((state.user = null),
      (state.debtData = null),
      (state.debt = null),
      state.debtData),
        (state.error = null),
        (state.userStatus = "idle");
    },
    debtCount: (state, action) => {
      state.debtDataLength = action.payload;
    },

    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
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

    // getdebt

    builder.addCase(fetchDebt.pending, (state) => {
      state.debtStatus = "loading";
    });
    builder.addCase(fetchDebt.fulfilled, (state, action) => {
      state.debtData = action.payload;
      state.debtStatus = "success";
    });

    builder.addCase(fetchDebt.rejected, (state, action) => {
      state.debtStatus = "failed";
      state.error = action.payload;
    });
    // getIdData

    builder.addCase(getDebtId.pending, (state) => {
      state.debtStatus = "loading";
    });

    builder.addCase(getDebtId.fulfilled, (state, action) => {
      state.debtStatus = "success";
      state.debtIdData = action.payload;
    });

    builder.addCase(getDebtId.rejected, (state, action) => {
      state.debtStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export const { signOut, debtCount, signInStart, signInFailure, signInSuccess } =
  userSlice.actions;
export default userSlice.reducer;
