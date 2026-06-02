import { useBrands, useGenerations, useModels } from "@/api/sections";
import { META_NAMES } from "@/fixtures/consts";
import { getIdByCode } from "@/functions/utils";
import { useFilter } from "@/context/filterHooks";
import {
  useSetBrand,
  useSetGeneration,
  useSetModel,
} from "@/context/filterHooks";
import { useEffect } from "react";

const startSectionCodes = META_NAMES.map((name) => {
  return (document.getElementById(name) as HTMLMetaElement)?.content ?? "";
});

export default function InitialDataLoad() {
  const setBrand = useSetBrand();
  const setModel = useSetModel();
  const setGeneration = useSetGeneration();

  const { selectedBrandId, selectedModelId, selectedGenerationId } =
    useFilter();

  const { data: brands } = useBrands();
  const { data: models } = useModels(selectedBrandId);
  const { data: generations } = useGenerations(selectedModelId);

  useEffect(() => {
    if (!brands.length || !startSectionCodes[0] || selectedBrandId) return;
    const id = getIdByCode(brands, startSectionCodes[0]);
    if (id) setBrand(id);
  }, [brands, selectedBrandId, setBrand]);

  useEffect(() => {
    if (
      !models.length ||
      !startSectionCodes[1] ||
      !selectedBrandId ||
      selectedModelId
    )
      return;
    const id = getIdByCode(models, startSectionCodes[1]);
    if (id) setModel(id);
  }, [models, selectedBrandId, selectedModelId, setModel]);

  useEffect(() => {
    if (
      !generations.length ||
      !startSectionCodes[2] ||
      !selectedModelId ||
      selectedGenerationId
    )
      return;
    const id = getIdByCode(generations, startSectionCodes[2]);
    if (id) setGeneration(id);
  }, [generations, selectedModelId, selectedGenerationId, setGeneration]);

  return null;
}
