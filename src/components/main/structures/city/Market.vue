<template>
  <StructureModal name="market">
    <div class="flex flex-col gap-2 w-full overflow-auto h-100">
      <p>Level: {{ PLAYER.activeCity.market.level }}</p>
      <div
        :class="[
          PLAYER.data.actions.market.activeBuyAction ? '' : 'opacity-50',
        ]"
        class="flex flex-col w-full"
      >
        <h2>Buy / Gold {{ buyPrev * 4 }}</h2>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWood class="h-8 w-8" />
          <p>{{ buy.wood }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="buy.wood"
            :min="0"
            :max="
              PLAYER.activeCity.market.buyResources.wood *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconStone class="h-8 w-8" />
          <p>{{ buy.stone }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="buy.stone"
            :min="0"
            :max="
              PLAYER.activeCity.market.buyResources.stone *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWine class="h-8 w-8" />
          <p>{{ buy.wine }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="buy.wine"
            :min="0"
            :max="
              PLAYER.activeCity.market.buyResources.wine *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconSulfur class="h-8 w-8" />
          <p>{{ buy.sulfur }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="buy.sulfur"
            :min="0"
            :max="
              PLAYER.activeCity.market.buyResources.sulfur *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconCrystal class="h-8 w-8" />
          <p>{{ buy.crystal }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="buy.crystal"
            :min="0"
            :max="
              PLAYER.activeCity.market.buyResources.crystal *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <Button @click="onBuy">Buy</Button>
      </div>
      <div
        :class="[
          PLAYER.data.actions.market.activeSellAction ? '' : 'opacity-50',
        ]"
        class="flex flex-col w-full"
      >
        <h2>Sell / Gold {{ sellPrev * 2 }}</h2>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWood class="h-8 w-8" />
          <p>{{ sell.wood }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="sell.wood"
            :min="0"
            :max="
              PLAYER.activeCity.market.sellResources.wood *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconStone class="h-8 w-8" />
          <p>{{ sell.stone }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="sell.stone"
            :min="0"
            :max="
              PLAYER.activeCity.market.sellResources.stone *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconWine class="h-8 w-8" />
          <p>{{ sell.wine }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="sell.wine"
            :min="0"
            :max="
              PLAYER.activeCity.market.sellResources.wine *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconSulfur class="h-8 w-8" />
          <p>{{ sell.sulfur }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="sell.sulfur"
            :min="0"
            :max="
              PLAYER.activeCity.market.sellResources.sulfur *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <div class="flex gap-4 items-center w-full justify-between">
          <IconCrystal class="h-8 w-8" />
          <p>{{ sell.crystal }}</p>
          <input
            class="w-90%"
            type="range"
            id="volume"
            name="volume"
            v-model="sell.crystal"
            :min="0"
            :max="
              PLAYER.activeCity.market.sellResources.crystal *
              PLAYER.activeCity.market.level
            "
          />
        </div>
        <Button @click="onSell">Sell</Button>
      </div>
      <div class="flex w-full justify-between pt-10">
        <ResourcesBar :resources="resources" /><Button @click="onUpgrade"
          >Upgrade</Button
        >
      </div>
      <p v-if="def.start && !def.finish">
        {{
          computed(() => format(def.level[PLAYER.activeCity.market.level + 1]))
        }}
      </p>
    </div>
  </StructureModal>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { MarketUpgrade } from "../../../../defines/upgrades";
import { usePlayerStore } from "../../../../store/player";
import type { ConstructionTime } from "../../../../types";
import { useControllerStore } from "../../../../store/controller";
import { format } from "../../../../utils";

const PLAYER = usePlayerStore();
const CONTROLLER = useControllerStore();

const resources = ref(MarketUpgrade(PLAYER.activeCity.science.level + 1));
const def = computed(
  () =>
    CONTROLLER.constructions.find(
      (item) => item.id === `market_${PLAYER.activeCity.id}`,
    ) as ConstructionTime,
);

const buyPrev = computed(
  () =>
    Number(buy.wood) +
    Number(buy.stone) +
    Number(buy.wine) +
    Number(buy.sulfur) +
    Number(buy.crystal),
);
const sellPrev = computed(
  () =>
    Number(sell.wood) +
    Number(sell.stone) +
    Number(sell.wine) +
    Number(sell.sulfur) +
    Number(sell.crystal),
);

const buy = reactive({
  wood: 0,
  stone: 0,
  wine: 0,
  sulfur: 0,
  crystal: 0,
});

const sell = reactive({
  wood: 0,
  stone: 0,
  wine: 0,
  sulfur: 0,
  crystal: 0,
});

const onBuy = () => {
  if (!PLAYER.data.actions.market.activeBuyAction) return;

  const acc =
    Number(buy.wood) +
    Number(buy.wine) +
    Number(buy.stone) +
    Number(buy.sulfur) +
    Number(buy.crystal);

  if (acc <= PLAYER.data.gold.acc * 4) {
    if (
      PLAYER.activeCity.cityhall.wine.acc <=
      PLAYER.activeCity.cityhall.wine.maxAcc
    )
      PLAYER.activeCity.cityhall.wine.acc += Number(buy.wine);
    if (
      PLAYER.activeCity.cityhall.stone.acc <=
      PLAYER.activeCity.cityhall.stone.maxAcc
    )
      PLAYER.activeCity.cityhall.stone.acc += Number(buy.stone);
    if (
      PLAYER.activeCity.cityhall.wood.acc <=
      PLAYER.activeCity.cityhall.wood.maxAcc
    )
      PLAYER.activeCity.cityhall.wood.acc += Number(buy.wood);
    if (
      PLAYER.activeCity.cityhall.crystal.acc <=
      PLAYER.activeCity.cityhall.crystal.maxAcc
    )
      PLAYER.activeCity.cityhall.crystal.acc += Number(buy.crystal);
    if (
      PLAYER.activeCity.cityhall.sulfur.acc <=
      PLAYER.activeCity.cityhall.sulfur.maxAcc
    )
      PLAYER.activeCity.cityhall.sulfur.acc += Number(buy.sulfur);

    PLAYER.data.gold.acc -= acc * 4;

    buy.wood = 0;
    buy.wine = 0;
    buy.stone = 0;
    buy.crystal = 0;
    buy.sulfur = 0;

    PLAYER.data.actions.market.activeBuyAction = false;
  }
};

const onSell = () => {
  if (!PLAYER.data.actions.market.activeSellAction) return;

  let acc = 0;

  if (Number(sell.wine) <= PLAYER.activeCity.cityhall.wine.acc) {
    PLAYER.activeCity.cityhall.wine.acc -= Number(sell.wine);
    acc += Number(sell.wine);
  }
  if (Number(sell.stone) <= PLAYER.activeCity.cityhall.stone.acc) {
    PLAYER.activeCity.cityhall.stone.acc -= Number(sell.stone);
    acc += Number(sell.stone);
  }
  if (Number(sell.wood) <= PLAYER.activeCity.cityhall.wood.acc) {
    PLAYER.activeCity.cityhall.wood.acc -= Number(sell.wood);
    acc += Number(sell.wood);
  }
  if (Number(sell.crystal) <= PLAYER.activeCity.cityhall.crystal.acc) {
    PLAYER.activeCity.cityhall.crystal.acc -= Number(sell.crystal);
    acc += Number(sell.crystal);
  }
  if (Number(sell.sulfur) <= PLAYER.activeCity.cityhall.sulfur.acc) {
    PLAYER.activeCity.cityhall.sulfur.acc -= Number(sell.sulfur);
    acc += Number(sell.sulfur);
  }

  PLAYER.data.gold.acc += acc * 2;

  sell.wood = 0;
  sell.wine = 0;
  sell.stone = 0;
  sell.crystal = 0;
  sell.sulfur = 0;

  if (acc !== 0) PLAYER.data.actions.market.activeSellAction = false;
};

const onUpgrade = () => {
  const levelTarget = PLAYER.activeCity.science.level + 1;

  const upg = MarketUpgrade(levelTarget);

  if (upg) {
    const dmgWood = upg.wood;
    const dmgStone = upg.stone;

    if (
      !def.value.start &&
      PLAYER.activeCity.cityhall.wood.acc >= dmgWood &&
      PLAYER.activeCity.cityhall.stone.acc >= dmgStone
    ) {
      PLAYER.activeCity.cityhall.wood.acc -= upg.wood;
      PLAYER.activeCity.cityhall.stone.acc -= upg.stone;

      const city = CONTROLLER.constructions.find(
        (item) => item.id === `market_${PLAYER.activeCity.id}`,
      ) as ConstructionTime;
      const cityIndex = CONTROLLER.constructions.indexOf(city);

      CONTROLLER.constructions[cityIndex]!.finish = false;
      CONTROLLER.constructions[cityIndex]!.start = true;

      resources.value = MarketUpgrade(levelTarget + 1);
    }
  }
};
</script>
