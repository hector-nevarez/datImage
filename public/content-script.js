chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // alert(request);
    let imageNodeList = document.querySelectorAll("img");
    // imageNodeList.forEach((image) => {
    //     console.log(image.src);
    // })
    let imageArray= Array.from(imageNodeList);
    sendResponse({imageArray});
})