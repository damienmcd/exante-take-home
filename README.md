# Exante Take-home Assignment

## Assumptions

- The last array element in the irradiation actualValues should be used as the latest date for calculations, unless the policy expiry date has passed.
- No data is recorded after the policy end date.
- The policy start date is the 15th of August, but the expectedValues in the irradiation file are monthly totals. I have used the full monthly total for August in the calculations.
- Similar to the above assumption, the actualValues data in the irradiation file ends on the 29th of November. Again, the expectedValues are for the month of November, so I have used the full expected value for November.
- The actualValues data in the irradiation file, using the assumptions for calculations mentioned above, results in 81% of total expected sun, which falls below the minimum value on the chart. I have adjusted the min and max on the chart to allow the 81% figure to be displayed.
- The chart in the spec shows the percentage as 102%, which is above the threshold, and is displayed using a blue bar on the graph. I have allowed for percentages that are below the threshold to be displayed in red to highlight the current status to the user in a clearer way, which helps to improve the User Experience.

## Questions for Discussion

- How do we handle comparisons on expected values for a full month when the policy may start or end on a date within the month, i.e. starting on the 15th of the month, or ending on the 29th. Should we work out the pro-rata value for the number of days in the month that we have data for?
- If the percentage of total expected sun falls outside the range to be displayed on the chart, how should this be displayed? Should the min and max range on the chart adjust automatically, or should there be another way of displaying the "speedometer"? My implementation is passing in the min, max and intervals as props to the chart.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

Opens app at http://localhost:5173/ by default

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
