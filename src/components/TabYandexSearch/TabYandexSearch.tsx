import classNames from "classnames";
import styles from "./style.module.scss";

export default function TabYandexSearch() {
  return (
    <div
      className={classNames(
        "ya-site-form",
        "ya-site-form_inited_no",
        styles.ya_site_form,
        styles.ya_site_form_inited_no,
        styles.root
      )}
      data-bem={`&quot;action&quot;:&quot;https://bpauto.ru/yandex-search-goods/&quot;,&quot;arrow&quot;:false,&quot;bg&quot;:&quot;transparent&quot;,&quot;fontsize&quot;:&quot;15&quot;,&quot;fg&quot;:&quot;#000000&quot;,&quot;language&quot;:&quot;ru&quot;,&quot;logo&quot;:&quot;rb&quot;,&quot;publicname&quot;:&quot;&quot;,&quot;suggest&quot;:true,&quot;target&quot;:&quot;_self&quot;,&quot;tld&quot;:&quot;ru&quot;,&quot;type&quot;:2,&quot;usebigdictionary&quot;:false,&quot;searchid&quot;:6977498,&quot;input_fg&quot;:&quot;#000000&quot;,&quot;input_bg&quot;:&quot;#FFFFFF&quot;,&quot;input_fontStyle&quot;:&quot;normal&quot;,&quot;input_fontWeight&quot;:&quot;normal&quot;,&quot;input_placeholder&quot;:&quot;&quot;,&quot;input_placeholderColor&quot;:&quot;#000000&quot;,&quot;input_borderColor&quot;:&quot;#cbcbcb&quot;,&quot;is_catalog&quot;:true`}
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
