/*global chrome*/
import React, { useState, useEffect, useRef } from "react";


function App(props) {
  const [images, setImages] = useState(null);



  return (
    <div className="App">
      <h1>Image Information</h1>
      
      <div>
        {
          (!props.imageArray) ?
            <p>Click the "Scan" button first, then the "Get Image data" button to see information from the web related to that image</p> :
            props.imageArray.map((image, index) => {
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
