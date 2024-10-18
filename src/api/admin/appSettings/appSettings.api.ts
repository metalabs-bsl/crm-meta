import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { ISettingsCalculatorBrandData } from 'types/entities';
import {
  ICreateSettingsCalculatorBrand,
  IDeleteSettingsCalculatorBrand,
  IGetAppSettings,
  IGetSettingsCalculatorBrand,
  IUpdateAppSettings,
  IUpdateSettingsCalculatorBrand
} from 'types/requests/admin/appSettings.api';

export const appSettingsApi = createApi({
  reducerPath: 'appSettingsApi',
  baseQuery: getBaseQuery(),
  tagTypes: ['mainAccess', 'calculatorBrand', 'calculatorProduct'],
  endpoints: ({ query, mutation }) => ({
    getAppSettings: query<IGetAppSettings.Response, IGetAppSettings.Params>({
      query: () => '/app-settings',
      providesTags: ['mainAccess']
    }),
    updateAppSettings: mutation<IUpdateAppSettings.Response, IUpdateAppSettings.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: `/app-settings`,
        body
      }),
      invalidatesTags: ['mainAccess']
    }),
    getSettingsCalculatorBrand: query<IGetSettingsCalculatorBrand.Response, IGetSettingsCalculatorBrand.Params>({
      query: () => '/leads-calculator-tour-data/brand',
      providesTags: ['calculatorBrand'],
      transformResponse: (response: ISettingsCalculatorBrandData[]) => response.map((item) => ({ ...item, isEditing: false }))
    }),
    createSettingsCalculatorBrand: mutation<ICreateSettingsCalculatorBrand.Response, ICreateSettingsCalculatorBrand.Params>({
      query: (name) => ({
        method: 'POST',
        url: `leads-calculator-tour-data/brand/${name}`
      }),
      invalidatesTags: ['calculatorBrand']
    }),
    updateSettingsCalculatorBrand: mutation<IUpdateSettingsCalculatorBrand.Response, IUpdateSettingsCalculatorBrand.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: '/leads-calculator-tour-data/brand',
        body
      }),
      invalidatesTags: ['calculatorBrand']
    }),
    deleteSettingsCalculatorBrand: mutation<IDeleteSettingsCalculatorBrand.Response, IDeleteSettingsCalculatorBrand.Params>({
      query: (id) => ({
        method: 'DELETE',
        url: `/leads-calculator-tour-data/brand/${id}`
      }),
      invalidatesTags: ['calculatorBrand']
    }),
    getSettingsCalculatorProduct: query<IGetSettingsCalculatorBrand.Response, IGetSettingsCalculatorBrand.Params>({
      query: () => '/leads-calculator-tour-data/product',
      providesTags: ['calculatorProduct'],
      transformResponse: (response: ISettingsCalculatorBrandData[]) => response.map((item) => ({ ...item, isEditing: false }))
    }),
    createSettingsCalculatorProduct: mutation<ICreateSettingsCalculatorBrand.Response, ICreateSettingsCalculatorBrand.Params>({
      query: (name) => ({
        method: 'POST',
        url: `leads-calculator-tour-data/product/${name}`
      }),
      invalidatesTags: ['calculatorProduct']
    }),
    updateSettingsCalculatorProduct: mutation<IUpdateSettingsCalculatorBrand.Response, IUpdateSettingsCalculatorBrand.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: '/leads-calculator-tour-data/product',
        body
      }),
      invalidatesTags: ['calculatorProduct']
    }),
    deleteSettingsCalculatorProduct: mutation<IDeleteSettingsCalculatorBrand.Response, IDeleteSettingsCalculatorBrand.Params>({
      query: (id) => ({
        method: 'DELETE',
        url: `/leads-calculator-tour-data/product/${id}`
      }),
      invalidatesTags: ['calculatorProduct']
    })
  })
});

export const {
  useGetAppSettingsQuery,
  useUpdateAppSettingsMutation,
  useGetSettingsCalculatorBrandQuery,
  useCreateSettingsCalculatorBrandMutation,
  useUpdateSettingsCalculatorBrandMutation,
  useDeleteSettingsCalculatorBrandMutation,
  useGetSettingsCalculatorProductQuery,
  useCreateSettingsCalculatorProductMutation,
  useUpdateSettingsCalculatorProductMutation,
  useDeleteSettingsCalculatorProductMutation
} = appSettingsApi;
