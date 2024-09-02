// console.log("字体设置器 content script 已注入");

chrome.storage.sync.get(["enableAllSites", "allowedUrls", "excludedUrls", "font"], ({ enableAllSites, allowedUrls, excludedUrls, font }) => {
  // console.log("从存储中加载的设置:", {
  //   enableAllSites,
  //   allowedUrls,
  //   excludedUrls,
  //   font,
  // });

  const currentUrl = window.location.href;
  const isAllowed = enableAllSites || allowedUrls.some((url) => currentUrl.includes(url));
  const isExcluded = excludedUrls.some((url) => currentUrl.includes(url));

  if (isAllowed && !isExcluded && font) {
    // console.log("应用字体:", font);
    document.body.style.fontFamily = font;
  } else {
    // console.log("当前页面不符合应用字体的条件");
  }
});
