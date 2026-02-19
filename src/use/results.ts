import { usePlayerStore } from "../store/player"
import type { Event } from "../types"

export const useResults = () => {
  const PLAYER = usePlayerStore()

  const exploreSet = (result: Event) => {
    if(!result.rep) {
      PLAYER.turn.acc--
    }

    if(result.supply && PLAYER.fortress.supply.maxAcc >= PLAYER.fortress.supply.acc + result.supply) PLAYER.fortress.supply.acc += result.supply
    if(result.resources && PLAYER.fortress.resources.maxAcc >= PLAYER.fortress.resources.acc + result.resources) PLAYER.fortress.resources.acc += result.resources
    if(result.ammunition && PLAYER.fortress.ammunition.maxAcc >= PLAYER.fortress.ammunition.acc + result.ammunition) PLAYER.fortress.ammunition.acc += result.ammunition
    if(result.units && PLAYER.fortress.units.maxUnits >= PLAYER.fortress.units.act + result.units) PLAYER.fortress.units.act += result.units
  }

  return { exploreSet }
}