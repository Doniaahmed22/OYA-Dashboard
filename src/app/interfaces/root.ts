import { Carts } from "./carts"

export interface Root {
    carts: Carts[]
    total: number
    skip: number
    limit: number
}

