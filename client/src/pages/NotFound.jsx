import { Typography, useTheme } from "@mui/material";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Typography variant="h2" sx={theme.typographyTitle}>
      Такой страницы нет
    </Typography>
  );
};

export default NotFound;
