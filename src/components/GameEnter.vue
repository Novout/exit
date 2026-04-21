<template>
  <div
    :style="{ backgroundImage: `url('/background.png')` }"
    class="flex bg-cover font-poppins flex-col gap-5 items-center justify-center w-full h-100vh"
  >
    <div
      class="flex flex-col gap-3 rounded-lg w-120 bg-dark text-white p-5 h-100 items-center justify-between"
    >
      <p class="font-bold font-poppins text-lg">Name of Capital</p>
      <input class="p-2" v-model="data.name" type="text" />
      <p>Map Size</p>
      <select class="p-2 font-poppins text-md" name="size" v-model="data.size">
        <option>Small</option>
        <option>Default</option>
        <option>Large</option>
      </select>
      <p>Island Type</p>
      <select class="p-2 font-poppins text-md" name="size" v-model="data.type">
        <option>Random</option>
        <option>Stone</option>
        <option>Wine</option>
        <option>Sulfur</option>
        <option>Crystal</option>
      </select>
      <button
        class="w-40 p-3 font-poppins cursor-pointer b-2 border-bluegray"
        @click="onStart"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useCycleStore } from "../store/cycle";
import { usePlayerStore } from "../store/player";
import { getNewCity, getNewPlayerData } from "../defines/player";
import { useWorld } from "../use/world";
import { random } from "../utils";
import { useWolrdStore } from "../store/world";
import type {
  IslandCity,
  MapSize,
  Resources,
  ResourcesItemType,
} from "../types";
import { MarketSet } from "../defines/upgrades";
import { useControllerStore } from "../store/controller";
import { useEventsStore } from "../store/events";
import { useBattleStore } from "../store/battle";
import { useBattle } from "../use/battle";
import {
  botDifficult,
  botGain,
  vikingDifficult,
  VikingGain,
} from "../defines/difficults";

const CYCLE = useCycleStore();
const PLAYER = usePlayerStore();
const WORLD = useWolrdStore();
const CONTROLLER = useControllerStore();
const EVENTS = useEventsStore();
const BATTLE = useBattleStore();

const world = useWorld();
const battle = useBattle();

const data = reactive({
  name: "",
  size: "Default",
  type: "Random",
});

