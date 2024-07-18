import { ChevronDown, ChevronRight } from "lucide-react";

type Props = { open: boolean };

export default function TogglerSvg({ open }: Props) {
  return open ? <ChevronDown /> : <ChevronRight />;
}
