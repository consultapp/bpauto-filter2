import CustomInput from "../ui/CustomInput/CustomInput";
import { ChevronRight } from "lucide-react";
import { useGetModelsQuery } from "@/store/api/model";

export default function Model() {
  const { data, error, isLoading } = useGetModelsQuery();
  console.log("models", data, error, isLoading);

  return (
    <>
      <CustomInput placeholder="Модель" svg={<ChevronRight />} />
    </>
  );
}
