import { usePlayerStore } from "../store/player"

export const useResult = () =>  {
  const PLAYER = usePlayerStore()

  const setStoreCorrectValues = (result: Record<string, any>) => {
    if(result?.sulfur && PLAYER.activeCity.cityhall.sulfur.maxAcc >= PLAYER.activeCity.cityhall.sulfur.acc + result.sulfur) PLAYER.activeCity.cityhall.sulfur.acc += result.sulfur
    if(result?.resources && PLAYER.activeCity.cityhall.stone.maxAcc >= PLAYER.activeCity.cityhall.stone.acc + result.resources) PLAYER.activeCity.cityhall.stone.acc += result.stone
    if(result?.wine && PLAYER.activeCity.cityhall.wine.maxAcc >= PLAYER.activeCity.cityhall.wine.acc + result.wine) PLAYER.activeCity.cityhall.wine.acc += result.wine
    if(result?.wood && PLAYER.activeCity.cityhall.wood.maxAcc >= PLAYER.activeCity.cityhall.wood.acc + result.wood) PLAYER.activeCity.cityhall.wood.acc += result.wood
    if(result?.crystal && PLAYER.activeCity.cityhall.crystal.maxAcc >= PLAYER.activeCity.cityhall.crystal.acc + result.crystal) PLAYER.activeCity.cityhall.crystal.acc += result.crystal
  }

  return { setStoreCorrectValues }
}