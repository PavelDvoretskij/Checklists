import { useState } from "react";
import { useDispatch } from "react-redux";
import { registration } from "../redux-state/userSlice.js";
import { useNavigate } from "react-router-dom";
import { FormGroup, Typography, useTheme } from "@mui/material";
import CustomButton from "../components/CustomButton.jsx";
import CustomTextFieldAuth from "../components/CustomTextFieldAuth.jsx";
import CustomLinkAuth from "../components/CustomLinkAuth.jsx";
import CustomContainerAuth from "../components/CustomContainerAuth.jsx";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mess, setMess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const fetchRegistration = async () => {
    try {
      const response = await dispatch(registration({ name, email, password }));
      if (response.payload.message) {
        setMess(response.payload);
      }
      if (response.meta.requestStatus == "fulfilled") {
        navigate("/login", {
          replace: true,
          state: { messageRegistration: response.payload.message },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomContainerAuth>
      <Typography variant="h2" mb={2} sx={theme.typographyTitle}>
        Регистрация
      </Typography>
      {mess && (
        <Typography
          variant="h3"
          color={theme.palette.error.main}
          sx={theme.typographySubtitle}
        >
          {mess.message}
        </Typography>
      )}
      {mess.errors && (
        <Typography
          variant="h3"
          color={theme.palette.error.main}
          sx={{
            fontSize: { xs: "15px", md: "17px" },
            textAlign: "center",
          }}
        >
          {mess.errors[0].msg}
        </Typography>
      )}
      <form style={{ width: "100%" }}>
        <FormGroup sx={{ maxWidth: 500, margin: "0 auto" }}>
          <CustomTextFieldAuth
            label="Имя"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <CustomTextFieldAuth
            label="Email"
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextFieldAuth
            label="Пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton onClick={fetchRegistration}>
            Зарегистрироваться
          </CustomButton>
        </FormGroup>
      </form>
      <CustomLinkAuth to={"/login"}>Авторизоваться</CustomLinkAuth>
    </CustomContainerAuth>
  );
};
export default Registration;
