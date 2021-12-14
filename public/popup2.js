document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick() {
        chrome.tabs.query({ currentWindow: true, active: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'hi', setImageArray)
            })
    }
    function setImageArray(res){
        chrome.storage.local.set({imageArray: res}, function(){
            console.log('Value array is set');
        })
    }
}, false)