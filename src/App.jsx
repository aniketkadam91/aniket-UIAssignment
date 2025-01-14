import { useState } from "react";
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
