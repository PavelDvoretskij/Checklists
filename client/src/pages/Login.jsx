import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux-state/userSlice.js";
import { useNavigate } from "react-router-dom";
import { FormGroup, Typography, useTheme } from "@mui/material";
import CustomButton from "../components/CustomButton.jsx";
import CustomTextFieldAuth from "../components/CustomTextFieldAuth.jsx";
import CustomLinkAuth from "../components/CustomLinkAuth.jsx";
import CustomContainerAuth from "../components/CustomContainerAuth.jsx";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mess, setMess] = useState("");

  const fetchLogin = async () => {
    try {
      dispatch(login({ email, password }));
      const response = await dispatch(login({ email, password }));
      if (response.error) {
        setMess("Ошибка авторизации");
      }
      if (response.meta.requestStatus == "fulfilled") {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomContainerAuth>
      <Typography variant="h2" mb={2} sx={theme.typographyTitle}>
        Авторизация
      </Typography>
      {mess && (
        <Typography
          variant="h3"
          color={theme.palette.error.main}
          sx={theme.typographySubtitle}
        >
          {mess}
        </Typography>
      )}

      {state && !mess && (
        <Typography
          variant="h3"
          color={theme.palette.error.main}
          sx={theme.typographySubtitle}
        >
          {state.messageRegistration}
        </Typography>
      )}

      <form style={{ width: "100%" }}>
        <FormGroup sx={{ maxWidth: 500, margin: "0 auto" }}>
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
          <CustomButton onClick={fetchLogin}>Войти</CustomButton>
        </FormGroup>
      </form>
      <CustomLinkAuth to={"/registration"}>Зарегистрироваться</CustomLinkAuth>
    </CustomContainerAuth>
  );
};
export default Login;
