import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#617c98",
      main: "#305478",
      dark: "#1d3248",
    },
    secondary: {
      light: "#fed35b",
      main: "#FECD45",
      dark: "#e0b53d",
    },
    error: {
      main: "#990000",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    h1: {
      color: "#FECD45",
    },
  },
  typographyTitle: {
    fontSize: { xs: "25px", sm: "30px", md: "35px" },
    textAlign: "center",
    fontWeight: " bold",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  typographySubtitle: {
    fontSize: { xs: "17px", sm: "20px", md: "25px" },
    textAlign: "center",
    marginBottom: "20px",
  },
});
