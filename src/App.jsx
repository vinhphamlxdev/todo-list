import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Todo from "./components/Todo/Todo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App h-screen flex justify-center items-center p-3 bg-yellow-300 relative">
      <Todo />
    </div>
  );
}

export default App;
