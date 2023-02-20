# Vue projekt

## Projekt beállítása

Először le kell tölteni és telepíteni a Node.js-t és az npm-t.

Ha ez még nem történt volna meg, ezen a linken érhető el róla információ:

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Ha egy teljesen új projektbe szeretnél kezdeni, akkor azt a már korábban feltelepített npm parancs segítségével lehet megtenni:

```sh
npm init vue@latest
```

A parancs futtatása után, számos kérdés fog felugrani a projekt alapbeállításaival kapcsolatban. Ezeknél meg kell adni a projekt nevét és leírását, valamint ki kell választani a számunkra megfelelő opciókat, pl. typescript és teszt támogatás. Ezután, ha még nem tetted volna meg, navigálj a mappába, ahol futtattuk a korábbi parancsot. Miután ezzel megvagy, a következő paranccsal még telepíteni is kell ezeket a függőségeket:

```sh
npm install
```

Ha már létező projektről van szó, akkor csak navigálj a projekt gyökér mappájába, majd a terminálon keresztül a következő parancsot kell futtatni, hogy feltelepüljenek az adott projekthez tartozó függőségek(node_modules mappa):

```sh
npm install
```

## Applikáció elindítása és Hot-Reload a fejlesztéshez

Az alábbi paranccsal fogod tudni elindítani az applikációt, amit a localhoston tudsz majd elérni és változtatás hatására automatikusan frissíti a megjelenített képet.

```sh
npm run dev
```

