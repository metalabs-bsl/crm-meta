import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { ICreateDocument, IDownloadDocument, IGetDocument } from 'types/requests/admin/document.api';

export const documentApi = createApi({
  reducerPath: 'document',
  baseQuery: getBaseQuery(),
  tagTypes: ['Document'],
  endpoints: ({ query, mutation }) => ({
    getDocs: query<IGetDocument.Response, IGetDocument.Params>({
      query: ({ isOriginal, search }) => `/files/docs?isOriginal=${isOriginal}&search=${search}`,
      providesTags: ['Document']
    }),
    downloadFile: query<IDownloadDocument.Response, IDownloadDocument.Params>({
      queryFn: async (params, api, extraOptions, baseQuery) => {
        const { id, original_name } = params;
        const result = await baseQuery({
          url: `/files/download/${id}`,
          method: 'GET',
          responseHandler: (response) => response.blob()
        });
        const hiddenElement = document.createElement('a');
        const url = window.URL || window.webkitURL;
        const blobFile = url.createObjectURL(result.data as Blob);
        hiddenElement.href = blobFile;
        hiddenElement.download = original_name;
        hiddenElement.click();
        return { data: undefined };
      }
    }),
    deleteDoc: mutation<void, string>({
      query: (docId) => ({
        method: 'DELETE',
        url: `/files/docs/${docId}`
      }),
      invalidatesTags: ['Document']
    }),
    createDoc: mutation<ICreateDocument.Response, ICreateDocument.Params>({
      query: ({ body, contract_number, name }) => ({
        method: 'POST',
        url: `/leads-calculator-contract/docs?contract_number=${contract_number}&name=${name}`,
        body
      }),
      invalidatesTags: ['Document']
    })
  })
});

export const { useLazyGetDocsQuery, useCreateDocMutation, useLazyDownloadFileQuery, useDeleteDocMutation } = documentApi;
