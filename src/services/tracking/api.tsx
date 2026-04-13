import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logger } from '@/utils/logger';

/**
 * Custom base query for tracking API with different base URL
 * This uses https://api.onward.com/tms instead of the main API
 */
const trackingBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.onward.co.id/tms',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const trackingApi = createApi({
  reducerPath: 'trackingApi',
  baseQuery: async (args, api, extraOptions) => {
    // Log request
    const url = typeof args === 'string' ? args : args.url;
    const method = typeof args === 'object' ? args.method : undefined;
    logger.apiRequest(url, method);

    const result = await trackingBaseQuery(args, api, extraOptions);

    // Log response
    logger.apiResponse(result);

    return result;
  },
  endpoints: (builder) => ({
    /**
     * GET /public/tracking/:orderNumber
     * Get tracking information by order number
     */
    getTrackingByOrderNumber: builder.query({
      query: (orderNumber) => ({
        url: `/public/tracking/${orderNumber}`,
        method: 'GET',
      }),
    }),
  }),
});

// Export RTK Query hooks
export const { useLazyGetTrackingByOrderNumberQuery } = trackingApi;
