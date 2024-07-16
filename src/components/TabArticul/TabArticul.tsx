import { useRef, useState } from "react";
import styles from "./style.module.scss";
import { API_URL, SEARCH_BY_ARTICUL } from "@/fixtures/consts";
import SearchContent from "../SearchContent/SearchContent";
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
  return str;
}

async function fetchSearch(s) {
  const searchUrl = new URL("API_URL + SEARCH_BY_ARTICUL");
  searchUrl.searchParams.set("s", s);

  if (s.length > 2) {
    fetch(searchUrl)
      .then((data) => data.json())
      .then((json) => {
        this.showResults(json, s);
        this.loading.removeAttribute("data-loading");
      })
      .catch((e) => {
        console.error("Fetch error.", e);
        this.loading.removeAttribute("data-loading");
      });
  }
}

// function debounced(cb: () => void) {
//   let timer: number | null = null;
//   return (value) => {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       cb(value);
//     }, 400);
//   };
// }

export default function TabArticul() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState();

  const input = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={styles.root}>
        <CustomInput
          ref={input}
          placeholder="Артикул"
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
      <SearchContent>
        {error && (
          <div className="empty-result">
            По вашему запросу ничего не найдено.
          </div>
        )}
      </SearchContent>
    </>
  );
}
