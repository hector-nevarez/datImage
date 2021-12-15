/*global chrome*/
import React, { useState, useEffect, useRef } from "react";


function App(props) {
  const [images, setImages] = useState(null);
  // let images;


  // const getCurrentTab = async () => {
  //   let queryOptions = { active: true, currentWindow: true };
  // let [tab] = await chrome.tabs.query(queryOptions);
  // return tab;
  // }

  const handleClick = () => {
    chrome.tabs.query({ currentWindow: true, active: true },
      function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { scan: 'scanImages' }, setImageArray)
      })
    function setImageArray(res) {
      chrome.storage.local.set({ imageArray: res.imageArray })
      // images = res.imageArray;
      // -------The code below renders an image in the popup view -----
      // const div = document.createElement('img')
      // div.src= `${res.imageArray[0]}`
      // document.body.appendChild(div)
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    }
    // console.log('This is the array of images inside App.js!', imageArr)
  }

  const handleClickRetrieve = () => {
    chrome.storage.local.get(['imageArray'], (results) => {
      if (results.imageArray) {
        setImages(results.imageArray);
      }
    });
  }

  return (
    <div className="App">
      <h1>Image Information</h1>
      <div>
        <button onClick={handleClick} >Scan Images</button>
      </div>
      <div>
        <button onClick={handleClickRetrieve} >Get Image Data</button>
      </div>
      <div>
        {
          (!images) ?
            <p>Click the "Scan" button first, then the "Get Image data" button to see information from the web related to that image</p> :
            images.map((image, index) => {
              const div = document.createElement('img')
              div.src= image
              document.body.appendChild(div);
            })
        }
      </div>
    </div>
  );
}

export default App;
