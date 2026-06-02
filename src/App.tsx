import HeaderFilter from "./components/HeaderFilter/HeaderFilter";
import InitialDataLoad from "./components/InitialDataLoad/InitialDataLoad.tsx";
import { FilterProvider } from "@/context/FilterProvider";

function App() {
  return (
    <FilterProvider>
      <InitialDataLoad />
      <HeaderFilter />
    </FilterProvider>
  );
}

export default App;
