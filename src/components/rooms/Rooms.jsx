import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circle } from "react-shapes";
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { roomState, getRooms } from "../../redux/roomSlice";
import { showToaster } from "../../redux/layoutSlice";
import { STATUS_ERROR } from "../../shared/constants/status";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 16,
  },
}));

const Rooms = () => {
  const dispatch = useDispatch();
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
          <Grid id="l-stay" item xs={6} container direction="column">
            <Grid item>
              <Typography
                sx={{
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
                        room?.occupied
                          ? `${room?.first_name} ${room?.last_name}`
                          : "VACANT"
                      }
                      placement="bottom-end"
                    >
                      <Grid key={idx} item xs={2} sx={{ margin: "16px 32px" }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          {room?.room_number}
                        </Typography>

                        <Circle
                          style={{ padding: "0px !important" }}
                          fill={{ color: isRoomOccupied(room?.occupied) }}
                          stroke={{ color: "#b256c2" }}
                          strokeWidth={5}
                          r={20}
                        />
                      </Grid>
                    </CustomToolTip>
                  );
                })}
            </Grid>
          </Grid>

          <Grid id="s-stay" container item direction="column" xs={6}>
            <Grid item>
              <Typography
                sx={{ textTransform: "uppercase", textAlign: "center" }}
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
                        room?.occupied
                          ? `${room?.first_name} ${room?.last_name}`
                          : "VACANT"
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
                          fill={{ color: isRoomOccupied(room?.occupied) }}
                          stroke={{ color: "#b256c2" }}
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
