import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Wheel } from "react-custom-roulette";
import TOKENLOGO from "assets/svg/token_logo.svg";
import INFO from "assets/svg/information-circle.svg";
import HISTORY from "assets/svg/calendar.svg";
import "./Home.css";

enum Status {
  DEPOSITE,
  SPIN,
}

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  { option: "1", style: { backgroundColor: "white" } },
  { option: "2" },
];

const Home = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [tempNumber, setTempNumber] = useState<number>(0);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.SPIN);
  /**
   * deposite $TOKE token
   */
  const handleDeposite = () => {
    console.log("deposite");
    /**
     * call deposite api receive prizeNumber
     */
    const prizeNumberFromBE = 3;
    setTempNumber(prizeNumberFromBE);
  };
  /**
   * spin wheel
   */
  const handleSpin = () => {
    console.log("spin");
    /**
     * spin wheel
     */
    setPrizeNumber(3);
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"center"}
      gap={"20px"}
      position={"absolute"}
    >
      <Typography
        fontFamily={"Acme"}
        fontSize={"44px"}
        fontStyle={"normal"}
        fontWeight={500}
        lineHeight={"50px"}
        textAlign={"center"}
        className="fair-betting"
      >
        TOKE WHEEL
      </Typography>
      <Grid container justifyContent={"center"}>
        <Wheel
          mustStartSpinning={mustSpin}
          // prizeNumber={prizeNumber}
          prizeNumber={0}
          data={data}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          spinDuration={1.0}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
      </Grid>
      <Grid container justifyContent={"center"}>
        <Typography
          color={"#777FB6"}
          fontFamily={"k"}
          fontSize={"14px"}
          fontStyle={"normal"}
          fontWeight={800}
          lineHeight={"20px"}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          select amount:
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        sx={{
          paddingX: "16px",
          paddingY: "14px",
          alignItems: "center",
          gap: "10px",
          borderRadius: "12px",
          border: "1px solid #212631",
          bgcolor: "#1C202C",
          width: "500px",
          height: "56px",
          margin: "auto",
          background: "#040824",
        }}
      >
        <img src={TOKENLOGO} alt="TOKENLOGO"></img>
        <input className="deposite-amount" placeholder="0.00" />
        <Typography
          color={"#777FB6"}
          fontFamily={"Rubik"}
          fontSize={"14px"}
          fontStyle={"normal"}
          fontWeight={500}
          lineHeight={"20px"}
          textAlign={"center"}
        >
          $TOKE
        </Typography>
      </Grid>
      <Grid container justifyContent={"center"} marginBottom={"85px"}>
        <Button
          variant="contained"
          sx={{
            fontSize: "18px",
            display: "flex",
            width: "500px",
            height: "48px",
            padding: "12px 24px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            background:
              "var(--Prime-Gradient, linear-gradient(180deg, #00B0F8 0%, #00ADEA 100%))",
            borderRadius: "8px",
          }}
          onClick={status === Status.DEPOSITE ? handleDeposite : handleSpin}
        >
          <Typography
            color={"#FFF"}
            fontFamily={"Acme"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"24px"}
            textAlign={"center"}
          >
            {status === Status.DEPOSITE ? "DEPOSITE NOW" : "SPIN NOW"}
          </Typography>
        </Button>
      </Grid>
      <Grid
        position={"absolute"}
        right={"0px"}
        top={"50%"}
        sx={{
          transform: "translatey(-50%)",
        }}
      >
        <Grid
          container
          marginBottom={"10px"}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
            width: "fit-content",
            display: "flex",
            padding: "12px 24px 12px 12px",
            alignItems: "cente",
            gap: "10px",
            borderRadius: "100px 0px 0px 100px",
            background: "linear-gradient(180deg, #333A71 0%, #1A204F 100%)",
            boxShadow:
              "0px -2.5px 0px 0px #141A43 inset, 0px 2px 0px 0px #3A427B inset, -2px 12px 16px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          <img src={INFO} alt="INFO" />
          <Typography
            color={"#FFF"}
            fontFamily={"Acme"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"20px"}
            textAlign={"center"}
          >
            How fair is the spin?
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
            float: "right",
            width: "fit-content",
            display: "flex",
            padding: "12px 24px 12px 12px",
            alignItems: "cente",
            gap: "10px",
            borderRadius: "100px 0px 0px 100px",
            background: "linear-gradient(180deg, #333A71 0%, #1A204F 100%)",
            boxShadow:
              "0px -2.5px 0px 0px #141A43 inset, 0px 2px 0px 0px #3A427B inset, -2px 12px 16px 0px rgba(0, 0, 0, 0.16)",
          }}
        >
          <img src={HISTORY} alt="HISTORY" />
          <Typography
            color={"#FFF"}
            fontFamily={"Acme"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"20px"}
            textAlign={"center"}
          >
            History
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
