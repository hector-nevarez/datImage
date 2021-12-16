let imageNodeList = document.querySelectorAll("img");
let imageArray = Array.from(imageNodeList);
imageArray = imageArray.map((image) => {
    // console.log(image.src);
    return image.src;
})
chrome.runtime.sendMessage({ imageArray: imageArray })
