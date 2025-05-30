import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';

interface IGenerateDocumentResponse {
  document: Blob;
  fileName: string;
  contentType: string;
}

export const calculatorApi = createApi({
  reducerPath: 'calculator',
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    generateDocument: builder.mutation<IGenerateDocumentResponse, string>({
      query: (id) => ({
        url: `leads/generate-document/${id}`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          window.location.assign(url);
        }
      })
    })
  })
});

export const { useGenerateDocumentMutation } = calculatorApi;
