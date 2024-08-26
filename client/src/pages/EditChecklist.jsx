import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormGroup,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  useTheme,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChecklistService from "../services/ChecklistService.js";
import CustomButton from "../components/CustomButton.jsx";
import CustomTextFieldChecklist from "../components/CustomTextFieldChecklist.jsx";
import { setChecklist as setMyChecklist } from "../redux-state/checklistSlice.js";

const EditChecklist = () => {
  const theme = useTheme();
  const checklist = useSelector((state) => state.checklist.checklist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [titleValue, setTitleValue] = useState(checklist.title);
  const [descValue, setDescValue] = useState(checklist.description);
  const [pointValue, setPointValue] = useState(checklist.note);
  const [edit, setEdit] = useState(true);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [pointError, setPointError] = useState(false);
  const [updateChecklist, setUpdateChecklist] = useState(false);
  const [showBtnUpgate, setShowBtnUpgate] = useState(false);
  const [showBtnWrite, setShowBtnWrite] = useState(false);
  const [general, setGeneral] = useState(checklist.general);
  const [existChecklist, setExistChecklist] = useState(true);

  const changeHandlerTitle = (e) => {
    setTitleValue(e.target.value.trimStart());
  };

  const changeHandlerPoint = (e, index) => {
    setPointValue(
      Object.keys(pointValue).map((key) => {
        if (key == index) {
          return { ...pointValue[key], titleNote: e.target.value.trimStart() };
        }
        return pointValue[key];
      }),
    );
  };

  const changeHandlerDesc = (e) => {
    setDescValue(e.target.value.trimStart());
  };

  const save = () => {
    setTitleError(false);
    setDescError(false);
    setPointError(false);

    const checkPoint = pointValue.find((point) => point.titleNote !== "");
    const { num, copyPointValue } = sort();

    if (num) {
      setPointValue(copyPointValue);
    }
    if (titleValue.trim() !== "" && descValue.trim() !== "" && checkPoint) {
      if (num) {
        addCheckList(copyPointValue);
        setEdit(false);
      }
    }
    if (titleValue.trim() == "") {
      setTitleError(true);
      if (updateChecklist) {
        setTitleValue(updateChecklist);
        setTitleError(false);
      }
    }
    if (descValue.trim() == "") {
      setDescError(true);
    }
    if (!checkPoint) {
      setPointError(true);
    }
  };
  const rewrite = async () => {
    try {
      const data = {
        updateChecklist: titleValue,
        titleValue,
        descValue,
        point: pointValue,
      };
      const response = await ChecklistService.update(data);

      setMessage(response.data.message);
      setShowBtnWrite(false);
      setShowBtnUpgate(true);
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    setMessage("");
    setTitleValue("");
    setEdit(true);
    setShowBtnWrite(false);
  };

  const done = (ind) => {
    setPointValue(
      pointValue.map((point, index) => {
        if (ind == index) {
          return { ...point, done: !point.done };
        }
        return point;
      }),
    );
  };

  const sort = () => {
    let num = 0;

    const copyPointValue = pointValue.filter((point) => {
      if (point.titleNote !== "") {
        num++;
        return point;
      }
    });

    setPointValue(copyPointValue);

    if (num === 0) {
      setPointValue([
        {
          titleNote: "",
          done: false,
        },
      ]);
      setPointError(true);
    }

    return { num, copyPointValue };
  };

  const addCheckList = async (point) => {
    if (titleValue && descValue) {
      if (updateChecklist) {
        try {
          const data = {
            updateChecklist,
            titleValue,
            descValue,
            point,
            general,
          };
          const response = await ChecklistService.update(data);
          setMessage(response.data.message);
          setShowBtnUpgate(true);
        } catch (error) {
          console.log(error);
          if (error.response?.data.status == 500) {
            return navigate("/login", { replace: true });
          }
          setMessage(error.response?.data.message);
          setShowBtnWrite(true);
        }
      } else {
        try {
          const data = {
            titleValue,
            descValue,
            point,
            updateChecklist,
            general,
          };
          const response = await ChecklistService.create(data);
          setMessage(response.data.message);
          setShowBtnUpgate(true);
        } catch (error) {
          console.log(error);
          if (error.response?.data.status == 500) {
            return navigate("/login", { replace: true });
          }
          setMessage(error.response?.data.message);
          setShowBtnWrite(true);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const add = () => {
    setPointValue([
      ...pointValue,
      {
        titleNote: "",
        done: false,
      },
    ]);
    setPointError(false);
  };

  const editMode = () => {
    dispatch(
      setMyChecklist({
        title: titleValue,
        description: descValue,
        note: pointValue,
        general: general,
      }),
    );
    setMessage("");
    setEdit(true);
    setUpdateChecklist(titleValue);
    setShowBtnUpgate(false);
    setPointError(false);
  };

  const newChecklist = () => {
    setExistChecklist(true);
    setMessage("");
    setEdit(true);
    setShowBtnUpgate(false);
    setUpdateChecklist(false);
    setGeneral(false);
    setTitleValue("");
    setDescValue("");
    setPointValue([
      {
        titleNote: "",
        done: false,
      },
    ]);
  };

  const chengeCheckbox = () => {
    setGeneral(!general);
  };

  const removeChecklist = async (title) => {
    try {
      await ChecklistService.delete(title);

      setExistChecklist(false);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = (ind) => {
    const clone = [...pointValue];
    clone.splice(ind, 1);

    if (clone.length) {
      setPointValue(clone);
    }
  };

  const cancelChange = () => {
    setPointValue(checklist.note);
    setTitleValue(checklist.title);
    setDescValue(checklist.description);
    setGeneral(checklist.general);
    setDescError(false);
    setPointError(false);
  };

  useEffect(() => {
    setUpdateChecklist(titleValue);
  }, []);

  const points = pointValue.map((point, index) => {
    return (
      <Box key={index} display="flex" flexDirection="column" my={0.5} px={2}>
        {edit && (
          <>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                sx={{ fontSize: { xs: "17px", md: "20px" } }}
              >
                {index + 1}
              </Typography>

              <TextField
                className={point.done ? "done" : ""}
                sx={
                  pointError
                    ? { border: "3px solid red", width: "100%" }
                    : { width: "100%" }
                }
                label="Пункт чеклиста"
                size="small"
                variant="outlined"
                value={point.titleNote}
                InputLabelProps={{ style: { fontSize: 13 } }}
                onChange={(e) => changeHandlerPoint(e, index)}
              />
            </Box>

            <Box display="flex">
              <Button
                sx={{ textTransform: "none", padding: "0" }}
                onClick={() => done(index)}
              >
                {!point.done
                  ? "Отметить как выполнено"
                  : "Отметить как не выполнено"}
              </Button>
              <Button
                sx={{ textTransform: "none", padding: "0" }}
                onClick={() => remove(index)}
              >
                Удалить
              </Button>
            </Box>
          </>
        )}

        {!edit && (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="caption"
              sx={{ fontSize: { xs: "17px", md: "20px" } }}
            >
              {index + 1}
            </Typography>

            <Typography
              className={point.done ? "done" : ""}
              variant="caption"
              sx={{ fontSize: { xs: "17px", md: "20px" } }}
            >
              {point.titleNote}
            </Typography>
          </Box>
        )}
      </Box>
    );
  });

  if (!existChecklist) {
    return (
      <Container>
        <Typography
          variant="h3"
          color={theme.palette.error.main}
          sx={theme.typographySubtitle}
        >
          Чеклист удалён
        </Typography>
        <CustomButton onClick={newChecklist}>
          Создать новый чеклист
        </CustomButton>
      </Container>
    );
  }

  return (
    <Container>
      {edit ? (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <CustomTextFieldChecklist
              label="Название чеклиста"
              titleError={titleError}
              value={titleValue}
              multiline={false}
              rows={0}
              onChange={changeHandlerTitle}
            />

            <CustomTextFieldChecklist
              label="Описание"
              titleError={descError}
              value={descValue}
              multiline={true}
              rows={2}
              onChange={changeHandlerDesc}
            />

            {points}

            {edit && (
              <>
                <FormControlLabel
                  sx={{ marginLeft: "auto" }}
                  control={
                    <Checkbox name="SomeName" value="SomeValue" size="small" />
                  }
                  checked={general}
                  onChange={chengeCheckbox}
                  label={
                    <Typography
                      variant="body2"
                      color={theme.palette.primary.dark}
                    >
                      Сделать публичным
                    </Typography>
                  }
                />
                <CustomButton onClick={add}>Добавить пункт</CustomButton>
                <CustomButton onClick={save}>Сохранить</CustomButton>
                <CustomButton onClick={cancelChange}>Отменить</CustomButton>
              </>
            )}
          </FormGroup>
        </form>
      ) : (
        <Box display="flex" flexDirection="column">
          <Typography variant="h2" sx={theme.typographyTitle}>
            {titleValue}
          </Typography>

          <Typography variant="h3" sx={theme.typographySubtitle}>
            {descValue}
          </Typography>

          {points}

          {message && (
            <Typography
              variant="h3"
              color={theme.palette.error.main}
              sx={theme.typographySubtitle}
            >
              {message}
            </Typography>
          )}

          {showBtnWrite && (
            <>
              <CustomButton onClick={rewrite}>Перезаписать</CustomButton>
              <CustomButton onClick={cancel}>Отменить</CustomButton>
            </>
          )}
          {showBtnUpgate && (
            <>
              <CustomButton onClick={editMode}>
                Открыть в редакторе
              </CustomButton>
              <CustomButton onClick={newChecklist}>
                Создать новый чеклист
              </CustomButton>
              <CustomButton onClick={() => removeChecklist(titleValue)}>
                Удалить
              </CustomButton>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};
export default EditChecklist;
