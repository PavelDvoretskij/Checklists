import { Box, Button, List, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const Pagination = ({
  num,
  changeNum,
  countChecklists,
  numberChecklistsPerPage,
}) => {
  // const { num } = useParams();
  const theme = useTheme();

  let numberPaginationElements = [];

  const click = (num) => {
    changeNum(num);
  };

  for (
    let i = 1;
    i <= Math.ceil(countChecklists / numberChecklistsPerPage);
    i++
  ) {
    numberPaginationElements.push(i);
  }

  const res = numberPaginationElements.map((item) => {
    return (
      <Box key={item}>
        <Button
          variant="contained"
          onClick={() => click(item)}
          sx={
            num == item
              ? {
                  fontWeight: "bold",
                  minWidth: 0,
                  padding: 1,
                  margin: 0.5,
                  bgcolor: theme.palette.secondary.dark,
                  color: "#000",
                  "&:hover": {
                    color: "#fff",
                  },
                }
              : { minWidth: 0, padding: 1, margin: 0.5 }
          }
        >
          {item}
        </Button>
      </Box>
    );
  });

  return (
    <>
      <Box>
        <List sx={{ display: "flex", justifyContent: "center" }}>{res}</List>
      </Box>
    </>
  );
};

Pagination.propTypes = {
  num: PropTypes.number.isRequired,
  changeNum: PropTypes.func.isRequired,
  countChecklists: PropTypes.number.isRequired,
  numberChecklistsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
