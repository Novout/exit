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

export const voidEvents = (): Event[] => {
  return [
    {
     "message": "Foi encontrado apenas destroços sem usar esforço...",
     "resources": 10,
     "rep": true
    },
    {
     "message": "Foi encontrado um sobrevivente saudável!",
     "units": 1
    },
    {
     "message": "Recursos espalhados foram recuperados!",
     "resources": 20,
     "supply": 10,
     "ammunition": 10
    }
  ]
}

export const militaryEvents = (): Event[] => {
  return [
    {
     "message": "Perdemos a ofensiva! Tinha outros vivos no local...",
     "units": -1,
    },
    {
     "message": "Conseguimos entrar no local e conseguimos pegar!",
     "resources": 10,
     "ammunition": 40
    }
  ]
}