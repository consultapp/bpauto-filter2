import HeaderFilter from "./components/HeaderFilter/HeaderFilter";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

function App() {
  return (
    <Provider store={store}>
      <HeaderFilter />
    </Provider>
  );
}

export default App;
