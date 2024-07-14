import classNames from "classnames";
import styles from "./style.module.scss";

export default function TabYandexSearch() {
  return (
    <div
      className={classNames(
        styles.ya_site_form,
        styles.ya_site_form_inited_no,
        styles.root
      )}
      data-bem='{"action":"https://bpauto.ru/yandex-search-goods/","arrow":false,"bg":"transparent","fontsize":"15","fg":"#000000","language":"ru","logo":"rb","publicname":"","suggest":true,"target":"_self","tld":"ru","type":2,"usebigdictionary":false,"searchid":6977498,"input_fg":"#000000","input_bg":"#FFFFFF","input_fontStyle":"normal","input_fontWeight":"normal","input_placeholder":"","input_placeholderColor":"#000000","input_borderColor":"#cbcbcb","is_catalog":true}'
    >
      <form
        action="//site.yandex.ru/search/site/catalog/"
        method="get"
        target="_self"
        acceptCharset="utf-8"
      >
        <input type="hidden" name="searchid" value="6977498" />
        <input type="hidden" name="l10n" value="ru" />
        <input type="hidden" name="reqenc" value="" />
        <input
          type="search"
          placeholder="введите запрос"
          name="text"
          className={styles.input_s}
        />
        <input type="submit" value="Найти" className={styles.input_b} />
      </form>
    </div>
  );
}
