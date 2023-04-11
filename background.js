async function rewriteURL(requestDetails) {
  if (
    requestDetails.originUrl === undefined &&
    requestDetails.type === "main_frame" &&
    requestDetails.url.startsWith("http")
  ) {
    let url = new URL(requestDetails.url);
    if (url.search === "") {
      let searchEngines = await browser.search.get();
      let defaultSearchEngine = searchEngines.find((engine) => engine.isDefault);
      if (defaultSearchEngine) {
        let searchURL = defaultSearchEngine.searchUrl + encodeURIComponent(url.href);
        return { redirectUrl: searchURL };
      }
    }
  }
}

browser.webRequest.onBeforeRequest.addListener(
  rewriteURL,
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"]
);

