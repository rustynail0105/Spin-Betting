import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Grid, List, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { ToastContainer, toast } from "react-toastify";
import { useBalanceContext } from "src/contexts/useBalanceContext";
import { useStatusContext } from "src/contexts/useStatusContext";
import { Status } from "src/constants/Constants";
import TOKENLOGO from "assets/svg/token_logo.svg";
import INFO from "assets/svg/information-circle.svg";
import HISTORY from "assets/svg/calendar.svg";
import DOUBLE from "assets/svg/double.svg";
import DRAW from "assets/svg/draw.svg";
import BURN from "assets/svg/burn.svg";
import DEPOSIT from "assets/svg/deposit.svg";
import CROSS from "assets/svg/cross.svg";
import Roulette from "../Roulette/Roulette";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

interface BettingHistory {
  image: string;
  bettingResult: string;
  bettingAmount: string;
  prizeAmount: string;
  date: string;
}

const PATTERN = /^[0-9]*[.,]?[0-9]*$/;
const PLEASECONNECTWALLET = "Wallet is not connected";
const INPUTDEPOSITEAMOUNT = "Input Deposite Amount";
const NOTENOUGHBALANCE = "Not Enough Balance";

const bettingHistory: BettingHistory[] = [
  {
    image: DOUBLE,
    bettingResult: "Win Double Prize",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "Just now",
  },
  {
    image: DRAW,
    bettingResult: "Draw",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "2m ago",
  },
  {
    image: BURN,
    bettingResult: "Burn",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "10m ago",
  },
  {
    image: DEPOSIT,
    bettingResult: "Deposite",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "1h ago",
  },
  {
    image: DOUBLE,
    bettingResult: "Win Double Prize",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "Just now",
  },
  {
    image: DRAW,
    bettingResult: "Draw",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "2m ago",
  },
  {
    image: BURN,
    bettingResult: "Burn",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "10m ago",
  },
  {
    image: DEPOSIT,
    bettingResult: "Deposite",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "1h ago",
  },
  {
    image: DOUBLE,
    bettingResult: "Win Double Prize",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "Just now",
  },
  {
    image: DRAW,
    bettingResult: "Draw",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "2m ago",
  },
  {
    image: BURN,
    bettingResult: "Burn",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "10m ago",
  },
  {
    image: DEPOSIT,
    bettingResult: "Deposite",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "1h ago",
  },
  {
    image: DOUBLE,
    bettingResult: "Win Double Prize",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "Just now",
  },
  {
    image: DRAW,
    bettingResult: "Draw",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "2m ago",
  },
  {
    image: BURN,
    bettingResult: "Burn",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "10m ago",
  },
  {
    image: DEPOSIT,
    bettingResult: "Deposite",
    bettingAmount: "125",
    prizeAmount: "250",
    date: "1h ago",
  },
];

