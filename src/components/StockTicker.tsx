import { useState, useEffect, ChangeEvent } from "react";
import { API } from 'aws-amplify';
import Stock from './Stock';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../assets/css/StockTicker.css';

function StockTicker() {
    const [stockSymbol, setStockSymbol] = useState<string>("GME");
    const [stockData, setStockData] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getStockWithAPI(stockSymbol);
    }, [stockSymbol]);

    const getStockWithAPI = async (stockSymbol : string) => {
        setIsLoading(true);
        const stockData = await API.get('ExternalAPIs', '/GetStock?symbol=' + stockSymbol, '');
        setStockData(stockData);
        setIsLoading(false);
    };

    function selectStock(stockSymbol : string | null) {
        if(stockSymbol) {
            setStockSymbol(stockSymbol);
        }
    }

    return (
        <div className="StockTicker">
            <h1>Stock Ticker</h1>
            <div className="StockContainer">
                
                <DropdownButton
                    alignRight
                    title="Stock selector"
                    id="dropdown-menu-align-right"
                    onSelect={e => selectStock(e)}
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