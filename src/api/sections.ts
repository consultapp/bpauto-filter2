/* eslint-disable react-hooks/set-state-in-effect -- async data hooks */
import { API_URL } from "@/fixtures/consts";
import { useEffect, useState } from "react";

function toList(data: unknown): CarApiItem[] {
  return Array.isArray(data) ? data : [];
}

async function fetchSections(path: string): Promise<CarApiItem[]> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Sections request failed: ${res.status}`);
  }
  return toList(await res.json());
}

const brandsCache = {
  data: null as CarApiItem[] | null,
  promise: null as Promise<CarApiItem[]> | null,
};
const modelsCache = new Map<string, CarApiItem[]>();
const modelsPending = new Map<string, Promise<CarApiItem[]>>();
const generationsCache = new Map<string, CarApiItem[]>();
const generationsPending = new Map<string, Promise<CarApiItem[]>>();

function loadBrands(): Promise<CarApiItem[]> {
  if (brandsCache.data) return Promise.resolve(brandsCache.data);
  if (!brandsCache.promise) {
    brandsCache.promise = fetchSections("/getSections.php?sec_type=1").then(
      (data) => {
        brandsCache.data = data;
        return data;
      }
    );
  }
  return brandsCache.promise;
}

function loadModels(brandId: string): Promise<CarApiItem[]> {
  const cached = modelsCache.get(brandId);
  if (cached) return Promise.resolve(cached);

  let promise = modelsPending.get(brandId);
  if (!promise) {
    const sec = brandId || String(Number.MAX_SAFE_INTEGER);
    promise = fetchSections(`/getSections.php?sec_type=2&sec=${sec}`).then(
      (data) => {
        modelsCache.set(brandId, data);
        modelsPending.delete(brandId);
        return data;
      }
    );
    modelsPending.set(brandId, promise);
  }
  return promise;
}

function loadGenerations(modelId: string): Promise<CarApiItem[]> {
  const cached = generationsCache.get(modelId);
  if (cached) return Promise.resolve(cached);

  let promise = generationsPending.get(modelId);
  if (!promise) {
    const sec = modelId || String(Number.MAX_SAFE_INTEGER);
    promise = fetchSections(`/getSections.php?sec_type=3&sec=${sec}`).then(
      (data) => {
        generationsCache.set(modelId, data);
        generationsPending.delete(modelId);
        return data;
      }
    );
    generationsPending.set(modelId, promise);
  }
  return promise;
}

type SectionsQueryResult = {
  data: CarApiItem[];
  isLoading: boolean;
  error: unknown;
};

function useSectionsById(
  id: string,
  load: (id: string) => Promise<CarApiItem[]>,
  getCached: (id: string) => CarApiItem[] | undefined
): SectionsQueryResult {
  const cached = id ? getCached(id) : undefined;
  const [data, setData] = useState<CarApiItem[]>(cached ?? []);
  const [loadedId, setLoadedId] = useState<string | null>(cached ? id : null);
  const [error, setError] = useState<unknown>(null);

  const isLoading = Boolean(id) && loadedId !== id;

  useEffect(() => {
    if (!id) {
      setData([]);
      setLoadedId(null);
      setError(null);
      return;
    }

    const cachedNow = getCached(id);
    if (cachedNow) {
      setData(cachedNow);
      setLoadedId(id);
      setError(null);
      return;
    }

    let cancelled = false;

    load(id)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoadedId(id);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoadedId(id);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load/getCached are module-level
  }, [id]);

  const displayData = loadedId === id ? data : [];

  return { data: displayData, isLoading, error };
}

function getBrandsCached() {
  return brandsCache.data ?? undefined;
}

function getModelsCached(id: string) {
  return modelsCache.get(id);
}

function getGenerationsCached(id: string) {
  return generationsCache.get(id);
}

export function useBrands(): SectionsQueryResult {
  return useSectionsById("brands", loadBrands, getBrandsCached);
}

export function useModels(brandId: string): SectionsQueryResult {
  return useSectionsById(brandId, loadModels, getModelsCached);
}

export function useGenerations(modelId: string): SectionsQueryResult {
  return useSectionsById(modelId, loadGenerations, getGenerationsCached);
}
