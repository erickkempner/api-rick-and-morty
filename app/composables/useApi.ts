// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApi = <T = any>(url: string, options: any = {}) => {

  return useFetch<T>(url, {
    baseURL: 'https://rickandmortyapi.com/api',
    ...options
  })
}
