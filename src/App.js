import React, { useState, useEffect, useRef } from "react";


function App(props) {

  // useEffect(()=>{

  // },[])

  // const getCurrentTab = async () => {
  //   let queryOptions = { active: true, currentWindow: true };
  // let [tab] = await chrome.tabs.query(queryOptions);
  // return tab;
  // }

  // const handleClick = () => {
  //   document.chrome.tabs.query({
  //     currentWindow: true,
  //     active: true
  //   },
  //     function (tabs) {
  //       document.chrome.tabs.sendMessage(tabs[0].id, 'hi')
  //     })
  // }
  // console.log('This is the array:',props.imageArray);
  return (
    <div className="App">
      <h1>Image Information</h1>
      <div>
        <button>Scan Images</button>
      </div>

    </div>
  );
}

export default App;
