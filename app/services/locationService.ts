import { useApi } from '@/composables/useApi'
import type { ApiResponse} from '@/types/rickandmorty'
import type { Location} from '@/types/index'

export const locationService = {
  // Buscar um personagem
  getOne(id: number) {
    return useApi<Location>(`/location/${id}`)
  },

  // Buscar vários: /character/[1,2,3]
  getMany(ids: number[]) {
    const idString = ids.join(',')
    return useApi<Location[]>(`/location/${idString}`)
  },

  // Buscar paginado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list(params?: any) {
    return useApi<ApiResponse<Location>>('/location', { params })
  },

  search(params: string) {
    return useApi<ApiResponse<Location>>(`/location?name=${params}`)
  }
}