const Home = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { balance, setBalance } = useBalanceContext();
  const { status, mappingStatusTo } = useStatusContext();
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [helpAnchor, setHelpAnchor] = useState<boolean>(false);
  const [historyAnchor, setHistoryAnchor] = useState<boolean>(false);
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

  const showHelp = () => {
    console.log("Help");
    setHelpAnchor(!helpAnchor);
  };

  const showHistory = () => {
    console.log("History");
    setHistoryAnchor(!historyAnchor);
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
        <Grid
          position={"absolute"}
          right={"0px"}
          top={{ xs: "10%", md: "50%" }}
          sx={{
            transform: "translateY(-50%)",
          }}
        >
          <Grid
            container
            marginBottom={"10px"}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
              display: "flex",
              padding: "12px 24px 12px 12px",
              alignItems: "cente",
              gap: "10px",
              borderRadius: "100px 0px 0px 100px",
              background: "linear-gradient(180deg, #333A71 0%, #1A204F 100%)",
              boxShadow:
                "0px -2.5px 0px 0px #141A43 inset, 0px 2px 0px 0px #3A427B inset, -2px 12px 16px 0px rgba(0, 0, 0, 0.16)",
            }}
            onClick={showHelp}
          >
            <Drawer
              anchor={"right"}
              open={helpAnchor}
              onClose={() => setHelpAnchor(!helpAnchor)}
            >
              <Grid
                sx={{
                  background: "#091042",
                  width: { xs: "100%", sm: "500px" },
                  height: "100vh",
                }}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{
                    padding: "24px",
                    gap: "8px",
                    borderBottom: "1px solid #202754",
                  }}
                >
                  <Grid container gap={"10px"} width={"fit-content"}>
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
                    alignItems={"center"}
                    width={"fit-content"}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <img src={CROSS} alt="CROSS" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  flexDirection={"column"}
                  sx={{
                    paddingX: "24px",
                    paddingY: "16px",
                    gap: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Rubix",
                      fontSize: "16px",
                      fontStyle: "normal",
                      lineHeight: "24px",
                    }}
                  >
                    Let’s us explain what makes out platform using a fair play
                    policy for you in this platform.
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Rubix",
                      fontSize: "16px",
                      fontStyle: "normal",
                      lineHeight: "24px",
                    }}
                  >
                    How the logic we use on the platform:
                    <List
                      sx={{
                        listStyle: "disc",
                        paddingLeft: "24px",
                      }}
                    >
                      <li>2 for DRAW (25% odds)</li>
                      <li>2 for DOUBLE (25% odds)</li>
                      <li>2 for LOSE (25% odds)</li>
                      <li>2 for BURN (25% odds)</li>
                    </List>
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FFF",
                      fontFamily: "Rubix",
                      fontSize: "16px",
                      fontStyle: "normal",
                      lineHeight: "24px",
                    }}
                  >
                    Let’s us explain what makes out platform using a fair play
                    policy for you in this platform.
                  </Typography>
                </Grid>
              </Grid>
            </Drawer>
            <img src={INFO} alt="INFO" />
            <Typography
              color={"#FFF"}
              fontFamily={"Acme"}
              fontSize={"16px"}
              fontStyle={"normal"}
              fontWeight={400}
              lineHeight={"20px"}
              textAlign={"center"}
              display={{ xs: "none", md: "block" }}
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
              display: "flex",
              padding: "12px 24px 12px 12px",
              alignItems: "cente",
              gap: "10px",
              borderRadius: "100px 0px 0px 100px",
              background: "linear-gradient(180deg, #333A71 0%, #1A204F 100%)",
              boxShadow:
                "0px -2.5px 0px 0px #141A43 inset, 0px 2px 0px 0px #3A427B inset, -2px 12px 16px 0px rgba(0, 0, 0, 0.16)",
            }}
            onClick={showHistory}
          >
            <Drawer
              anchor={"right"}
              open={historyAnchor}
              onClose={() => setHelpAnchor(!historyAnchor)}
            >
              <Grid
                sx={{
                  background: "#091042",
                  width: { xs: "100%", sm: "500px" },
                  height: "100vh",
                  overflowY: "auto",
                }}
              >
                <Grid
                  container
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={{
                    padding: "24px",
                    gap: "8px",
                    borderBottom: "1px solid #202754",
                  }}
                >
                  <Grid container gap={"10px"} width={"fit-content"}>
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
                      Betting History
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    alignItems={"center"}
                    width={"fit-content"}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <img src={CROSS} alt="CROSS" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  flexDirection={"column"}
                  sx={{
                    paddingX: "24px",
                    paddingY: "12px",
                    gap: "12px",
                  }}
                >
                  {bettingHistory.map((history) => {
                    return (
                      <>
                        <Grid
                          container
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          sx={{
                            gap: "14px",
                          }}
                        >
                          <img src={history.image} alt="image" />
                          <Typography
                            sx={{
                              color: "#FFF",
                              fontFamily: "Rubik",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 500,
                              lineHeight: "24px",
                            }}
                          >
                            {history.bettingResult}
                            <br />
                            <span className="amount">Amount: </span>
                            {history.bettingAmount} $TOKE
                          </Typography>
                          <Typography>
                            <span className="prizeAmount">
                              {history.prizeAmount} $TOKE
                            </span>
                            <br />
                            <span className="date">{history.date}</span>
                          </Typography>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Grid>
            </Drawer>
            <img src={HISTORY} alt="HISTORY" />
            <Typography
              color={"#FFF"}
              fontFamily={"Acme"}
              fontSize={"16px"}
              fontStyle={"normal"}
              fontWeight={400}
              lineHeight={"20px"}
              textAlign={"center"}
              display={{ xs: "none", md: "block" }}
            >
              History
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Home;
