import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import ChecklistService from "../services/ChecklistService.js";
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { setChecklist as setMyChecklist } from "../redux-state/checklistSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Checklist = () => {
  const [checklist, setChecklist] = useState([]);
  const [message, setMessage] = useState("");

  const { title, user } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const userId = useSelector((state) => state.user.userId);
  const myChecklist = checklist.length && user == userId;

  const res = checklist.map((item, index) => {
    const notes = item.note.map((note, index) => {
      return (
        <Box key={index} display="flex" alignItems="center" gap={1}>
          <Typography
            variant="caption"
            sx={{ fontSize: { xs: "17px", md: "20px" } }}
          >
            {index + 1}
          </Typography>

          <Typography
            className={note.done ? "done" : ""}
            variant="caption"
            sx={{ fontSize: { xs: "17px", md: "20px" } }}
          >
            {note.titleNote}
          </Typography>
        </Box>
      );
    });
    return (
      <Container key={index}>
        <Box>
          <Typography variant="h2" sx={theme.typographyTitle}>
            {item.title}
          </Typography>

          <Typography variant="h3" sx={theme.typographySubtitle}>
            {item.description}
          </Typography>

          {notes}
        </Box>
      </Container>
    );
  });

  const edit = () => {
    dispatch(setMyChecklist(checklist[0]));
  };
  const remove = async () => {
    try {
      await ChecklistService.delete(title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ChecklistService.getOneChecklist(user, title);
        setChecklist(response.data);
        if (!response.data[0]) {
          setMessage("Чеклист отсутствует");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [checklist]);

  return (
    <Container>
      <Typography
        variant="h3"
        color={theme.palette.error.main}
        sx={theme.typographySubtitle}
      >
        {message}
      </Typography>

      {res}

      {myChecklist ? (
        <Box>
          <Button>
            <Link
              component={RouterLink}
              underline="none"
              textTransform="none"
              to={"/edit-checklist"}
              onClick={edit}
            >
              Редактировать
            </Link>
          </Button>
          <Button>
            <Link
              component={RouterLink}
              underline="none"
              textTransform="none"
              onClick={remove}
            >
              Удалить
            </Link>
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Checklist;
