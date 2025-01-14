import { useState } from "react";
import "./App.css";
import Rewards from "./components/Rewards";
import Header from "./UI/Header";

/**
 * Main application component.
 * Integrates the Header and Rewards components.
 *
 * @component
 */

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
