import { useWolrdStore } from "../store/world";
import type { MapSize } from "../types";
import { random } from "../utils";

export const useWorld = () => {
  const WORLD = useWolrdStore();

  const create = (size: MapSize) => {
    const def = size === "large" ? 15 : size === "default" ? 10 : 5;

    for (let i = 0; i < def; i++) {
      const x = 1 + Math.floor(Math.random() * 20);
      const y = Math.floor(Math.random() * 8);

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

    for (let i = 0; i < def; i++) {
      WORLD.islands = WORLD.islands.map((island) => {
        const x = 1 + Math.floor(Math.random() * 20);
        const y = Math.floor(Math.random() * 7);

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
