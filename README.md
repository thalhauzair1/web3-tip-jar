# 🪙 Web3 Tip Jar (React Component)

A sleek and reusable **Crypto Tip Jar** React component built with MetaMask, Ethers.js, and CoinGecko API.
Perfect for personal websites, donation widgets, or embedding in your open-source projects.

---

## 🚀 Features

- 💸 Send ETH tips directly to your wallet
- 🎉 Confetti animation on success
- 🔐 MetaMask connect + wallet detection
- 💲 Real-time ETH → USD conversion

---

## 📦 Installation

Clone the project:

```bash
git clone https://github.com/yourusername/web3-tip-jar.git
cd web3-tip-jar
npm install
```

### Setup Environment

Create a `.env` file at the root:

```
VITE_TIP_JAR_WALLET=0xYourEthereumAddressHere
```

Add `.env` to your `.gitignore`:

```
.env
```

---

## 💻 Usage in React

Import the component into your app:

```jsx
import TipJar from "./components/TipJar";

function App() {
  return (
    <div>
      <TipJar />
    </div>
  );
}
```

Run the project:

```bash
npm run dev
```

---

## 🔧 Technologies Used

- React + Vite
- MetaMask API (`window.ethereum`)
- Ethers.js for Web3 interaction
- Axios for ETH price
- react-confetti for celebration 🎉
- CSS-in-JS styles

---
