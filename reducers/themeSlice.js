import { createSlice } from '@reduxjs/toolkit';

export const lightTheme = {
    backgroundColor: "white",
    secondaryBackgroundColor: "white", // Deuxième couleur de fond claire
    textColor: "#333",
    buttonColor: "#21005D",
    buttonColor1: "#ec6e5b",
    buttonColor2: "#e0e0e0",
    buttonColor3: "#e0e0e0",
    buttonTextColor: "#fff",
    // inputColor: "#f0f0f0", // Couleur pour les champs de texte et les inputs
    inputColor: "#fff",
    inputTextColor: "#333", // Couleur du texte dans les inputs
  };
  
  export const darkTheme = {
    backgroundColor: "#121212",
    secondaryBackgroundColor: "#2c2c2c", // Deuxième couleur de fond sombre
    textColor: "#fff",
    buttonColor: "#fff",
    buttonColor1: "#ec6e5b",
    buttonColor2: "#2c2c2c",
    buttonColor3: "#333",
    buttonTextColor: "#000",
    inputColor: "#333", // Couleur pour les champs de texte et les inputs
    inputTextColor: "#fff", // Couleur du texte dans les inputs
  };
  
  const initialState = {
    value: {
      currentTheme: 'light', // Thème par défaut
      themes: {
        light: lightTheme,
        dark: darkTheme
      }
    },
  };
  
  const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      setTheme: (state, action) => {
        state.value.currentTheme = action.payload;
      },
      addCustomTheme: (state, action) => {
        state.value.themes[action.payload.name] = action.payload.theme;
      },
      updateTheme: (state, action) => {
        state.value.themes[action.payload.name] = {
          ...state.value.themes[action.payload.name],
          ...action.payload.theme
        };
      },
    },
  });
  
  export const { setTheme, addCustomTheme, updateTheme } = themeSlice.actions;
  
  export const selectCurrentTheme = (state) => state.theme.value.themes[state.theme.value.currentTheme];
  
  export default themeSlice.reducer;
  