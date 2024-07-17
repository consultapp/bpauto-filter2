import CustomInput from "../ui/CustomInput/CustomInput";
import { ChevronRight } from "lucide-react";

export default function Generation() {
  // const { data, error, isLoading } = useGetBrandsQuery();
  // console.log("first", data, error, isLoading);

  return (
    <>
      <CustomInput placeholder="Поколение" svg={<ChevronRight />} />
    </>
  );
}
