const regex1d = /^\s*\·\d\·\s*/; // Matches if text starts with [<1number>]
const regex2d = /^\s*\·\d{2}\·\s*/; // Matches if text starts with [<2numbers>]
const regex3d = /^\s*\·\d{3}\·\s*/; // Matches if text starts with [<3numbers>]

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  updateTabTittle(tab);
});

chrome.tabs.onCreated.addListener(() => {
  updateTabTittles();
});

chrome.tabs.onMoved.addListener(() => {
  updateTabTittles();
});

chrome.tabs.onRemoved.addListener(() => {
  updateTabTittles();
});

function updateTabTittles() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tab, index) => {
      updateTabTittle(tab);
    });
  });
}

function updateTabTittle(tab) {
  const oldTitle = tab.title;
  let currentTitle = tab.title;

  if (regex1d.test(tab.title)) {
    currentTitle = currentTitle.substring(4);
  }
  if (regex2d.test(tab.title)) {
    currentTitle = currentTitle.substring(5);
  }
  if (regex3d.test(tab.title)) {
    currentTitle = currentTitle.substring(6);
  }

  let newTitle = `·${tab.index + 1}· ${currentTitle}`;

  if (oldTitle != newTitle) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (title) => {
        document.title = title;
      },
      args: [newTitle],
    });
  }
}
