
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.storage.local.set({ imageArray: request.imageArray })
})

chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.create({ url: 'index.html' })
})