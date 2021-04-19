import '../assets/css/Stock.css';
import moment from "moment-timezone";

type stock = {
    symbol: string,
    date: Date,
    open: number,
    close: number,
    high: number,
    low: number,
    volume: number,
    adj_open: number,
    adj_high: number,
    adj_low: number,
    adj_close: number,
    adj_volume: number
}

type stockData = Array<stock>

/**
 * The Stock subcomponent of the main StockTicker component. Displayes the stock data passed to it.
 */
function Stock(props : {stockData : stockData}) {
    const { stockData } = props;

    return (
        <div id="Stock" className="table-responsive">
            <table id="StockTable" className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            Date
                        </th>
                        <th scope="col">
                            High
                        </th>
                        <th scope="col">
                            Low
                        </th>
                        <th scope="col">
                            Volume
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    stockData && stockData.map((item, index) => (
                        <tr key={index}>
                            <td>{moment(item.date).format('MMM Do').toString()}</td>
                            <td>{item.high}</td>
                            <td>{item.low}</td>
                            <td>{item.volume}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
    
}

export default Stock;