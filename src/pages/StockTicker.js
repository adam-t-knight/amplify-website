import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import Stock from '../components/Stock';
import Emoji from '../components/Emoji';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import moment from "moment-timezone";
import '../assets/css/StockTicker.css';

function StockTicker() {
    const [stockSymbol, setStockSymbol] = useState("GME");
    const [stockData, setStockData] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStockWithFetch();
    }, []);

    const getStockWithFetch = async () => {
        console.log("Getting stock: " + stockSymbol);
        setIsLoading(true);
        const stockData = await API.get('ExternalAPIs', '/GetStock?symbol=' + stockSymbol, '');
        console.log(stockData);
        setStockData(stockData);
        setIsLoading(false);
    };

    const handleSelect = (e) => {
      console.log("Attempting to set stock symbol: " + e);
      setStockSymbol(e);
      console.log("Stock symbol: " + stockSymbol)
      getStockWithFetch();
    }

    return isLoading ? (
        <div className="StockTicker">
            <h1><Emoji symbol="💎🙌" label="diamond hands left"/>Stonk Ticker<Emoji symbol="🙌💎" label="diamond hands right"/></h1>
            <div className="StockContainer">
                <h2>Loading! Please wait...</h2>
                <DropdownButton
                    alignRight
                    title="Dropdown right"
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                >
                    <Dropdown.Item eventKey="GME">GME (XNYS)</Dropdown.Item>
                    <Dropdown.Item eventKey="AMC">AMC (XNYS)</Dropdown.Item>
                </DropdownButton>
                <h4>You selected {stockSymbol}</h4>                
                <Stock stockData={stockData} />
            </div>
        </div>
    ) : (
        <div className="StockTicker">
            <h1><Emoji symbol="💎🙌" label="diamond hands left"/>Stonk Ticker<Emoji symbol="🙌💎" label="diamond hands right"/></h1>
            <div className="StockContainer">
                <DropdownButton
                    alignRight
                    title="Dropdown right"
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                >
                    <Dropdown.Item eventKey="GME">GME (XNYS)</Dropdown.Item>
                    <Dropdown.Item eventKey="AMC">AMC (XNYS)</Dropdown.Item>
                </DropdownButton>
                <h4>You selected {stockSymbol}</h4>                
                <Stock stockData={stockData} />
            </div>
        </div>
    );
}

export default StockTicker;