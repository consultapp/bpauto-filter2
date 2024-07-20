import { SITE_URL } from "@/fixtures/consts";
import { memo, useEffect, useState } from "react";

const TabYandexSearch = memo(function TabYandexSearch() {
  const [htmlFileString, setHtmlFileString] = useState<string>();

  async function fetchHtml() {
    fetch(`${SITE_URL}/yandex-search-goods/iframe.html`)
      .then((data) => data.text())
      .then((text) => {
        setHtmlFileString(text);
      });
  }
  useEffect(() => {
    fetchHtml();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlFileString ?? "" }}></div>;
});

export default TabYandexSearch;
