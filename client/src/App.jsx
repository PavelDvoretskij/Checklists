import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux-state/userSlice.js";

import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Layout from "./components/Layout.jsx";
import EditChecklist from "./pages/EditChecklist.jsx";
import Checklist from "./pages/Checklist.jsx";
import GeneralChecklists from "./pages/GeneralChecklists.jsx";
import MainPage from "./pages/MainPage.jsx";
import TopLayout from "./components/TopLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Typography } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (
          !/^(.*)(\b(login|registration)\b)(.*?)$/.test(window.location.href)
        ) {
          const response = await dispatch(checkAuth());
          if (response.meta.requestStatus == "rejected") {
            return navigate("/login", { replace: true });
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <Typography variant="h6" textAlign="center">
        Загрузка...
      </Typography>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<TopLayout />}>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/edit-checklist" element={<EditChecklist />} />
            <Route
              path="/checklists/userId/:user/title/:title"
              element={<Checklist />}
            />
            <Route path="/general-checklists" element={<GeneralChecklists />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
