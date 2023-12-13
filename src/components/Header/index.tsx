import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import WalletButton from "../WalletButton";
import logo from "assets/svg/logo.svg";

const Header = () => {
  return (
    <Grid
      container
      paddingX={{ xs: "100px" }}
      paddingY={{ xs: "40px" }}
      justifyContent={"space-between"}
    >
      <Grid container gap={1} width={"fit-content"} alignItems={"center"}>
        <img src={logo} alt="logo" />
        <Typography
          align="center"
          fontSize={"25px"}
          fontFamily={"Acme"}
          fontStyle={"normal"}
          lineHeight={"32px"}
          color={"#FFFFFF"}
          textAlign={"center"}
        >
          Spin to Win
        </Typography>
      </Grid>
      <WalletButton />
    </Grid>
  );
};

export default Header;
