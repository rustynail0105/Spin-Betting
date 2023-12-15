import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { useBalanceContext } from "src/contexts/useBalanceContext";
import { useStatusContext } from "src/contexts/useStatusContext";
import { Status } from "src/constants/Constants";
import TOKENLOGO from "assets/svg/token_logo.svg";
// import INFO from "assets/svg/information-circle.svg";
// import HISTORY from "assets/svg/calendar.svg";
import Roulette from "../Roulette/Roulette";
import "./Home.css";
import "react-toastify/dist/ReactToastify.css";

const PATTERN = /^[0-9]*[.,]?[0-9]*$/;
const PLEASECONNECTWALLET = "Wallet is not connected";
const INPUTDEPOSITEAMOUNT = "Input Deposite Amount";
const NOTENOUGHBALANCE = "Not Enough Balance";

const Home = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { balance, setBalance } = useBalanceContext();
  const { status, mappingStatusTo } = useStatusContext();
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [tokenAmount, setTokenAmount] = useState<string>("");
  /**
   * set deposite token amount
   *
   */
  const handleTokenAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!PATTERN.test(event.target.value)) return;
    setTokenAmount(event.target.value);
  };
  /**
   * deposite $TOKE token
   */
  const handleDeposite = () => {
    if (!isWalletConnected) {
      toast.error(PLEASECONNECTWALLET, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (Number(tokenAmount) <= 0) {
      toast.error(INPUTDEPOSITEAMOUNT, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    console.log("Token Amount is: ", Number(tokenAmount));
    console.log("Token Balance is: ", balance);
    if (Number(tokenAmount) >= balance / LAMPORTS_PER_SOL) {
      toast.error(NOTENOUGHBALANCE, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    /**start api call for deposite */
    /**end api call for deposite */
    mappingStatusTo(Status.AFTER_DEPOSITE);
  };

  const handleSpin = () => {
    mappingStatusTo(Status.BEFORE_SPIN);
    /**start api call for spin */
    /**end api call for spin */
    setTokenAmount("");
  };

  useEffect(() => {
    if (!connection || !wallet.publicKey) {
      return;
    }

    connection.onAccountChange(
      wallet.publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(wallet.publicKey).then((info) => {
      if (info) {
        setBalance(info.lamports);
      }
    });
  }, [wallet, wallet.publicKey, connection]);

  useEffect(() => {
    if (wallet.connected) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
      mappingStatusTo(Status.BEFORE_DEPOSITE);
    }
  }, [wallet, wallet.connected]);

  return (
    <>
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
          <Roulette />
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
            width: { sm: "500px", xs: "80%" },
            height: "56px",
            margin: "auto",
            background: "#040824",
          }}
        >
          <img src={TOKENLOGO} alt="TOKENLOGO"></img>
          <input
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            className="deposite-amount"
            placeholder="0.00"
            value={tokenAmount}
            onChange={handleTokenAmount}
          />
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
              width: { sm: "500px", xs: "80%" },
              height: "48px",
              padding: "12px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              background:
                "var(--Prime-Gradient, linear-gradient(180deg, #00B0F8 0%, #00ADEA 100%))",
              borderRadius: "8px",
            }}
            onClick={
              status == Status.BEFORE_DEPOSITE || status == Status.AFTER_SPIN
                ? handleDeposite
                : handleSpin
            }
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
              {status == Status.BEFORE_DEPOSITE || status == Status.AFTER_SPIN
                ? "DEPOSITE NOW"
                : "SPIN NOW"}
            </Typography>
          </Button>
        </Grid>
        {/* <Grid
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
        </Grid> */}
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Home;
