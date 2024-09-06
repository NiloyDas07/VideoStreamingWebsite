import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",

  sidebarOpen: window.innerWidth < 768 ? false : true,
};

const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      if (window.innerWidth < 768) {
        state.sidebarOpen = !state.sidebarOpen;
      } else state.sidebarOpen = true;
    },
    setSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleTheme,
  setTheme,
  setSidebar,
  setMenuButtonClicked,
  setClosedByOutsideClick,
} = UiSlice.actions;
export default UiSlice.reducer;
