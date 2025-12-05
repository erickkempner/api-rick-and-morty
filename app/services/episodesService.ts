import { useApi } from '@/composables/useApi'
import type { ApiResponse} from '@/types/rickandmorty'
import type { Episode} from '@/types/index'

export const episodesService = {
  // Buscar um personagem
  getOne(id: number) {
    return useApi<Episode>(`/episode/${id}`)
  },

  // Buscar vários: /character/[1,2,3]
  getMany(ids: number[]) {
    const idString = ids.join(',')
    return useApi<Episode[]>(`/episode/[${idString}]`)
  },

  // Buscar paginado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list(params?: any) {
    return useApi<ApiResponse<Episode>>('/episode', { params })
  },

  search(params: string) {
    return useApi<ApiResponse<Episode>>(`/episode?name=${params}`)
  }
}
