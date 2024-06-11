import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const passwordRef = useRef(null);

  const generatePass = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    console.log(password);
    setPassword(pass);
  }, [length, numbersAllowed, charAllowed]);

  useEffect(() => {
    generatePass();
  }, [length, numbersAllowed, charAllowed]);

  const copyPass = () => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password);
  };

  return (
    <div style={{ color: "blue" }}>
      <div>
        <h1>password generator</h1>
        <input type="text" value={password} readOnly ref={passwordRef} />
        <button onClick={copyPass}> copy</button>
      </div>
      <div>
        <input
          type="range"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <p>{length}</p>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            setNumbersAllowed(!numbersAllowed);
          }}
        />
        <p>number</p>

        <br />
        <input
          type="checkbox"
          onChange={() => {
            setCharAllowed(!charAllowed);
          }}
        />
        <p>char charAllowed</p>
      </div>
    </div>
  );
}

export default App;
