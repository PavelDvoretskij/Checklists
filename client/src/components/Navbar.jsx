import { Container, List } from "@mui/material";
import CustomListItem from "./CustomListItem.jsx";

function Navbar() {
  return (
    <Container>
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 0.5,
          padding: "30px 0",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CustomListItem to="/">Главная</CustomListItem>
        <CustomListItem to="/edit-checklist">Редактор чеклистов</CustomListItem>
        <CustomListItem to="/general-checklists">
          Общие чек листы
        </CustomListItem>
      </List>
    </Container>
  );
}

export default Navbar;
