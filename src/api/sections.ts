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

const brandsCache = { data: null as CarApiItem[] | null, promise: null as Promise<CarApiItem[]> | null };
const modelsCache = new Map<string, CarApiItem[]>();
const modelsPending = new Map<string, Promise<CarApiItem[]>>();
const generationsCache = new Map<string, CarApiItem[]>();
const generationsPending = new Map<string, Promise<CarApiItem[]>>();

export function loadBrands(): Promise<CarApiItem[]> {
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

export function loadModels(brandId: string): Promise<CarApiItem[]> {
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

export function loadGenerations(modelId: string): Promise<CarApiItem[]> {
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

export type SectionsQueryResult = {
  data: CarApiItem[];
  isLoading: boolean;
  error: unknown;
};

export function useBrands(): SectionsQueryResult {
  const [data, setData] = useState<CarApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    loadBrands()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}

export function useModels(brandId: string): SectionsQueryResult {
  const [data, setData] = useState<CarApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(brandId));
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!brandId) {
      setData([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    loadModels(brandId)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [brandId]);

  return { data, isLoading, error };
}

export function useGenerations(modelId: string): SectionsQueryResult {
  const [data, setData] = useState<CarApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(modelId));
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!modelId) {
      setData([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    loadGenerations(modelId)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [modelId]);

  return { data, isLoading, error };
}
