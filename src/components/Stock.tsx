import '../assets/css/Stock.css';
import moment from 'moment-timezone';

type StockInfo = {
  symbol: string;
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  adjVolume: number;
};

type Stocks = Array<StockInfo>;

/**
 * The Stock subcomponent of the main StockTicker component. Displayes the stock data passed to it.
 */
function Stock(props: { stockData: Stocks }) {
  const { stockData } = props;

  return (
    <div id="Stock" className="table-responsive">
      <table id="StockTable" className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody>
          {stockData &&
            stockData.map((item) => (
              <tr key={moment(item.date).valueOf()}>
                <td>
                  {moment(item.date).format('DD MMM').toString()}
                </td>
                <td>{item.high}</td>
                <td>{item.low}</td>
                <td>{item.volume}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stock;
