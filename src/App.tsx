import "react-widgets/styles.css";
import { Combobox } from "react-widgets/cjs";
import { useState } from "react";
import "./App.css";

function App() {
  const [currentColor, changeColor] = useState("white");

  const onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    console.log(typeof currentColor);
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [currentColor],
      func: (currentColor) => {
        document.body.style.background = currentColor;
        //@ts-expect-error: Stupid ts
        document.documentElement.style.background = changeColor
        // document.documentElement.style.background = changeColor
      },
    });
  };

  const colors = [
    "aliceblue",
    "antiquewhite",
    "azure",
    "beige",
    "bisque",
    "burlywood",
    "cadetblue",
    "darkgray",
  ];

  return (
    <>
      <div className="card">
        <Combobox
          value={currentColor}
          data={colors}
          onChange={(newVal) => changeColor(newVal)}
        />
        <br />
        <button onClick={onclick}>Change background!</button>
      </div>
    </>
  );
}

export default App;
