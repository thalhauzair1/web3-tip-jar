// TipJar.jsx
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import axios from "axios";

const TipJar = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [ethPrice, setEthPrice] = useState(null);

  const recipient = import.meta.env.VITE_TIP_JAR_WALLET;
  const { width, height } = useWindowSize();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      .then((res) => setEthPrice(res.data.ethereum.usd))
      .catch((err) => console.error("Price fetch failed", err));
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setConnected(true);
      setStatus("");
    } catch (err) {
      console.error(err);
      alert("❌ Connection failed.");
    }
  };

  const sendTip = async () => {
    if (!walletAddress || !amount || Number(amount) <= 0) {
      setStatus("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: walletAddress,
            to: recipient,
            value: ethers.parseEther(amount).toString(),
          },
        ],
      });

      setStatus("🎉 Thanks for the tip!");
      setAmount("");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (err) {
      console.error(err);
      setStatus("❌ Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {showConfetti && <Confetti width={width} height={height} />}

      <div style={styles.card}>
        <h2 style={styles.title}>✨ Support Me with Crypto</h2>

        {connected ? (
          <>
            <p style={styles.address}>Wallet: {walletAddress}</p>

            <input
              type="number"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              disabled={loading}
            />

            {ethPrice && amount && (
              <p style={styles.conversion}>
                ≈ ${(Number(amount) * ethPrice).toFixed(2)} USD
              </p>
            )}

            <button onClick={sendTip} style={styles.button} disabled={loading}>
              {loading ? "Sending..." : "💸 Send Tip"}
            </button>
          </>
        ) : (
          <button onClick={connectWallet} style={styles.button}>
            🔐 Connect MetaMask
          </button>
        )}

        {status && (
          <p
            style={{
              ...styles.status,
              color: status.includes("Thanks") ? "#8bc34a" : "#f44336",
            }}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #101010, #1e1e1e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    padding: "1rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.3)",
    color: "#fff",
    padding: "2rem",
    maxWidth: "360px",
    width: "100%",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  title: {
    fontSize: "1.6rem",
    marginBottom: "1.5rem",
  },
  input: {
    padding: "14px",
    width: "100%",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "16px",
    marginBottom: "1rem",
    outline: "none",
  },
  button: {
    padding: "14px",
    width: "100%",
    borderRadius: "12px",
    fontSize: "16px",
    background: "linear-gradient(90deg, #00bcd4, #2196f3)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  address: {
    fontSize: "13px",
    color: "#aaa",
    wordBreak: "break-word",
    marginBottom: "1rem",
  },
  status: {
    marginTop: "1rem",
    fontSize: "14px",
    fontWeight: 500,
  },
  conversion: {
    color: "#ccc",
    fontSize: "14px",
    marginBottom: "1rem",
  },
};

export default TipJar;
