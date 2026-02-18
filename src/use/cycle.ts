import { zombieNightAttack } from "../defines/zombie-attacks"
import { useCycleStore } from "../store/cycle"
import { usePlayerStore } from "../store/player"
import { random } from "../utils"

export const useCycle = () => {
  const PLAYER = usePlayerStore()
  const CYCLE = useCycleStore()

  const preload = async () => {
    def()
  }

  const def = () => {
    if(!PLAYER.fortress.set.barricades) PLAYER.fortress.supply.acc -= 2
    PLAYER.fortress.resources.acc -= 2
  }

  const attack = () => {
    const base = [...zombieNightAttack()]

    const result = random(base)

    if(!PLAYER.fortress.set.barricades) PLAYER.fortress.supply.acc -= result.supply
    PLAYER.fortress.ammunition.acc -= result.ammunition
    PLAYER.fortress.resources.acc -= result.resources
    if(!PLAYER.fortress.set.patrol) PLAYER.fortress.units.act -= result.units

    if(PLAYER.fortress.supply.acc < 0 || PLAYER.fortress.ammunition.acc < 3 || PLAYER.fortress.resources.acc < 3) {
      PLAYER.fortress.life = PLAYER.fortress.life - 5
    }

    if(PLAYER.fortress.life <= 0) {
      alert('voce perdeu!')
    }
  }

  const run = async () => {
    await preload()

    attack()

    CYCLE.value += 1
    PLAYER.turn.acc = PLAYER.turn.max
  }

  const save = () => {

  }

  return { run, attack, save }
}