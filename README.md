# node-iex-cloud

## Installation and Usage

```bash
npm i node-iex-cloud
```

ES6+

```javascript
import { IEXCloudClient } from "node-iex-cloud";
// Use a promise-based library for your request
import fetch from "node-fetch"
```

common.js

```javascript
const { IEXCloudClient } = require("node-iex-cloud");
// Use a promise-based library for your request
const fetch = require("node-fetch")
```

## Configuration and Setup

IEX Cloud uses a message weighting system to measure usage in message counts, make sure sandbox is enabled to `true` in development to avoid reaching data limits or overages.
(Note: when enabling sandbox to `true`, the publishable key token is automatically prefixed with the letter `T` and doesn't require changing the existing token to access Test Data )

```javascript
const iex = new IEX(fetch, {
  sandbox: true,
  publishable: "pk_21b4ffeccc6e3cnc1df07467a47231c6",
  version: "stable"
});
```

## Examples

The first method takes in a company symbol (an abbreviation used to uniquely identify publicly traded shares). The subsequent method retreive the specfic IEX data type.

### Stocks

```javascript
iex
  // stock/google/financials?period=annual
  .symbol("googl")
  .financials("quarterly")
  .then(res => console.log(res));
```

```javascript
// stock/googl/ceo-compensation
iex
  .symbol("googl")
  .ceoCompensation()
  .then(res => console.log(res));
```

### Available Methods

- `balanceSheet`
- `book`
- `chart(range, date)`
- `cashFlow(period?: string, last?: number)`
- `ceoCompensation`
- `company`
- `delayedQuote`
- `dividends(range)`
- `earnings(last, field)`
- `estimates`
- `financials(period)`
- `news(last)`
- `fundOwnership`
- `income`
- `insiderRoster`
- `insiderSummary`
- `insiderTransactions`
- `institutionalOwnership`
- `intradayPrices`
- `logo`
- `largestTrades`
- `options`
- `peers`
- `previous`
- `price`
- `priceTarget`
- `ohlc`
- `sentiment(type, date)`
- `quote`
- `recommendationTrends`
- `stats(stat)`
- `splits(range)`
- `shortInterest(date)`
- `volumeByVenue(date)`

### Market

```javascript
// stock/market/today-earnings
iex.market("today-earnings").then(res => console.log(res));
```

### Data Points

Data points are available per symbol and return individual plain text values.

```javascript
// data-points/aapl/quote-latestprice
iex
  .symbol("aapl")
  .dataPoints("quote-latestprice")
  .then(res => console.log(res));
```

### Batch

Use the method `batch` to batch Request of multiple data types, all IEX types are supported. IEX allows only up to `10` types to be made per request.

```javascript
iex
  // stock/googl/batch?types=stock,company,balance-sheet,cash-flow,estimates
  .symbol("googl")
  .batch("company", "balance-sheet", "cash-flow", "estimates")
  .then(res => console.log(res));
```

### IEX Last

Last provides trade data for executions on IEX.

```javascript
// tops/last?symbols=aapl,googl,amzn
iex.tops("aapl", "googl", "amzn").then(res => console.log(res));
```

### IEX Historical Stats

```javascript
// stats/intraday
iex.historicalStats("intraday").then(res => console.log(res));
```

### IEX Deep

DEEP is used to receive real-time depth of book quotations direct from IEX.

```javascript
// deep/trading-status?symbols=msft
iex
  .symbol("msft")
  .deep("trading-status")
  .then(res => console.log(res));
```

### SSE Streaming

Not Yet Supported
