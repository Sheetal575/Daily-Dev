// ThemeContext.js
"use client";

import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const setThemeVariables = (theme) => {
  switch (theme) {
    case "blue":
      return {
        "--primary-text-color": "blue",
        "--secondary-text-color": "lightblue",
        "--primary-bg-color": "white",
        "--secondary-bg-color": "lightgray",
      };
    case "green":
      return {
        "--primary-text-color": "green",
        "--secondary-text-color": "lightgreen",
        "--primary-bg-color": "white",
        "--secondary-bg-color": "lightgray",
      };
    case "light":
      return {
        "--primary-text-color": "black",
        "--secondary-text-color": "gray",
        "--primary-bg-color": "lightgray",
        "--secondary-bg-color": "white",
      };
    default:
      return {
        "--primary-text-color": "black",
        "--secondary-text-color": "gray",
        "--primary-bg-color": "white",
        "--secondary-bg-color": "lightgray",
      };
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("blue");

  const switchTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <style jsx>{`
        :root${JSON.stringify(setThemeVariables())} ;
      `}</style>
      {children}
    </ThemeContext.Provider>
  );
};
