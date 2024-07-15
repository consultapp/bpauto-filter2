apiSearchStringUrl = "https://bpauto.ru/api/search.php?s=";

window.addEventListener("load", () => {
  const searchByNumber = new SearchByNumber("searchByNumberId");
  const tabs = document.querySelectorAll(".search ul li");

  tabs.forEach((tab) => {
    tab.addEventListener("click", ({ target }) => {
      tabs.forEach((tb) => {
        tb.classList.remove("active");
      });
      tab.classList.add("active");
    });
  });
});

class SearchByNumber {
  debounceTimeont = null;
  constructor(inputId) {
    this.apiUrl = apiSearchStringUrl;
    this.input = document.getElementById(inputId);
    this.resultBlock = document.getElementById(inputId + "_result");
    this.errorBlock = document.getElementById(inputId + "_error");
    this.loading = document.querySelector(".search_loader-anime");
    this.init();
  }

  init() {
    if (this.input) {
      this.input.addEventListener("input", ({ target }) => {
        this.checkAA(target);
        this.debounce(this.search.bind(this), target.value);
      });
    } else console.log("Error of inpt binding. (SearchByNumber Class)");
  }
  async search(s) {
    this.resultBlock.innerHTML = "";
    this.resultBlock.removeAttribute("data-show");
    this.errorBlock.removeAttribute("data-show");

    if (s.length > 2) {
      this.loading.setAttribute("data-loading", "");
      fetch(this.apiUrl + s)
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
  showResults(json, search) {
    this.resultBlock.innerHTML = "";

    if (json && json?.length > 0 && json?.forEach) {
      const anchors = [];
      json.forEach((item) => {
        const a = document.createElement("a");
        if (item.QUANTITY === "0" && item.QUANTITY_RESERVED === "0")
          a.setAttribute("data-soldout", "");
        if (item.QUANTITY === "0" && item.QUANTITY_RESERVED * 1 > 0)
          a.setAttribute("data-reserved", "");
        a.href = item.DETAIL_PAGE_URL;
        a.innerHTML = item.NAME.replace(search, `<strong>${search}</strong>`);
        anchors.push(a);
      });
      this.resultBlock.append(...anchors);
      this.errorBlock.removeAttribute("data-show");
      this.resultBlock.setAttribute("data-show", "");
    } else {
      this.resultBlock.removeAttribute("data-show");
      this.errorBlock.setAttribute("data-show", "");
    }
  }
  debounce(cb, value) {
    if (this.debounceTimeont) {
      clearTimeout(this.debounceTimeont);
    }
    this.debounceTimeont = setTimeout(() => {
      cb(value);
    }, 400);
  }
  checkAA(target) {
    const arr = ["А", "а", "Ф", "ф", "a"];
    arr.forEach((item) => {
      if (target.value.includes(item)) {
        target.value = target.value.replaceAll(item, "A");
      }
    });
  }
}
