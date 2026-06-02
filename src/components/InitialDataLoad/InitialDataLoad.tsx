import { META_NAMES } from "@/fixtures/consts";
import { getIdByCode } from "@/functions/utils";
import { useGetBrandsQuery } from "@/store/api/brand";
import { useGetGenerationsQuery } from "@/store/api/generation";
import { useGetModelsQuery } from "@/store/api/model";
import {
  uiBrandIdSelector,
  uiGenerationIdSelector,
  uiModelIdSelector,
} from "@/store/ui/selectors";
import { useSetBrand, useSetGeneration, useSetModel } from "@/store/ui/hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const startSectionCodes = META_NAMES.map((name) => {
  return (document.getElementById(name) as HTMLMetaElement)?.content ?? "";
});

export default function InitialDataLoad() {
  const setBrand = useSetBrand();
  const setModel = useSetModel();
  const setGeneration = useSetGeneration();

  const brandId = useSelector(uiBrandIdSelector);
  const modelId = useSelector(uiModelIdSelector);
  const generationId = useSelector(uiGenerationIdSelector);

  const { data: brands } = useGetBrandsQuery();
  const { data: models } = useGetModelsQuery(brandId, { skip: !brandId });
  const { data: generations } = useGetGenerationsQuery(modelId, {
    skip: !modelId,
  });

  useEffect(() => {
    if (!brands?.length || !startSectionCodes[0] || brandId) return;
    const id = getIdByCode(brands, startSectionCodes[0]);
    if (id) setBrand(id);
  }, [brands, brandId, setBrand]);

  useEffect(() => {
    if (!models?.length || !startSectionCodes[1] || !brandId || modelId) return;
    const id = getIdByCode(models, startSectionCodes[1]);
    if (id) setModel(id);
  }, [models, brandId, modelId, setModel]);

  useEffect(() => {
    if (
      !generations?.length ||
      !startSectionCodes[2] ||
      !modelId ||
      generationId
    )
      return;
    const id = getIdByCode(generations, startSectionCodes[2]);
    if (id) setGeneration(id);
  }, [generations, modelId, generationId, setGeneration]);

  return null;
}
