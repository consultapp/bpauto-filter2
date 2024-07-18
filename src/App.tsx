import HeaderFilter from "./components/HeaderFilter/HeaderFilter";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import InitialDataLoad from "./components/InitialDataLoad/InitialDataLoad.tsx";

function App() {
  return (
    <Provider store={store}>
      <InitialDataLoad />
      <HeaderFilter />
    </Provider>
  );
}

export default App;