const onStart = () => {
  if (!data.name) return;

  CYCLE.started = true;

  world.create({
    size: data.size.toLowerCase() as MapSize,
    type: data.type.toLowerCase() as ResourcesItemType,
  });

  PLAYER.activeCity = getNewCity();
  PLAYER.activeCity.cityhall.name = data.name;
  PLAYER.activeCityName = data.name;

  const island = random(WORLD.islands);
  PLAYER.data.island = island;

  island.cities = island.cities.map((city: IslandCity, index: number) => {
    if (index === 0) {
      city.owner = "main";
      city.name = data.name;
      PLAYER.activeCity.type = island.type;
    } else if (index === 1) {
      city.owner = "bot-1";
      city.name = "Bot 1";
    }

    city.type = island.type;

    return city;
  });

  PLAYER.data = {
    notifies: 0,
    boats: 0,
    actions: {
      market: {
        activeBuyAction: true,
        activeSellAction: true,
      },
    },
    island,
    map: {
      type: "default",
    },
    ...getNewPlayerData(),
    cities: [],
  };

  let _population = PLAYER.activeCity.cityhall.population.time / 1000;
  let _gold = 5;
  let _science = 5;
  let _wood = 5;
  let _bonus = 5;
  let _market = 60;

  setInterval(() => {
    _population--;
    _gold--;
    _science--;
    _wood--;
    _bonus--;
    _market--;

    if (_market < 0) {
      const buy = random(MarketSet());
      const sell = random(MarketSet());

      PLAYER.data.cities = PLAYER.data.cities.map((city) => {
        city.market.buyResources = buy;
        city.market.sellResources = sell;

        return city;
      });

      PLAYER.activeCity.market.buyResources = buy;
      PLAYER.activeCity.market.sellResources = sell;

      PLAYER.data.actions.market.activeBuyAction = true;
      PLAYER.data.actions.market.activeSellAction = true;

      _market = 60;
    }

    if (_wood < 0) {
      PLAYER.data.cities = PLAYER.data.cities.map((city) => {
        const workers = Number(city.locksmith.workers);
        const max = Number((workers * 4).toFixed());

        if (city.cityhall.wood.maxAcc > city.cityhall.wood.acc + max) {
          city.cityhall.wood.acc += max;
        }

        return city;
      });

      const workers = Number(PLAYER.activeCity.locksmith.workers);
      const max = Number((workers * 2.5).toFixed());

      if (
        PLAYER.activeCity.cityhall.wood.maxAcc >
        PLAYER.activeCity.cityhall.wood.acc
      ) {
        PLAYER.activeCity.cityhall.wood.acc += max;
      }

      _wood = 5;
    }

    if (_bonus < 0) {
      PLAYER.data.cities = PLAYER.data.cities.map((city) => {
        const workers = Number(city.bonus.workers);
        const max = Number((workers * 2.5).toFixed());

        if (city.cityhall.wood.maxAcc > city.cityhall.wood.acc + max) {
          city.cityhall[city.type].acc += max;
        }

        return city;
      });

      const workers = Number(PLAYER.activeCity.bonus.workers);
      const max = Number((workers * 2.5).toFixed());

      if (
        PLAYER.activeCity.cityhall[PLAYER.activeCity.type].maxAcc >
        PLAYER.activeCity.cityhall[PLAYER.activeCity.type].acc
      ) {
        PLAYER.activeCity.cityhall[PLAYER.activeCity.type].acc += max;
      }

      _bonus = 5;
    }

    if (_gold < 0) {
      const cities = PLAYER.data.cities;
      const citiesPopGold = [...cities, PLAYER.activeCity].reduce(
        (acc, current) => {
          const workers =
            Number(current.science.workers) +
            Number(current.tavern.workers) +
            Number(current.bonus.workers) +
            Number(current.locksmith.workers);

          const soldiers = current.soldiers.reduce((acc, current) => {
            if (current.type === "spearman")
              return Number(acc) + Number(current.units * 1);
            if (current.type === "archer")
              return Number(acc) + Number(current.units * 2);
            if (current.type === "catapult")
              return Number(acc) + Number(current.units * 6);
            if (current.type === "hoplita")
              return Number(acc) + Number(current.units * 4);
            if (current.type === "mech")
              return Number(acc) + Number(current.units * 10);

            return acc;
          }, 0);

          return (
            acc +
            (current.cityhall.population.acc -
              Number((workers * 2.5).toFixed()) -
              Number(soldiers.toFixed()))
          );
        },
        0,
      );

      PLAYER.data.gold.acc += citiesPopGold;
      PLAYER.data.gold.set = citiesPopGold;
      _gold = 5;
    }

    if (_science < 0) {
      const cities = PLAYER.data.cities;
      const citiesPopScience = [...cities, PLAYER.activeCity].reduce(
        (acc, current) => {
          return Number(acc) + Number(current.science.workers);
        },
        0,
      );

      PLAYER.data.science.points += citiesPopScience;
      _science = 5;
    }

    if (_population < 0) {
      const isValidHappyInActive =
        Number((PLAYER.activeCity.tavern.workers * 12).toFixed()) + 50 >
        PLAYER.activeCity.cityhall.population.acc;
      const isValidMaxInactive =
        PLAYER.activeCity.cityhall.population.acc <
        PLAYER.activeCity.cityhall.population.maxAcc;

      if (isValidMaxInactive && isValidHappyInActive) {
        PLAYER.activeCity.cityhall.population.acc++;
      } else {
        PLAYER.activeCity.cityhall.population.acc--;
      }

      PLAYER.data.cities = PLAYER.data.cities.map((city) => {
        const isValidHappyInActive =
          Number((city.tavern.workers * 15).toFixed()) + 50 >
          city.cityhall.population.acc;
        const isValidMaxExternal =
          city.cityhall.population.acc < city.cityhall.population.maxAcc;

        if (isValidMaxExternal && isValidHappyInActive) {
          if (city.cityhall.name === PLAYER.activeCity.cityhall.name)
            return city;

          city.cityhall.population.acc++;
        } else {
          city.cityhall.population.acc--;
        }

        return city;
      });
      _population = PLAYER.activeCity.cityhall.population.time / 1000;
    }

    CONTROLLER.points.forEach((item, index) => {
      if (item.start && !item.finish) {
        if (CONTROLLER.points[index]) {
          CONTROLLER.points[index].value--;

          if (item.value <= 0) {
            CONTROLLER.points[index].finish = true;

            EVENTS.list.unshift({
              type: "points",
              message: item.message,
            });
            PLAYER.data.notifies++;
          }
        }
      }
    });

    CONTROLLER.travel.forEach((item, index) => {
      if (item.start && !item.finish) {
        if (CONTROLLER.travel[index]) {
          CONTROLLER.travel[index].value--;

          if (item.value <= 0 && index === 2) {
            CONTROLLER.travel[index].finish = true;
            CONTROLLER.travel[index].start = false;

            WORLD.islands = WORLD.islands.map((island) => {
              const city = island.cities.find(
                (city) => city === WORLD.cityActive,
              );
              if (city) {
                const cityIndex = island.cities.indexOf(city);

                if (city?.owner !== "none" && island.cities[cityIndex]) {
                  const name = random([
                    "Heros",
                    "Istradi",
                    "Tarno",
                    "Lerno",
                    "Acto",
                    "Hufos",
                    "Aerol",
                  ]);
                  island.cities[cityIndex].owner = "main";
                  island.cities[cityIndex].name = name;
                  const newCity = getNewCity();
                  newCity.cityhall.name = name;
                  newCity.id = island.cities.length + 1;

                  CONTROLLER.constructions.push(
                    {
                      id: `cityhall_${newCity.id}`,
                      message: "Upgrade cityhall",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `market_${newCity.id}`,
                      message: "Upgrade market",
                      level: {
                        2: 22,
                        3: 38,
                        4: 58,
                        5: 99,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `military_${newCity.id}`,
                      message: "Upgrade military",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `navy_${newCity.id}`,
                      message: "Upgrade navy",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `palace_${newCity.id}`,
                      message: "Upgrade palace",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `science_${newCity.id}`,
                      message: "Upgrade science",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `storage_${newCity.id}`,
                      message: "Upgrade storage",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `tavern_${newCity.id}`,
                      message: "Upgrade tavern",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `wall_${newCity.id}`,
                      message: "Upgrade wall",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `wood_${newCity.id}`,
                      message: "Upgrade wall",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                    {
                      id: `bonus${newCity.id}`,
                      message: "Upgrade wall",
                      level: {
                        2: 38,
                        3: 62,
                        4: 97,
                        5: 170,
                      },
                      start: false,
                      finish: false,
                      activeLevel: 2,
                    },
                  );

                  PLAYER.data.cities.push(newCity);
                }
              }

              return island;
            });
          }

          if (item.value <= 0 && index < 2) {
            const isViking = item.id.startsWith("viking");

            CONTROLLER.travel[index].finish = true;
            CONTROLLER.travel[index].start = false;

            const levelDifficult = isViking
              ? vikingDifficult(PLAYER.data.island.vikingLevel)
              : botDifficult(1);
            const levelGain = isViking
              ? VikingGain(PLAYER.data.island.vikingLevel)
              : botGain(1);

            EVENTS.list.unshift({
              type: "army",
              message: item.message,
            });

            BATTLE.base.defender = battle.getUnitsCounter(
              {
                wall: 3,
                mech: levelDifficult.mech,
                viking: isViking ? levelDifficult.soldiers : 0,
                catapult: levelDifficult.catapult,
                archer: isViking ? levelDifficult.long : levelDifficult.archer,
                hoplita: levelDifficult.hoplita,
                spearman: levelDifficult.spearman,
              },
              "defender",
              isViking,
            );

            const city = PLAYER.activeCity;

            const set = {
              mech: 0,
              archer: 0,
              catapult: 0,
              hoplita: 0,
              spearman: 0,
            };

            city?.soldiers.forEach((soldier) => {
              if (soldier.type === "spearman") set.spearman = soldier.units;
              if (soldier.type === "archer") set.archer = soldier.units;
              if (soldier.type === "hoplita") set.hoplita = soldier.units;
              if (soldier.type === "catapult") set.catapult = soldier.units;
              if (soldier.type === "mech") set.mech = soldier.units;
            });

            BATTLE.base.attacker = battle.getUnitsCounter(
              {
                ...set,
                wall: 0,
                viking: 0,
              },
              "attacker",
              isViking,
            );

            BATTLE.base.winBonus = {
              ...(levelGain as Resources),
            };

            BATTLE.base.city = undefined;
            BATTLE.base.playerSide = "attacker";
            BATTLE.base.isViking = isViking;

            CYCLE.type = "battle";

            PLAYER.data.notifies++;
          }
        }
      }
    });

    CONTROLLER.units.forEach((item, index) => {
      if (item.start && !item.finish) {
        if (CONTROLLER.units[index]) {
          CONTROLLER.units[index].value--;

          if (item.value <= 0) {
            CONTROLLER.units[index].finish = true;

            PLAYER.activeCity.cityhall.wood.acc -=
              CONTROLLER.units[index]?.values.wood || 0;
            PLAYER.activeCity.cityhall.stone.acc -=
              CONTROLLER.units[index]?.values.stone || 0;
            PLAYER.activeCity.cityhall.sulfur.acc -=
              CONTROLLER.units[index]?.values.sulfur || 0;
            PLAYER.activeCity.cityhall.crystal.acc -=
              CONTROLLER.units[index]?.values.crystal || 0;

            const boats = CONTROLLER.units[index].values.boats;
            if (boats) {
              PLAYER.data.boats += boats;
            }

            PLAYER.activeCity.soldiers = PLAYER.activeCity.soldiers.map(
              (soldier) => {
                if (soldier.type === "spearman")
                  soldier.units +=
                    CONTROLLER.units[index]?.values.spearman || 0;
                if (soldier.type === "hoplita")
                  soldier.units += CONTROLLER.units[index]?.values.hoplita || 0;
                if (soldier.type === "mech")
                  soldier.units += CONTROLLER.units[index]?.values.mech || 0;
                if (soldier.type === "archer")
                  soldier.units += CONTROLLER.units[index]?.values.archer || 0;
                if (soldier.type === "catapult")
                  soldier.units +=
                    CONTROLLER.units[index]?.values.catapult || 0;

                return soldier;
              },
            );

            EVENTS.list.unshift({
              type: "army",
              message: item.message,
            });
            PLAYER.data.notifies++;
          }
        }
      }
    });

    CONTROLLER.constructions.forEach((item, index) => {
      if (item.start && !item.finish) {
        if (CONTROLLER.constructions[index]) {
          const activeLevel = item.activeLevel;

          const active = item.level[activeLevel];

          if (active) CONTROLLER.constructions[index].level[activeLevel]--;

          if (item.level[activeLevel] <= 0) {
            CONTROLLER.constructions[index].finish = true;
            CONTROLLER.constructions[index].start = false;

            if (item.id === "cityhall") {
              PLAYER.activeCity.cityhall.level++;
              PLAYER.activeCity.cityhall.population.maxAcc += 30;
            } else if (item.id === "market") {
              PLAYER.activeCity.market.level++;
            } else if (item.id === "military") {
              PLAYER.activeCity.military.level++;
            } else if (item.id === "navy") {
              PLAYER.activeCity.shipyard.level++;
            } else if (item.id === "palace") {
              PLAYER.data.colonizePoints++;
              PLAYER.activeCity.palace.level++;
            } else if (item.id === "science") {
              PLAYER.activeCity.science.level++;
            } else if (item.id === "storage") {
              PLAYER.activeCity.storage.level++;
            } else if (item.id === "tavern") {
              PLAYER.activeCity.tavern.level++;
            } else if (item.id === "wall") {
              PLAYER.activeCity.wall.level++;
            } else if (item.id === "wood_0") {
              PLAYER.activeCity.locksmith.level++;
            } else if (item.id === "bonus_0") {
              PLAYER.activeCity.bonus.level++;
            }

            EVENTS.list.unshift({
              type: "constructions",
              message: item.message,
            });
            PLAYER.data.notifies++;
          }
        }
      }
    });
  }, 1000);
};
</script>
