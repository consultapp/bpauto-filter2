interface CarApiItem {
  code: string;
  id: string;
  name: string;
  parent: string | null;
  parentId: string | null;
  url: string;
}

declare interface Window {
  SOCIAL_RATING_FILTER: {
    [key in "avito" | "yandex"]: {
      rating: string;
      link: string;
    };
  };
}
