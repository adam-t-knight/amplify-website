import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import moment from "moment-timezone";
import '../assets/css/StockTicker.css';

function StockTicker() {
    const [stockData, setStockData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStockWithFetch();
    }, []);

    const getStockWithFetch = async () => {
        const stockData = await API.get('ExternalAPIs', '/GetStock', '');
        console.log(stockData);
        setStockData(stockData);
        setIsLoading(false);
    };

    return isLoading ? (
        <div className="StockTicker">
            <h1>Stock Ticker</h1>
            <h2>Loading! Please wait...</h2>
        </div>
    ) : (
        <div className="StockTicker">
            <h1>Stock Ticker</h1>
            <div id="StockTickerContainer" className="table-responsive">
                <table id="StockTickerTable">
                    <thead>
                        <tr>
                            <th scope="col">
                                Open
                            </th>
                            <th scope="col">
                                High
                            </th>
                            <th scope="col">
                                Low
                            </th>
                            <th scope="col">
                                Close
                            </th>
                            <th scope="col">
                                Volume
                            </th>
                            <th scope="col">
                                Adjusted High
                            </th>
                            <th scope="col">
                                Adjusted Low
                            </th>
                            <th scope="col">
                                Adjusted Close
                            </th>
                            <th scope="col">
                                Adjusted Open
                            </th>
                            <th scope="col">
                                Adjusted Volume
                            </th>
                            <th scope="col">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        stockData.data && stockData.data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.open}</td>
                                <td>{item.high}</td>
                                <td>{item.low}</td>
                                <td>{item.close}</td>
                                <td>{item.volume}</td>
                                <td>{item.adj_high}</td>
                                <td>{item.adj_low}</td>
                                <td>{item.adj_close}</td>
                                <td>{item.adj_open}</td>
                                <td>{item.adj_volume}</td>
                                <td>{moment(item.date).format('DD-MM-YYYY').toString()}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockTicker;