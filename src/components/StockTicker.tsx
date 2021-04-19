import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import Stock from './Stock';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../assets/css/StockTicker.css';

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
 * Main Stock component. Fetches stocks based on symbols selected and passes them to the Stock component to be displayed.
 */
function StockTicker() {
    const [stockSymbol, setStockSymbol] = useState<string>("GME"); //initialized to GME to fetch a stock on load
    const [stockData, setStockData] = useState<stockData>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    /**
     * Fetches stock symbol on change
     */
    useEffect(() => {
        getStockWithAPI(stockSymbol);
    }, [stockSymbol]);

    /**
     * Fetches stock data based on the inputted stock symbol.
     * @param {string} stockSymbol stock symbol of data to be fetched
     */
    const getStockWithAPI = async (stockSymbol : string) => {
        setIsLoaded(false);
        const stockJson = await API.get('ExternalAPIs', '/GetStock?symbol=' + stockSymbol, '');
        setStockData(stockJson.data);
        setIsLoaded(true);
    };

    /**
     * Sets the stock symbol when the dropdown changes. If inputted value is null, no change is made.
     * @param {string} stockSymbol stock symbol to be set
     */
    function selectStock(stockSymbol : string | null) {
        if(stockSymbol) {
            setStockSymbol(stockSymbol);
        }
    }

    return (
        <div id="StockTicker">
            <h2>Stock Ticker</h2>
            <DropdownButton
                alignRight
                title="Stock selector"
                id="dropdown-menu-align-right"
                onSelect={e => selectStock(e)}
            >
                <Dropdown.Item eventKey="AMC">AMC (NYSE)</Dropdown.Item>
                <Dropdown.Item eventKey="AMD">AMD (NASDAQ)</Dropdown.Item>
                <Dropdown.Item eventKey="AMZN">AMZN (NASDAQ)</Dropdown.Item>
                <Dropdown.Item eventKey="AAPL">AAPL (NASDAQ)</Dropdown.Item>
                <Dropdown.Item eventKey="BYND">BYND (NASDAQ)</Dropdown.Item>
                <Dropdown.Item eventKey="GME">GME (NYSE)</Dropdown.Item>
                <Dropdown.Item eventKey="NFLX">NFLX (NASDAQ)</Dropdown.Item>
                <Dropdown.Item eventKey="NOK">NOK (NYSE)</Dropdown.Item>
                <Dropdown.Item eventKey="NVDA">NVDA (NASDAQ)</Dropdown.Item>
                <Dropdown.Item eventKey="TSLA">TSLA (NASDAQ)</Dropdown.Item>
                <Dropdown.Item eventKey="TWTR">TWTR (NYSE)</Dropdown.Item>
                <Dropdown.Item eventKey="VTI">VTI (NYSEARCA)</Dropdown.Item>
            </DropdownButton>
            <label>Selected stock: {stockSymbol}</label>
            {isLoaded && stockData !== null ? (
                <div className="StockContainer">
                    <Stock stockData={stockData} />
                </div>
            ) : (
                <div className="StockContainer">
                    <h3>Loading! Please wait...</h3>
                </div>
            )}
        </div>
    );
}

export default StockTicker;