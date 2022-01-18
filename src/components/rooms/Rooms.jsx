import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circle } from "react-shapes";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { roomState, getRooms } from "../../redux/roomSlice";
import { showToaster } from "../../redux/layoutSlice";
import { STATUS_ERROR } from "../../shared/constants/status";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const CustomToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 16,
  },
}));

const roomOccupiedColor = "#b256c2";

const Rooms = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { rooms } = useSelector(roomState);

  const fetchRooms = async () => {
    try {
      dispatch(getRooms());
    } catch (error) {
      dispatch(
        showToaster({
          message: error?.message,
          status: STATUS_ERROR,
        })
      );
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const isRoomOccupied = (status) => (status ? "#c51162" : "none");

  return (
    <>
      <Typography
        variant="h5"
        color="primary"
        sx={{
          textAlign: "center",
          fontWeight: "bolder",
          textTransform: "uppercase",
        }}
      >
        rooms
      </Typography>
      <Paper elevation={15}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid id="l-stay" item xs={5} container direction="column">
            <Grid item>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                long stay
              </Typography>
            </Grid>

            <Grid item container>
              {rooms
                ?.filter((r) => r?.room_number % 2 === 1)
                .map((room, idx) => {
                  return (
                    <CustomToolTip
                      key={idx}
                      title={
                        room?.occupant_id
                          ? `${room?.occupant_id?.first_name} ${room?.occupant_id?.last_name}`
                          : ""
                      }
                      placement="bottom-end"
                    >
                      <Grid key={idx} item xs={2} sx={{ margin: "16px 32px" }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          {room?.room_number}
                        </Typography>

                        <Circle
                          style={{ padding: "0px !important" }}
                          fill={{ color: isRoomOccupied(room?.occupant_id) }}
                          stroke={{ color: roomOccupiedColor }}
                          strokeWidth={5}
                          r={20}
                        />
                      </Grid>
                    </CustomToolTip>
                  );
                })}
            </Grid>
          </Grid>

          <Grid id="s-stay" container item direction="column" xs={5}>
            <Grid item>
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                short stay
              </Typography>
            </Grid>
            <Grid item container>
              {rooms
                ?.filter((r) => r?.room_number % 2 === 0)
                .map((room, idx) => {
                  return (
                    <CustomToolTip
                      key={idx}
                      title={
                        room?.occupant_id
                          ? `${room?.occupant_id?.first_name} ${room?.occupant_id?.last_name}`
                          : ""
                      }
                      placement="bottom-end"
                      style={{ fontSize: 24 }}
                    >
                      <Grid
                        key={idx}
                        item
                        xs={2}
                        style={{ margin: "16px 32px" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {room?.room_number}
                        </Typography>

                        <Circle
                          style={{ padding: "0px !important" }}
                          fill={{ color: isRoomOccupied(room?.occupant_id) }}
                          stroke={{ color: roomOccupiedColor }}
                          strokeWidth={5}
                          r={20}
                        />
                      </Grid>
                    </CustomToolTip>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Rooms;
