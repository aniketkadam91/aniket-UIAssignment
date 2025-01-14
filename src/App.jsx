import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Rewards from "./components/Rewards";
import Header from "./UI/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Rewards></Rewards>
    </>
  );
}

export default App;
