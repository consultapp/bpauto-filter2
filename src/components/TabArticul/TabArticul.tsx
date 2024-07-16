import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { API_URL, SEARCH_BY_ARTICUL } from "@/fixtures/consts";
import SearchContent from "../DroppingWindow/DroppingWindow";
import CustomInput from "../ui/CustomInput/CustomInput";
import { LoaderCircle } from "lucide-react";
import classNames from "classnames";

function checkAA(str: string) {
  const arr = ["А", "а", "Ф", "ф", "a"];
  arr.forEach((item) => {
    if (str.includes(item)) {
      str = str.replace(item, "A");
    }
  });
  console.log("str", str);
  return str;
}

function debounced(cb: (s: string) => void) {
  let timer: number | null = null;
  return (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(value);
    }, 400);
  };
}

export default function TabArticul() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<
    { NAME: string; DETAIL_PAGE_URL: string; QUANTITY: string }[] | null
  >(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSearch = useCallback(
    debounced((s: string) => {
      const searchUrl = new URL(API_URL + SEARCH_BY_ARTICUL);
      searchUrl.searchParams.set("s", s);

      if (s.length > 2) {
        setLoading(true);
        fetch(searchUrl, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => {
            console.log("data", data);
            setResults(data);
            setLoading(false);
          })
          .catch((e) => {
            console.error("Fetch error.", e);
          });
      }
    }),
    [setValue, setLoading]
  );

  useEffect(() => {
    if (value) fetchSearch(value);
  }, [fetchSearch, value]);

  return (
    <>
      <div className={styles.root}>
        <CustomInput
          placeholder="Артикул"
          value={value}
          max={8}
          svg={
            <LoaderCircle
              className={classNames(loading && styles.rotate, styles.svg)}
            />
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(checkAA(e.target.value));
            // .replace(/(AA|BA)([0-9]{1,6})/g, "")
          }}
        />
      </div>
      {results ? (
        <SearchContent>
          {results?.length === 0 && (
            <div className={styles.empty}>
              По вашему запросу ничего не найдено.
            </div>
          )}
          {results?.length
            ? results.map(({ NAME, DETAIL_PAGE_URL, QUANTITY }) => (
                <a
                  className={classNames(
                    styles.link,
                    !parseInt(QUANTITY) && styles.red
                  )}
                  href={DETAIL_PAGE_URL}
                >
                  <strong>{value}</strong>
                  {NAME.slice(value.length)}
                </a>
              ))
            : ""}
        </SearchContent>
      ) : (
        ""
      )}
    </>
  );
}
