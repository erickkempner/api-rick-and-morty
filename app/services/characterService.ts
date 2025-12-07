import { useApi } from '@/composables/useApi'
import type { Character, ApiResponse } from '@/types/rickandmorty'

export const characterService = {
  // Buscar um personagem
  getOne(id: number) {
    return useApi<Character>(`/character/${id}`)
  },

  // Buscar vários: /character/[1,2,3]
  getMany(ids: number[]) {
    const idString = ids.join(',')
    return useApi<Character[]>(`/character/${idString}`)
  },

  // Buscar paginado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list(params?: any) {
    return useApi<ApiResponse<Character>>('/character', { params })
  },

  search(params: string) {
    return useApi<ApiResponse<Character>>(`/character?name=${params}`)
  }
}
