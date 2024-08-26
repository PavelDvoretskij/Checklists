import { Link, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import { setChecklist } from "../redux-state/checklistSlice.js";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
const CustomListItem = ({ to, children }) => {
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(
      setChecklist({
        title: "",
        description: "",
        general: false,
        note: [
          {
            titleNote: "",
            done: false,
          },
        ],
      }),
    );
  };

  return (
    <ListItem sx={{ padding: "0", width: "auto" }}>
      <Link
        underline="none"
        component={NavLink}
        fontSize={{ md: "20px" }}
        fontFamily={["Open Sans", "sans-serif"].join(",")}
        to={to}
        sx={{
          "&.active": { fontWeight: "bold", color: theme.palette.primary.dark },
        }}
        onClick={onClick}
      >
        {children}
      </Link>
    </ListItem>
  );
};

CustomListItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default CustomListItem;
