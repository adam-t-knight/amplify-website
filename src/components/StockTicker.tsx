import { useState, useEffect, ChangeEvent } from "react";
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
    volume: number
}

type stockData = Array<stock>

function StockTicker() {
    const [stockSymbol, setStockSymbol] = useState<string>("GME");
    const [stockData, setStockData] = useState<stockData>([]);
    const [isLoaded, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getStockWithAPI(stockSymbol);
    }, [stockSymbol]);

    const getStockWithAPI = async (stockSymbol : string) => {
        setIsLoading(false);
        const stockJson = await API.get('ExternalAPIs', '/GetStock?symbol=' + stockSymbol, '');
        setStockData(stockJson.data);
        setIsLoading(true);
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
                {isLoaded && stockData !== null ? (
                    <Stock stockData={stockData} />
                ) : (
                    <div id="StockLoadingMessage">
                        <h2>Loading! Please wait...</h2>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default StockTicker;