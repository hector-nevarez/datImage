let imageNodeList = document.querySelectorAll("img");
// imageNodeList.forEach((image) => {
//     console.log(image.src);
// })
let imageArray = Array.from(imageNodeList);
imageArray = imageArray.map((image) => {
    // console.log(image.src);
    return image.src;
})
chrome.runtime.sendMessage({ imageArray: imageArray })
// console.log('This is imageArray in content-script:', imageArray)
// sendResponse({ imageArray });// <-- was doing this
    // chrome.storage.local.set({ imageArray })


    // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.scan === 'scanImages') {
//         let imageNodeList = document.querySelectorAll("img");
//         let imageArray = Array.from(imageNodeList);
//         imageArray = imageArray.map((image) => {
//             return image.src;
//         })
//     }
// })