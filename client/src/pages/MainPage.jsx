import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ChecklistService from "../services/ChecklistService.js";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { setChecklist } from "../redux-state/checklistSlice.js";
import Pagination from "./Pagination.jsx";
import LinkChecklist from "../components/LinkChecklist.jsx";

const MainPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [checklists, setChecklists] = useState([]);
  const [countChecklists, setCountChecklists] = useState();
  const [mess, setMess] = useState();
  const [num, setNum] = useState(1);

  const numberChecklistsPerPage = 20;

  const changeNum = (num) => {
    setNum(num);
  };

  const getCount = async () => {
    try {
      const response = await ChecklistService.getCount("myChecklists");
      setCountChecklists(response.data);
      if (!response.data) {
        setMess("У вас нет чеклистов");
      }

      if (response.data) {
        showAllChecklists(num);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (title) => {
    try {
      await ChecklistService.delete(title);
      await showAllChecklists(num);
    } catch (error) {
      console.log(error);
    }
    getCount();
  };

  useEffect(() => {
    getCount();
  }, [num]);

  const showAllChecklists = async (num) => {
    let indexChecklist =
      num * numberChecklistsPerPage - numberChecklistsPerPage;
    try {
      const response = await ChecklistService.getMyChecklists(
        indexChecklist,
        numberChecklistsPerPage,
      );

      setChecklists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (checklist) => {
    dispatch(setChecklist(checklist));
  };

  return (
    <Container>
      <List>
        {checklists.map((checklist) => (
          <ListItem key={checklist._id} sx={{ width: "100%", paddingTop: "0" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", padding: "0" }}
              width="100%"
            >
              <LinkChecklist
                to={`/checklists/userId/${checklist.user}/title/${checklist.title}`}
                title={checklist.title}
                description={checklist.description}
              />
              <Box>
                <Button
                  component={RouterLink}
                  underline="none"
                  to={"/edit-checklist"}
                  sx={{ textTransform: "none", padding: "0" }}
                  onClick={() => onClick(checklist)}
                >
                  Редактировать
                </Button>
                <Button
                  sx={{ textTransform: "none", padding: "0" }}
                  onClick={() => remove(checklist.title)}
                >
                  Удалить
                </Button>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      {countChecklists > numberChecklistsPerPage && (
        <Pagination
          num={num}
          changeNum={changeNum}
          countChecklists={countChecklists}
          numberChecklistsPerPage={numberChecklistsPerPage}
        />
      )}
      {mess && (
        <Typography
          variant="h3"
          color={theme.palette.error.main}
          sx={theme.typographySubtitle}
        >
          {mess}
        </Typography>
      )}
    </Container>
  );
};

export default MainPage;
