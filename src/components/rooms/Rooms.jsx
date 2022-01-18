import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circle } from "react-shapes";
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import { roomState, listRooms } from "../../redux/roomSlice";
import TitleBar from "../TitleBar/TitleBar";

const Rooms = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { rooms } = useSelector(roomState);

  useEffect(() => {
    dispatch(listRooms());
  }, []);

  const isRoomOccupied = (status) => (status ? "#c51162" : "none");

  return (
    <>
      <TitleBar text="Room Occupancy" />
      <Paper sx={{ margin: 3 }} elevation={15}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={4}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  long stay
                </Typography>
              </Grid>

              {rooms
                .filter((r) => r.room_number % 2 === 1)
                .map((room, idx) => {
                  return (
                    <Tooltip
                      key={idx}
                      title={
                        room.occupied
                          ? `${room.first_name} ${room.last_name}`
                          : "VACANT"
                      }
                      placement="bottom-end"
                    >
                      <Grid key={idx} item xs={2} sx={{ margin: "16px 32px" }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                          {room.room_number}
                        </Typography>

                        <Circle
                          style={{ padding: "0px !important" }}
                          fill={{ color: isRoomOccupied(room.occupied) }}
                          stroke={{ color: "#b256c2" }}
                          strokeWidth={5}
                          r={20}
                        />
                      </Grid>
                    </Tooltip>
                  );
                })}
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Box></Box>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: theme.spacing(14) }}
          >
            <Grid item xs={12}>
              <Typography
                sx={{ textTransform: "uppercase", textAlign: "center" }}
              >
                short stay
              </Typography>
            </Grid>
            {rooms
              .filter((r) => r.room_number % 2 === 0)
              .map((room, idx) => {
                return (
                  <Tooltip
                    key={idx}
                    title={
                      room.occupied
                        ? `${room.first_name} ${room.last_name}`
                        : "VACANT"
                    }
                    placement="bottom-end"
                  >
                    <Grid key={idx} item xs={2} style={{ margin: "16px 32px" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        {room.room_number}
                      </Typography>

                      <Circle
                        style={{ padding: "0px !important" }}
                        fill={{ color: isRoomOccupied(room.occupied) }}
                        stroke={{ color: "#b256c2" }}
                        strokeWidth={5}
                        r={20}
                      />
                    </Grid>
                  </Tooltip>
                );
              })}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Rooms;
