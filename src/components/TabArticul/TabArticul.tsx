import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { API_SEARCH_BY_ARTICUL_URL } from "@/fixtures/consts";
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

type Result = { NAME: string; DETAIL_PAGE_URL: string; QUANTITY: string };

export default function TabArticul() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Result[] | null>(null);

  useEffect(() => {
    if (value.length <= 2) return;

    const timer = window.setTimeout(() => {
      const searchUrl = new URL(API_SEARCH_BY_ARTICUL_URL);
      searchUrl.searchParams.set("s", value);

      fetch(searchUrl, { method: "GET" })
        .then((data) => data.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((e) => {
          console.error("Fetch error.", e);
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <>
      <div className={styles.root}>
        <CustomInput
          className={styles.input}
          placeholder="Артикул"
          autoFocus={true}
          value={value}
          max={20}
          svg={loading ? <LoaderSvg /> : <></>}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const str = checkAA(e.target.value);
            if (str.length <= 2) {
              setResults(null);
              setLoading(false);
            } else {
              setLoading(true);
            }
            setValue(str);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (results?.length && e.key === "Enter")
              location.href = results[0].DETAIL_PAGE_URL;
          }}
        />
      </div>
      {value && (
        <SearchContent>
          {results?.length === 0 && !loading && (
            <div className={styles.empty}>
              По вашему запросу ничего не найдено.
            </div>
          )}
          {Boolean(results?.length) &&
            !loading &&
            results?.map(function (result: Result, i: number) {
              const { NAME, DETAIL_PAGE_URL, QUANTITY } = result;
              return (
                <a
                  key={i}
                  className={classNames(
                    styles.link,
                    !parseInt(QUANTITY) && styles.red
                  )}
                  href={DETAIL_PAGE_URL}
                  dangerouslySetInnerHTML={{
                    __html: `${NAME.replace(
                      value,
                      `<strong>${value}</strong>`
                    )} <strong>(${QUANTITY}шт.)</strong>`,
                  }}
                ></a>
              );
            })}
          {loading && (
            <div className={styles.center}>
              <LoaderSvg size={36} />
            </div>
          )}
          {value.length > 0 && value.length <= 2 && (
            <div className={styles.center}>Введите больше двух символов.</div>
          )}
        </SearchContent>
      )}
    </>
  );
}
