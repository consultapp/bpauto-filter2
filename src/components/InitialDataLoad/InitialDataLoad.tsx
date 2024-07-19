import { META_NAMES } from "@/fixtures/consts";
import { getIdByCode } from "@/functions/utils";
import { useGetBrandsQuery } from "@/store/api/brand";
import { useGetGenerationsQuery } from "@/store/api/generation";
import { useGetModelsQuery } from "@/store/api/model";
import { useSetBrand, useSetGeneration, useSetModel } from "@/store/ui/hooks";
import { useEffect, useState } from "react";

const startSectionCodes = META_NAMES.map((name) => {
  return (document.getElementById(name) as HTMLMetaElement)?.name ?? "";
});

console.log("startSectionCodes", startSectionCodes);

export default function InitialDataLoad() {
  const setBrand = useSetBrand();
  const setModel = useSetModel();
  const setGeneration = useSetGeneration();

  const [brandId, setBrandId] = useState<string>();
  const [modelId, setModelId] = useState<string>();

  const { data: brands } = useGetBrandsQuery();
  const { data: models } = useGetModelsQuery(brandId);
  const { data: generations } = useGetGenerationsQuery(modelId);

  useEffect(() => {
    if (brands?.length && startSectionCodes[0]) {
      const id = getIdByCode(brands, startSectionCodes[0]);
      setBrandId(id);
      setBrand(id);
    }
  }, [brands, setBrand]);

  useEffect(() => {
    if (models?.length && startSectionCodes[1] && brandId) {
      const id = getIdByCode(models, startSectionCodes[1]);
      setModelId(id);
      setModel(id);
    }
  }, [brandId, models, setModel]);

  useEffect(() => {
    console.log("first", generations);

    if (generations?.length && startSectionCodes[2] && modelId) {
      const id = getIdByCode(generations, startSectionCodes[2]);
      setGeneration(id);
    }
  }, [modelId, generations, setGeneration]);

  return <></>;
}
