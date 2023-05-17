import { useState } from "react";
import "./App.css";
import { ChromePicker } from "react-color";
import { Component } from 'react';

function App() {
  const [color, setColor] = useState("#242424");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [value, setValue] = useState("Добро пожаловать!");

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    document.body.style.backgroundColor = newColor.hex;
  };

  const handleClick = () => {
    const lastClickTime = localStorage.getItem("lastClickTime");
    const currentTime = new Date().getTime();
    if (!lastClickTime || currentTime - lastClickTime >= 24 * 60 * 60 * 1000) {
      console.log("Кнопка была нажата!");
      var input_taker = document.getElementById('input-note').value;
      setValue("заметка видна всем!");
      document.getElementById('note-text').innerHTML = input_taker;
      localStorage.setItem("lastClickTime", currentTime);
      setIsButtonDisabled(true);
      localStorage.setItem('note-text', input_taker);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 24 * 60 * 60 * 1000);
    } else {
      console.log("Кнопку можно нажимать только раз в день!");
      setValue("изменять заметку можно только один раз в день!");

    }
  }; 
  return (
    <div className="App">
      <div className="color-panel">
        <ChromePicker
          color={color}
          onChangeComplete={handleColorChange}
          onChange={(newColor) => setColor(newColor.hex)}
        />
      </div>
      <div
        className="rectangle1"
        style={{
          boxShadow: `0px 0px 30px ${color}`,
        }}
      >
        <div
          className="rectangle2"
          style={{
            boxShadow: `0px 0px 10px ${color}`,
          }}>
            <p id='note-text' style={{
              color: `${color}`
              
            }}>{localStorage.getItem('note-text')}</p>
        </div>
        <div
          className="rectangle3"
          style={{
            boxShadow: `0px 0px 20px ${color}`,
          }}>
            <h2 id="globaltext" onClick={handleClick} style={{
              color: `${color}`
            }}>{value}</h2> 
        </div>
        <h2 className="quick-note" style={{
          color:`${color}`
        }}>Quick Note</h2>
        <p className="info1" style={{
          color:`${color}`
        }}>
          текущая заметка:
        </p>
        <input type="text" id="input-note" style={{
          color:`${color}`,
          boxShadow: `0px 0px 20px ${color}`,
        }}/>
        <button onClick={handleClick} id="button-note" style={{
          boxShadow: `0px 0px 10px ${color}`,
          color: `${color}`
        }}
        >Отправить</button>
      </div>
    </div>
  );
}

export default App;