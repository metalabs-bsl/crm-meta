import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'common/helpers';
import { ICreateNote, IGetCalendar } from 'types/requests/admin/calendar.api';

export const calendarApi = createApi({
  reducerPath: 'calendar',
  baseQuery: getBaseQuery(),
  tagTypes: ['Calendar'],
  endpoints: ({ query, mutation }) => ({
    getCalendarData: query<IGetCalendar.Response, IGetCalendar.Params>({
      query: () => `/callendar`,
      providesTags: ['Calendar'],
      keepUnusedDataFor: 0
    }),
    createNote: mutation<ICreateNote.Response, ICreateNote.Params>({
      query: (body) => ({
        method: 'POST',
        url: `/callendar/create`,
        body
      }),
      invalidatesTags: ['Calendar']
    }),
    deleteNote: mutation<void, string>({
      query: (noteId) => ({
        method: 'DELETE',
        url: `/callendar/delete/${noteId}`
      }),
      invalidatesTags: ['Calendar']
    }),
    updateNote: mutation<ICreateNote.Response, ICreateNote.Params>({
      query: (body) => ({
        method: 'PATCH',
        url: `/callendar/update`,
        body
      }),
      invalidatesTags: ['Calendar']
    })
  })
});

export const { useGetCalendarDataQuery, useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } = calendarApi;
