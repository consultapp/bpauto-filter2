import { API_URL } from "@/fixtures/consts";
import { CarApiItem } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modelApi: any = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "model",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getModels: builder.query<CarApiItem, string>({
      // The URL for the request is '/fakeApi/posts'
      query: (brandId) =>
        `/getSections.php?sec_type=2&sec=${brandId || Number.MAX_SAFE_INTEGER}`,
    }),
  }),
});

export const { useGetModelsQuery } = modelApi;

// Export the auto-generated hook for the `getPosts` query endpoint
//  const { useGetmodelsQuery };
