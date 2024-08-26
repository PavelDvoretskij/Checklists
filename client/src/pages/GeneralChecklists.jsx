import { useEffect, useState } from "react";
import ChecklistService from "../services/ChecklistService.js";
import {
  Box,
  Container,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";

import Pagination from "./Pagination.jsx";
import LinkChecklist from "../components/LinkChecklist.jsx";

const GeneralChecklists = () => {
  const [checklists, setChecklists] = useState([]);
  const [mess, setMess] = useState("");
  const [countChecklists, setCountChecklists] = useState();
  const [num, setNum] = useState(1);

  const theme = useTheme();

  const numberChecklistsPerPage = 20;

  const changeNum = (num) => {
    setNum(num);
  };

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await ChecklistService.getCount("generalChecklists");
        setCountChecklists(response.data);
        if (!response.data) {
          setMess("Чеклистов нет");
        }
      } catch (error) {
        console.log(error);
      }
      showAllChecklists(num);
    };

    getCount();
  }, [num]);

  const showAllChecklists = async (num) => {
    let indexChecklist =
      num * numberChecklistsPerPage - numberChecklistsPerPage;
    try {
      const response = await ChecklistService.getChecklists(
        indexChecklist,
        numberChecklistsPerPage,
      );
      setChecklists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checklist = checklists.map((checklist, index) => {
    return (
      <ListItem key={index} sx={{ padding: "0" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }} width="100%">
          <LinkChecklist
            to={`/checklists/userId/${checklist.user}/title/${checklist.title}`}
            title={checklist.title}
            description={checklist.description}
            user={checklist.user}
          />
        </Box>
      </ListItem>
    );
  });

  return (
    <Container>
      <Box>
        <List sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {checklist}
        </List>

        {countChecklists > numberChecklistsPerPage && (
          <Pagination
            changeNum={changeNum}
            num={num}
            countChecklists={countChecklists}
            numberChecklistsPerPage={numberChecklistsPerPage}
          />
        )}
      </Box>

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

export default GeneralChecklists;
