import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import { setTheme } from "../../store/modules/uiSlice";

// CSS
import * as S from "./style";
import { FaSun, FaMoon } from "react-icons/fa";
import { getValueFromLocalStorage } from "../../utils/localStorage";

const ThemeToggleButton = () => {
  const { theme } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const themeToggleHandler = () => {
    dispatch(theme === "light" ? setTheme("dark") : setTheme("light"));
  };

  useEffect(() => {
    const prefersColorScheme = window.matchMedia("prefers-color-scheme: dark")
      .matches
      ? "dark"
      : "light";
    const localTheme = getValueFromLocalStorage("theme");
    const initialTheme = localTheme || prefersColorScheme;
    dispatch(setTheme(initialTheme));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <S.ToggleWrapper onClick={themeToggleHandler}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 1 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </motion.div>
      </AnimatePresence>
    </S.ToggleWrapper>
  );
};

export default ThemeToggleButton;
