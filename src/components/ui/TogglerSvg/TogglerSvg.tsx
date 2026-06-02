import { useFilter } from "@/context/filterHooks";
import { ChevronDown, ChevronRight } from "lucide-react";

type Props = { tabName: string };

export default function TogglerSvg({ tabName }: Props) {
  const { carTabState } = useFilter();
  const opened = carTabState === tabName;
  return opened ? <ChevronDown /> : <ChevronRight />;
}
