function F(w, d, c) {
  let s = d.createElement("script"),
    h = d.getElementsByTagName("script")[0],
    e = d.documentElement;
  if ((" " + e.className + " ").indexOf(" ya-page_js_yes ") === -1) {
    e.className += " ya-page_js_yes";
  }
  s.type = "text/javascript";
  s.async = true;
  s.charset = "utf-8";
  s.src =
    (d.location.protocol === "https:" ? "https:" : "http:") +
    "//site.yandex.net/v2.0/js/all.js";
  h.parentNode.insertBefore(s, h);
  (w[c] || (w[c] = [])).push(function () {
    // eslint-disable-next-line no-undef
    Ya.Site.Form.init();
  });
}

export const yandexSearchScript = () => {
  window.ya_site_path = {
    serp: "//site.yandex.ru/search/site/catalog/",
  };
  F(window, document, "yandex_site_callbacks");
};
