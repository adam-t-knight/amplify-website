import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import Stock from './Stock';
import Emoji from './Emoji';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../assets/css/StockTicker.css';

function StockTicker() {
    const [stockSymbol, setStockSymbol] = useState("GME");
    const [stockData, setStockData] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStockWithAPI(stockSymbol);
    }, [stockSymbol]);

    const getStockWithAPI = async () => {
        console.log("Getting stock: " + stockSymbol);
        setIsLoading(true);
        const stockData = await API.get('ExternalAPIs', '/GetStock?symbol=' + stockSymbol, '');
        setStockData(stockData);
        setIsLoading(false);
    };

    return (
        <div className="StockTicker">
            <h1>Stock Ticker</h1>
            <div className="StockContainer">
                
                <DropdownButton
                    alignRight
                    title="Stock selector"
                    id="dropdown-menu-align-right"
                    onSelect={e => setStockSymbol(e)}
                >
                    <Dropdown.Item eventKey="GME">GME (XNYS)</Dropdown.Item>
                    <Dropdown.Item eventKey="AMC">AMC (XNYS)</Dropdown.Item>
                    <Dropdown.Item eventKey="NOK">NOK (XNYS)</Dropdown.Item>
                </DropdownButton>
                {isLoading ? (
                    <div id="StockLoadingMessage">
                        <h2>Loading! Please wait...</h2>
                    </div>
                ) : (
                    <Stock stockData={stockData} />
                )}
                
            </div>
        </div>
    );
}

export default StockTicker;