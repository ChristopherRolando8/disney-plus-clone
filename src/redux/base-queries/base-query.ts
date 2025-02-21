import { TMDB_API_KEY, TMDB_API_V3 } from "@/constants/api";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// This is just utilities to generate redux base query for TMDB API with its api_key and endpoint prefix.
// Reusable throughout all services
export const generateBaseQuery = ({ prefix }: { prefix: string }) =>
  fetchBaseQuery({
    baseUrl: `${TMDB_API_V3}/${prefix}`,
    paramsSerializer: (params) => {
      const urlParams = new URLSearchParams(params);
      urlParams.append("api_key", TMDB_API_KEY);
      return urlParams.toString();
    },
  });
