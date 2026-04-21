import { useWolrdStore } from "../store/world";
import { random } from "../utils";

export const useWorld = () => {
  const WORLD = useWolrdStore();

  const create = () => {
    for (let i = 0; i < 15; i++) {
      const x = 1 + Math.floor(Math.random() * 25);
      const y = Math.floor(Math.random() * 10);

      const ignore = WORLD.islands.some(
        (island) => island.x === x && island.y === y,
      );

      if (!ignore) {
        WORLD.islands.push({
          x,
          y,
          type: random(["wood", "stone", "sulfur", "crystal", "wine"]),
          vikingLevel: 1,
          cities: [],
        });
      }
    }

    for (let i = 0; i < 9; i++) {
      WORLD.islands = WORLD.islands.map((island) => {
        const x = 1 + Math.floor(Math.random() * 25);
        const y = Math.floor(Math.random() * 10);

        const ignore = WORLD.islands.some(
          (island) => island.x === x && island.y === y,
        );

        if (!ignore) {
          island.cities.push({
            x,
            y,
            owner: undefined,
            type: island.type,
            island,
          });
        }

        return island;
      });
    }
  };

  return {
    create,
  };
};
