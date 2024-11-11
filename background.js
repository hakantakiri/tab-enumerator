const regex = /^\s*\[\d+\]\s*/;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  updateTabTittle(tab);
});

chrome.tabs.onCreated.addListener(() => {
  updateTabTittles();
});

chrome.tabs.onMoved.addListener(() => {
  updateTabTittles();
});

chrome.tabs.onRemoved.addListener((tabId) => {
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
  let currentTitle = tab.title;
  if (regex.test(tab.title)) {
    currentTitle = currentTitle.substring(3);
  }

  if (
    tab.title.substring(0, 3) != `[${tab.index + 1}]` &&
    tab.title.substring(0, 4) != `[${tab.index + 1}]`
  ) {
    let currentTitle = tab.title;
    if (regex.test(tab.title)) {
      currentTitle = currentTitle.substring(3);
    }
    let newTitle = `[${tab.index + 1}] ${tab.title}`;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (title) => {
        document.title = title;
      },
      args: [newTitle],
    });
  }
}
