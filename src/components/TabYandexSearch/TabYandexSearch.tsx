export default function TabYandexSearch() {
  return (
    <div
      className="ya-site-form ya-site-form_inited_no"
      data-bem={`&quot;action&quot;:&quot;https://bpauto.ru/yandex-search/&quot;,&quot;arrow&quot;:false,&quot;bg&quot;:&quot;#339999&quot;,&quot;fontsize&quot;:14,&quot;fg&quot;:&quot;#000000&quot;,&quot;language&quot;:&quot;ru&quot;,&quot;logo&quot;:&quot;rb&quot;,&quot;publicname&quot;:&quot;Поиск по bpauto.ru&quot;,&quot;suggest&quot;:true,&quot;target&quot;:&quot;_self&quot;,&quot;tld&quot;:&quot;ru&quot;,&quot;type&quot;:2,&quot;usebigdictionary&quot;:true,&quot;searchid&quot;:6863453,&quot;input_fg&quot;:&quot;#000000&quot;,&quot;input_bg&quot;:&quot;#ffffff&quot;,&quot;input_fontStyle&quot;:&quot;normal&quot;,&quot;input_fontWeight&quot;:&quot;normal&quot;,&quot;input_placeholder&quot;:&quot;введите запрос&quot;,&quot;input_placeholderColor&quot;:&quot;#999999&quot;,&quot;input_borderColor&quot;:&quot;#dee9eb&quot;`}
    >
      <form
        action="https://yandex.ru/search/site/"
        method="get"
        target="_self"
        accept-charset="utf-8"
      >
        <input type="hidden" name="searchid" value="6863453" />
        <input type="hidden" name="l10n" value="ru" />
        <input type="hidden" name="reqenc" value="" />
        <input type="search" style={{ height: "38px" }} name="text" value="" />
        <input type="submit" value="Найти" style={{ height: "38px" }} />
      </form>
    </div>
  );
}
