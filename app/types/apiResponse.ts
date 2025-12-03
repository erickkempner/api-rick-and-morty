import type {Character, Episode, Location} from '~/types/index'

type TypeApiResponse = Character[] | Episode[] | Location[]
export interface ApiResponse {
    info: {
        count: number
        pages: number
        next: string
        prev: string
    }
    results: TypeApiResponse[]
}