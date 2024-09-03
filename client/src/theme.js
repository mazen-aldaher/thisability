/* eslint-disable no-unused-vars */
import { createTheme } from "@mui/material/styles";

// Define common tooltip styles
const tooltipStyles = (theme) => ({
  styleOverrides: {
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      fontSize: "0.875rem",
      borderRadius: "4px",
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  },
});

// Define common button styles
const buttonStyles = (theme) => ({
  styleOverrides: {
    root: {
      borderRadius: "8px",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.875rem",
      letterSpacing: "0.05em",
    },
    contained: {
      boxShadow:
        "0 3px 5px -1px rgba(0, 0,0, 0.2), 0 4px 25px 0 rgba(0, 0, 0, 0.1)",
    },
    outlined: {
      borderColor: theme.palette.primary.main,
    },
    text: {
      color: theme.palette.primary.main,
    },
  },
});

// Define your custom themes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3498db",
    },
    background: {
      default: "#ffffff",
      paper: "#f0f0f0",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    navtext: {
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "0.875rem",
      letterSpacing: "0.1em",
      fontFamily: "Helvetica",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiTooltip: tooltipStyles({
      palette: {
        primary: { main: "#3498db" },
      },
    }),
    MuiButton: buttonStyles({
      palette: {
        primary: { main: "#3498db" },
      },
    }),
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2c3e50",
    },
    background: {
      default: "#34495e",
      paper: "#2c3e50",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    navtext: {
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "0.875rem",
      letterSpacing: "0.1em",
      fontFamily: "Helvetica",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiTooltip: tooltipStyles({
      palette: {
        primary: { main: "#2c3e50" },
      },
    }),
    MuiButton: buttonStyles({
      palette: {
        primary: { main: "#2c3e50" },
      },
    }),
  },
});

const autismTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00796b",
    },
    background: {
      default: "#e0f7fa",
      paper: "#b2dfdb",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    navtext: {
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "0.875rem",
      letterSpacing: "0.1em",
      fontFamily: "Helvetica",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiTooltip: tooltipStyles({
      palette: {
        primary: { main: "#00796b" },
      },
    }),
    MuiButton: buttonStyles({
      palette: {
        primary: { main: "#00796b" },
      },
    }),
  },
});

export { lightTheme, darkTheme, autismTheme };
