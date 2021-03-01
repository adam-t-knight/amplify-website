import '../assets/css/Stock.css';
import moment from "moment-timezone";

function Stock({stockData}) {

    return (
        <div className="table-responsive Stock">
            <table id="StockTable">
                <thead>
                    <tr>
                        <th scope="col">
                            Symbol
                        </th>
                        <th scope="col">
                            Date
                        </th>
                        <th scope="col">
                            Open
                        </th>
                        <th scope="col">
                            Close
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
{/*                         <th scope="col">
                            Adj Open
                        </th>
                        <th scope="col">
                            Adj Close
                        </th>
                        <th scope="col">
                            Adj High
                        </th>
                        <th scope="col">
                            Adj Low
                        </th>
                        <th scope="col">
                            Adj Volume
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                {
                    stockData.data && stockData.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.symbol}</td>
                            <td>{moment(item.date).format('ddd, MMM Do YYYY').toString()}</td>
                            <td>{item.open}</td>
                            <td>{item.close}</td>
                            <td>{item.high}</td>
                            <td>{item.low}</td>
                            <td>{item.volume}</td>
{/*                             <td>{item.adj_open}</td>
                            <td>{item.adj_close}</td>
                            <td>{item.adj_high}</td>
                            <td>{item.adj_low}</td>
                            <td>{item.adj_volume}</td> */}
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
    
}

export default Stock;