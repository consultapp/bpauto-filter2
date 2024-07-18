import { uiCarTabStateSelector } from "@/store/ui/selectors";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

type Props = { tabName: string };

export default function TogglerSvg({ tabName }: Props) {
  const opened = useSelector(uiCarTabStateSelector) === tabName;
  return opened ? <ChevronDown /> : <ChevronRight />;
}
