import type { Event } from "../types"

export const hospitalEvents = (): Event[] => {
  return [
    {
     "message": "A busca deu ruim! Alguns sobrevivents...",
     "supply": -15,
     "ammunition": -10,
     "units": -1
    },
    {
     "message": "A busca foi dificil!",
     "supply": 10,
     "ammunition": 5,
    },
    {
     "message": "Maravilha!",
     "supply": 30,
     "ammunition": 5,
     "resources": 25
    },
    {
     "message": "Achamos remédios e conseguimos novos aliados!",
     "supply": 30,
     "ammunition": 5,
     "resources": 25,
     "units": 2
    },
  ]
}