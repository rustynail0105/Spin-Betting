import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// import "./wallet.css";

const WalletButton = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton className="connect-wallet-btn" />
    </WalletModalProvider>
  );
};

export default WalletButton;
