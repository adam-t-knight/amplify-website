import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import Stock from '../components/Stock';
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
            <div className="StockContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    ) : (
        <div className="StockTicker">
            <h1>Stock Ticker</h1>
            <div className="StockContainer">
                <h2>Symbol: GME</h2>
                <h2>Exchange: XNYS</h2>
                <Stock stockData={stockData} />
            </div>
        </div>
    );
}

export default StockTicker;