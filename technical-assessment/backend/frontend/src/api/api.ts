import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Tag } from './tag-types';
import { resetUser } from '@/domains/auth/slice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
  prepareHeaders: (headers) => {
    const csrfToken = Cookies.get('csrfToken');
    if (csrfToken) {
      headers.set('x-csrf-token', csrfToken);
    }

    return headers;
  },
  credentials: 'include'
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  const isCsrfMismatch =
    result.error?.status === 403 &&
    typeof result.error.data === 'object' &&
    result.error.data !== null &&
    'error' in result.error.data &&
    result.error.data.error === 'Forbidden. CSRF token mismatch';

  if (result.error?.status === 401 || isCsrfMismatch) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetUser());
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(Tag),
  endpoints: () => ({})
});
