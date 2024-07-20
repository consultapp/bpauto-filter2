import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { API_SEARCH_BY_ARTICUL_URL, SITE_URL } from "@/fixtures/consts";
import SearchContent from "../DroppingWindow/DroppingWindow";
import CustomInput from "../ui/CustomInput/CustomInput";
import classNames from "classnames";
import LoaderSvg from "../ui/LoaderSvg/LoaderSvg";

function checkAA(str: string) {
  const arr = ["А", "а", "Ф", "ф", "a"];
  arr.forEach((item) => {
    if (str.includes(item)) {
      str = str.replace(item, "A");
    }
  });

  return str;
}

function debounced(cb: (value: string) => void) {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<
    { NAME: string; DETAIL_PAGE_URL: string; QUANTITY: string }[] | null
  >(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSearch = useCallback(
    debounced((s: string) => {
      const searchUrl = new URL(API_SEARCH_BY_ARTICUL_URL);
      searchUrl.searchParams.set("s", s);

      if (s.length > 2) {
        setLoading(true);
        fetch(searchUrl, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => {
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
          className={styles.input}
          placeholder="Артикул"
          autoFocus={true}
          value={value}
          max={8}
          svg={loading ? <LoaderSvg /> : <></>}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const str = checkAA(e.target.value);
            setResults(null);
            setValue(str);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (results?.length && e.key === "Enter")
              location.replace(SITE_URL + results[0].DETAIL_PAGE_URL);
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
            ? results.map(({ NAME, DETAIL_PAGE_URL, QUANTITY }, i) => (
                <a
                  key={i}
                  className={classNames(
                    styles.link,
                    !parseInt(QUANTITY) && styles.red
                  )}
                  href={DETAIL_PAGE_URL}
                >
                  <strong>{value}</strong>
                  {NAME.slice(value.length)}
                  <strong>({QUANTITY}шт.)</strong>
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
