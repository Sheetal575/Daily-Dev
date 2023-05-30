"use client";

import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "../../theme/theme-context";
const Customise = () => {
  // <div className={styles.typewriter}>
  //   <h2>Hold tight, we're working on it.</h2>
  // </div>

  const { theme, setLightTheme, setDarkTheme, setBlueTheme, setGreenTheme } =
    useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme?.colors.background,
        color: theme?.colors.text,
      }}
    >
      <button onClick={setLightTheme}>Light Theme</button>
      <button onClick={setDarkTheme}>Dark Theme</button>
      <button onClick={setBlueTheme}>Blue Theme</button>
      <button onClick={setGreenTheme}>Green Theme</button>
      <h1>My Component</h1>
      <p>This is a paragraph with styles based on the current theme.</p>
    </div>
  );
};

export default Customise;
