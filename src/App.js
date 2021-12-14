/*global chrome*/
import React, { useState, useEffect, useRef } from "react";


function App(props) {
  const [imageArr, setImageArr] = useState(null);
  let images;


  // const getCurrentTab = async () => {
  //   let queryOptions = { active: true, currentWindow: true };
  // let [tab] = await chrome.tabs.query(queryOptions);
  // return tab;
  // }

  const handleClick = () => {
    chrome.tabs.query({ currentWindow: true, active: true },
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, 'hi', setImageArray)
      })
    function setImageArray(res) {
      chrome.storage.local.set({ imageArray: res })
      // setImageArr(res);
      // -------The code below renders an image in the popup view -----
      // const div = document.createElement('img')
      // div.src= `${res.imageArray[0]}`
      // document.body.appendChild(div)
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    }
    // console.log('This is the array of images inside App.js!', imageArr)
  }

  // console.log('This is the array:',props.imageArray);
  return (
    <div className="App">
      <h1>Image Information</h1>
      <div>
        <button onClick={handleClick} >Scan Images</button>
      </div>
      {/* <div>
        {
          (!images) ?
            <p>Click the button to see the details</p> :
            // imageArr.forEach((image, index)=>{
            //   <div key={index}>
            //     <p>{image}</p>
            //   </div>
            // })
            <p>{images}</p>
        }
      </div> */}
    </div>
  );
}

export default App;
