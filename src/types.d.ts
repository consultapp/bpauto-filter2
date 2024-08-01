interface CarApiItem {
  code: string;
  id: string;
  name: string;
  parent: string | null;
  parentId: string | null;
  url: string;
}

declare const window: {
  SOCIAL_RATING_FILTER: {
    [key in "avito" | "yandex"]: {
      rating: number;
      link: string;
    };
  };
};
