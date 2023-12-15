import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import DOUBLE from "assets/img/double.png";
import { Wheel } from "./components/Wheel";
import { getRandomInt } from "./utils";
import { Status } from "src/constants/Constants";
import { useStatusContext } from "src/contexts/useStatusContext";
import "./Roulette.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#12151E",
  maxWidth: "450px",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
  borderRadius: "0px 0px 16px 16px",
  borderColor: "#12151E",
};

const Roulette = () => {
  const { status, mappingStatusTo } = useStatusContext();
  const [couponNum, setCouponNum] = useState<number>(1);
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCollect = () => {
    setOpen(false);
    mappingStatusTo(Status.AFTER_SPIN);
  };

  const handleDeplayedOpen = () => {
    setTimeout(() => {
      handleOpen();
    }, 1000);
  };

  const onClick = () => {
    if (!spinning) {
      setSpinning(true);
      const newCouponNum = getRandomInt(1, 9);
      setCouponNum(newCouponNum);
      console.log(newCouponNum);
      setMustSpin(true);
    }
  };

  useEffect(() => {
    if (status == Status.BEFORE_SPIN) {
      onClick();
    }
  }, [status]);

  return (
    <>
      <div className="wheelContainer">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={couponNum}
          onStopSpinning={() => {
            setSpinning(false);
            setMustSpin(false);
            handleDeplayedOpen();
          }}
        />
      </div>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            color={"#FFF"}
            textAlign={"center"}
            fontFamily={"Acme"}
            fontSize={"28px"}
            fontStyle={"normal"}
            fontWeight={400}
            lineHeight={"37px"}
          >
            Congratulations!!! You win Double Prize
          </Typography>
          <Grid>
            <img src={DOUBLE} alt="double" />
          </Grid>
          <Grid container flexDirection={"column"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              sx={{
                fontSize: "18px",
                display: "flex",
                height: "48px",
                padding: "12px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                background:
                  "var(--Prime-Gradient, linear-gradient(180deg, #00B0F8 0%, #00ADEA 100%))",
                borderRadius: "8px",
              }}
              onClick={handleCollect}
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
                Collect
              </Typography>
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Roulette;
