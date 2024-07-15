import styles from "./style.module.scss";

export default function TabArticul() {
  return (
    <div className={styles.root}>
      <input
        id="searchByNumberId"
        type="text"
        name="q"
        value=""
        className="form-control search_input"
        placeholder="Артикул"
      />
      <div className="search_loader-anime"></div>

      <div className="title-search-result-container">
        <div className="title-search-result" id="searchByNumberId_result"></div>
      </div>
      <div className="title-search-fader"></div>
      <div className="empty-result" id="searchByNumberId_error">
        По вашему запросу ничего не найдено.
      </div>
    </div>
  );
}
