import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Stock from './Stock';
import '../assets/css/StockTicker.css';

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
 * Main Stock component. Fetches stocks based on symbols selected and passes them to the Stock component to be displayed.
 */
function StockTicker() {
  const [stockSymbol, setStockSymbol] = useState<string>('GME'); // initialized to GME to fetch a stock on load
  const [stockData, setStockData] = useState<Stocks>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  /**
   * Fetches stock data based on the inputted stock symbol.
   * @param {string} stockSymbol stock symbol of data to be fetched
   */
  const getStockWithAPI = async (selectedSymbol: string) => {
    setIsLoaded(false);
    const stockJson = await API.get(
      'ExternalAPIs',
      `/GetStock?symbol=${selectedSymbol}`,
      '',
    );
    setStockData(stockJson.data);
    setIsLoaded(true);
  };

  /**
   * Fetches stock symbol on change
   */
  useEffect(() => {
    getStockWithAPI(stockSymbol);
  }, [stockSymbol]);

  /**
   * Sets the stock symbol when the dropdown changes. If inputted value is null, no change is made.
   * @param {string} stockSymbol stock symbol to be set
   */
  function selectStock(selectedSymbol: string | null) {
    if (selectedSymbol) {
      setStockSymbol(selectedSymbol);
    }
  }

  return (
    <div id="StockTicker">
      <h2>Stock Ticker</h2>
      <DropdownButton
        alignRight
        title="Stock selector"
        id="dropdown-menu-align-right"
        onSelect={(e) => selectStock(e)}
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
        <Dropdown.Item eventKey="NVO">NVO (NYSE)</Dropdown.Item>
        <Dropdown.Item eventKey="TSLA">TSLA (NASDAQ)</Dropdown.Item>
        <Dropdown.Item eventKey="TWTR">TWTR (NYSE)</Dropdown.Item>
        <Dropdown.Item eventKey="VTI">VTI (NYSEARCA)</Dropdown.Item>
      </DropdownButton>
      <span>Selected stock: {stockSymbol}</span>
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
