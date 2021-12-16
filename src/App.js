/*global chrome*/
import React, { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import axios from "axios";

// const imageArray = [
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Steve_Davis_at_Snooker_German_Masters_%28Martin_Rulsch%29_2014-01-29_06.jpg/145px-Steve_Davis_at_Snooker_German_Masters_%28Martin_Rulsch%29_2014-01-29_06.jpg",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/TCMI_Atari810_front.jpg/161px-TCMI_Atari810_front.jpg",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/2021%2C_08%2C_Zach_Collaros.jpg/118px-2021%2C_08%2C_Zach_Collaros.jpg",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Adolf_Eichmann_at_Trial1961.jpg/121px-Adolf_Eichmann_at_Trial1961.jpg",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Kabukicho_red_gate_and_colorful_neon_street_signs_at_night%2C_Shinjuku%2C_Tokyo%2C_Japan.jpg/350px-Kabukicho_red_gate_and_colorful_neon_street_signs_at_night%2C_Shinjuku%2C_Tokyo%2C_Japan.jpg",
//   "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Commons-logo.svg/31px-Commons-logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/MediaWiki-2020-icon.svg/35px-MediaWiki-2020-icon.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Wikimedia_Community_Logo.svg/35px-Wikimedia_Community_Logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikibooks-logo.svg/35px-Wikibooks-logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Wikidata-logo.svg/47px-Wikidata-logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Wikinews-logo.svg/51px-Wikinews-logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Wikiquote-logo.svg/35px-Wikiquote-logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Wikisource-logo.svg/35px-Wikisource-logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Wikispecies-logo.svg/35px-Wikispecies-logo.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Wikiversity_logo_2017.svg/41px-Wikiversity_logo_2017.svg.png",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wikivoyage-Logo-v3-icon.svg/35px-Wikivoyage-Logo-v3-icon.svg.png",
//   "https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Wiktionary-logo-v2.svg/35px-Wiktionary-logo-v2.svg.png",
//   "https://en.wikipedia.org/static/images/footer/wikimedia-button.png",
//   "https://en.wikipedia.org/static/images/footer/poweredby_mediawiki_88x31.png"
// ];

function App(props) {
  const { imageArray } = props;
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null)
  const [prediction, setPrediction] = useState('');
  const [wikiData, setWikiData] = useState('');
  const [wikiDataStatus, setWikiDataStatus] = useState(false);


  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const modelLoaded = await mobilenet.load();
      // console.log('This is the modelLoaded from App.js:', modelLoaded);
      setModel(modelLoaded);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  }

  useEffect(() => {
    loadModel();
  }, []);

  // console.log('This is the images from App.js:', imageArray);
  const handleIdentify = async (index) => {
    let getImage = document.getElementById(`image_${index}`)
    // console.log('-------------------------------', getImage)
    const predictions = await model.classify(getImage, 1);
    // console.log('This is the Identification results from App.js:', predictions);
    // The predictions are not a single word all the time hence, we have make sure is only one word to contact the Wikipedia API.
    let formatPredictions = predictions[0].className.split(', ');
    formatPredictions = formatPredictions.map((prediction) => {
      let dividePrediction = prediction.split(' ');
      if (dividePrediction.length > 0 && typeof dividePrediction == 'object') {
        dividePrediction = dividePrediction.map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        })
        return dividePrediction.join('%20');
      } else {
        return prediction[0].toUpperCase() + prediction.slice(1)
      }
    })
    setPrediction(formatPredictions);
  }

  // console.log('This is the state prediiction from App.js:', prediction);

  const handlePressPrediction = async (prediction) => {
    setWikiDataStatus(true);
    const wikiData = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&generator=search&redirects=1&formatversion=2&exsentences=10&exlimit=1&exintro=1&explaintext=1&gsrsearch=${prediction}&gsrlimit=1&gsrenablerewrites=1`);
    // console.log('This is the data found in Wikipedia:', wikiData.data.query.pages[0]);
    setWikiData(wikiData.data.query.pages[0].extract);
  }

  return (
    <div className="App">
      <h1>DatImage</h1>
      <div className="mainWrapper">
        <h2>Images from the website you visited</h2>
        <div className="mainContent">
          <div className="imageWrapper">
            {
              (isModelLoading) ?
                <h2>Model Loading...</h2> :
                imageArray.map((image, index) => {
                  return (
                    <div key={index} className="imageHolder">
                      <img src={image} alt="Image obtained from the page" crossOrigin="anonymous" id={`image_${index}`} />
                      <button className="button" onClick={() => handleIdentify(index)}>Identify Image</button>
                    </div>
                  )
                })
            }
          </div>
          <table className="resultsHolder">
            <thead>
              <tr>
                <th colSpan="2" >Predictions:</th>
              </tr>
            </thead>
            <tbody>
              {
                (prediction.length > 0) ? prediction.map((pred, index) => {
                  return (
                    <tr key={index} onClick={() => handlePressPrediction(pred)}>{pred.split("%20").join(' ')}
                    </tr>
                  )
                }) :
                  <tr>
                    No predictions yet...Perhaps you should try to hit the "identify" button first
                  </tr>
              }
            </tbody>
          </table>
          {
            (wikiDataStatus) ?
              <div className="wikiData">
                <h3 >Data from Wikipedia:</h3>
                <p>{wikiData}</p>
              </div> :
              <span></span>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
