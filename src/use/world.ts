import { useWolrdStore } from "../store/world"
import { random } from "../utils"

export const useWorld = () => {
  const WORLD = useWolrdStore()

  const create = () => {
    for (let i = 0; i < 15; i++) {
      const x = Math.floor(Math.random() * 30)
      const y = Math.floor(Math.random() * 10)

      WORLD.islands.push({
        x,
        y,
        type: random(['wood', 'stone', 'sulfur', 'crystal', 'wine']),
        cities: []
      })
    }

    for (let i = 0; i < 9; i++) {
      const x = Math.floor(Math.random() * 30)
      const y = Math.floor(Math.random() * 10)

      WORLD.islands = WORLD.islands.map((island) => {
        island.cities.push({
          x,
          y,
          owner: undefined
        })

        return island
      })
    }
  }

  return {
    create
  }
}