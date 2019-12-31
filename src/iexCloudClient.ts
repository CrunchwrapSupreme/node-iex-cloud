import * as iex from "./types";
import Crypto from "./crypto";
import Stock from "./stock";
import Market from "./market";
import ReferenceData from "./reference";
import DataPoints from "./dataPoints";
import TimeSeries from "./timeSeries";
import Statistics from "./stats";
import IEXRequest from "./request";
import Forex from "./forex";

export default class IEXCloudClient {
  private req: IEXRequest;
  private cryptoCurrency: Crypto;
  private stock: Stock;
  private stockMarket: Market;
  private foreignExchange: Forex;
  private referenceData: ReferenceData;
  private datapoints: DataPoints;
  private statistics: Statistics;
  private timeseries: TimeSeries;

  constructor(f: typeof fetch | any, config: iex.Configuration) {
    this.req = new IEXRequest(f.bind(this), config);
    this.cryptoCurrency = new Crypto(this.req);
    this.stock = new Stock(this.req);
    this.stockMarket = new Market(this.req);
    this.foreignExchange = new Forex(this.req);
    this.referenceData = new ReferenceData(this.req);
    this.datapoints = new DataPoints(this.req);
    this.statistics = new Statistics(this.req);
    this.timeseries = new TimeSeries(this.req);
  }

  /**  Takes in a stock symbol, a unique series of letters assigned to a security   */
  public symbol = (symbol: string): Stock => {
    this.req.stockSymbol = symbol;
    return this.stock;
  };

  /** Takes in multiple stock symbols, and batches them to a single request  */
  public batchSymbols = (...symbols: string[]): Stock => {
    this.req.datatype = "stock/market/batch";
    this.req.stockSymbols = symbols;
    return this.stock;
  };

   /** Takes in multiple stock symbols, and batches them to a single request  */
   public symbols = (...symbols: string[]): Stock => {
    this.req.datatype = "stock/market/batch";
    console.warn("This method will be deprecated please use batchSymbols to batch multiple stock symbols together")
    this.req.stockSymbols = symbols;
    return this.stock;
  };

  public tops = (): Promise<any> => {
    this.req.datatype = "tops";
    return this.req.request("");
  };

  /**  Takes in a crypto currency   */
  public crypto = (crypto: iex.CryptoCurrency): Crypto => {
    this.req.datatype = "crypto";
    this.req.cryptoCurrency = crypto;
    return this.cryptoCurrency;
  };

  public market = (): Market => {
    this.req.datatype = `stock/market`;
    return this.stockMarket;
  };

  public forex = (): Forex => {
    this.req.datatype = `fx`;
    return this.foreignExchange;
  };

  public refData = (): ReferenceData => {
    this.req.datatype = `ref-data`;
    return this.referenceData;
  };

  public dataPoints = (): DataPoints => {
    this.req.datatype = `data-points`;
    return this.datapoints;
  };

  public stats = (): Statistics => {
    this.req.datatype = `stats`;
    return this.statistics;
  };

  public timeSeries = (): TimeSeries => {
    this.req.datatype = `time-series`;
    return this.timeseries;
  };

  /**  Returns an array of symbols up to the top 10 matches.
   * Results will be sorted for relevancy. Search currently defaults to equities only, where the symbol returned is supported by endpoints listed under the Stocks category.
   * @params search by symbol or security name.
   */
  public search = (symbol: string): Promise<iex.Search[]> => {
    this.req.datatype = "search";
    return this.req.request(symbol);
  };
}

