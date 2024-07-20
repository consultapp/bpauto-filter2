import { SITE_URL } from "@/fixtures/consts";

export default function TabYandexSearch() {
  return (
    <iframe
      width="100%"
      src={SITE_URL + "/yandex-search-goods/iframe.html"}
    ></iframe>
  );
}
