import {createApi} from '@reduxjs/toolkit/query/react';
import {customFetchBase} from './baseQuery';

export const main = createApi({
  reducerPath: 'main',
  baseQuery: customFetchBase,
  refetchOnReconnect: true,
  tagTypes: ['Main'],
  endpoints: build => ({
    getSunsetSunrise: build.query({
      query: params => ({
        url: `json?lat=${params?.lat}&lng=${params?.lng}&time_format=24`,
        method: 'GET',
      }),
    }),
    getPrismKnee: build.query({
      query: () => ({
        url: 'prism-knee',
        method: 'GET',
      }),
    }),
    getUserHome: build.query({
      query: () => ({
        url: 'user/home',
        method: 'GET',
      }),
    }),
    getSubsciptionVideo: build.query({
      query: () => ({
        url: 'video/subscription',
        method: 'GET',
      }),
    }),
    getUserVideoByVideoPhaseId: build.query({
      query: params => {
        return {
          url: `user/video/by/${params?.videoPhaseId}`,
          method: 'GET',
        };
      },
    }),
    getUserVideoByPhaseId: build.query({
      query: params => {
        return {
          url: `user/video/${params?.phaseId}`,
          method: 'GET',
        };
      },
    }),
    rateVideo: build.mutation({
      query: body => {
        return {
          url: 'video-rating',
          method: 'POST',
          body,
        };
      },
    }),
    ratePhase: build.mutation({
      query: body => {
        return {
          url: 'user/phase/rate',
          method: 'POST',
          body,
        };
      },
    }),
    getResumeVideo: build.query({
      query: params => {
        return {
          url: 'user/phase/resume',
          method: 'GET',
        };
      },
    }),
    toggleFavorite: build.mutation({
      query: body => {
        return {
          url: `favourite/${body.videoId}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    getAllFavorites: build.query({
      query: params => {
        let endpoint = `favourite/all?offset=${params?.offset}&limit=${params?.limit}`;
        if (params?.title) {
          endpoint += `&title=${params.title}`;
        }

        return {
          url: endpoint,
          method: 'GET',
        };
      },
    }),
    getAllVideos: build.query({
      query: params => {
        let endpoint = `user/videos/all?offset=${params?.offset}&limit=${params?.limit}`;
        if (params?.title) {
          endpoint += `&title=${params.title}`;
        }
        return {
          url: endpoint,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetPrismKneeQuery,
  useGetUserHomeQuery,
  useGetSubsciptionVideoQuery,
  useLazyGetUserVideoByVideoPhaseIdQuery,
  useLazyGetUserVideoByPhaseIdQuery,
  useRateVideoMutation,
  useRatePhaseMutation,
  useLazyGetResumeVideoQuery,
  useToggleFavoriteMutation,
  useLazyGetAllFavoritesQuery,
  useLazyGetAllVideosQuery,
  useGetSunsetSunriseQuery,
} = main;
