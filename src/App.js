/*global chrome*/
import React, { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";


function App(props) {
  const {imageArray}= props;
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null)

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  }

  useEffect(() => {
    loadModel();
  }, []);

  // if (isModelLoading) {
  //   return <h2>Model Loading...</h2>
  // }
  console.log('This is the images from App.js:', imageArray);

  return (
    <div className="App">
      <h1>Image Information</h1>

      <div>
        {
          (isModelLoading && !imageArray) ?
            <h2>Model Loading...</h2> :
            imageArray.map((image, index) => {
              const div = document.createElement('img')
              div.src = image
              document.body.appendChild(div);
              // <div key={index}><------------Why this doesn't work!!!!!
              //   <img src={image} />
              // </div>
            })
        }
      </div>
    </div>
  );
}

export default App;
