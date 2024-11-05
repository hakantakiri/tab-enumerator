document.addEventListener("DOMContentLoaded", () => {
  const tabList = document.getElementById("tabList");
  console.log("New tab list:");
  console.log(tabList);

  // Send message to background script to get tabs
  chrome.runtime.sendMessage({ action: "getTabs" }, (tabs) => {
    tabs.forEach((tab) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${tab.index}: ${tab.title}`;
      listItem.title = tab.url;
      tabList.appendChild(listItem);
    });
  });
});
