import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux-state/userSlice.js";
import { useState } from "react";

function Header() {
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  const [showName, setShowName] = useState(true);

  const getOut = () => {
    dispatch(logout());
    setShowName(false);
  };

  return (
    <Box bgcolor="#222" py={2}>
      <Container>
        {showName && userName && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
          >
            <Typography
              variant="h2"
              color="#fff"
              sx={{ fontSize: { xs: "15px" } }}
            >
              {userName}
            </Typography>
            <Button
              component={RouterLink}
              onClick={getOut}
              color="secondary"
              to="/login"
              sx={{
                fontSize: { xs: "13px", md: "17px" },
              }}
            >
              Выйти
            </Button>
          </Box>
        )}
        <Typography
          variant="h1"
          textTransform="uppercase"
          sx={{
            fontSize: { xs: "25px", sm: "35px", md: "50px" },
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Конструктор чеклистов
        </Typography>
      </Container>
    </Box>
  );
}

export default Header;
