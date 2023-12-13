import { Grid, Typography } from "@mui/material";
import "./Home.css";

const Home = () => {
  return (
    <Grid>
      <Typography
        fontFamily={"Acme"}
        fontSize={"44px"}
        fontStyle={"normal"}
        fontWeight={"400px"}
        lineHeight={"50px"}
        textAlign={"center"}
        className="fair-betting"
      >
        Wheel Of Fair Betting
      </Typography>
      <Typography
        color={"#FFF"}
        textAlign={"center"}
        fontFamily={"Rubix"}
        fontSize={14}
        fontStyle={"normal"}
        fontWeight={400}
        lineHeight={"20px"}
      >
        Let’s earn with our Fair Betting Wheels
      </Typography>
    </Grid>
  );
};

export default Home;
