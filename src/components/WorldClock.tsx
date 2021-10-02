import { useState, useEffect } from 'react';
import moment from 'moment';
import '../assets/css/WorldClock.css';

const DATE_FORMAT = 'ddd, DD MMM ';
const TIME_FORMAT = 'HH:mm:ss';

/**
 * Fetches weather data based on symbols selected and passes them to the Stock component to be displayed.
 */
function WorldClock() {
  const [date, setDate] = useState(moment());

  /**
   * Sets the date variable to the moment when the function is called.
   */
  function tick() {
    setDate(moment());
  }

  /**
   * Sets a timer that ends after 1000 ticks. Calls tick function to update the current date/time.
   */
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <div id="WorldClock">
      <h2>World Clock</h2>
      <table id="WorldClockTable">
        <thead>
          <tr>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Date</th>
            <th scope="col">Local Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vienna</td>
            <td>AT</td>
            <td>{date.tz('Europe/Vienna').format(DATE_FORMAT)}</td>
            <td>{date.tz('Europe/Vienna').format(TIME_FORMAT)}</td>
          </tr>
          <tr>
            <td>Vancouver</td>
            <td>CA</td>
            <td>
              {date.tz('America/Vancouver').format(DATE_FORMAT)}
            </td>
            <td>
              {date.tz('America/Vancouver').format(TIME_FORMAT)}
            </td>
          </tr>
          <tr>
            <td>Berlin</td>
            <td>DE</td>
            <td>{date.tz('Europe/Berlin').format(DATE_FORMAT)}</td>
            <td>{date.tz('Europe/Berlin').format(TIME_FORMAT)}</td>
          </tr>
          <tr>
            <td>Copenhagen</td>
            <td>DK</td>
            <td>
              {date.tz('Europe/Copenhagen').format(DATE_FORMAT)}
            </td>
            <td>
              {date.tz('Europe/Copenhagen').format(TIME_FORMAT)}
            </td>
          </tr>
          <tr>
            <td>Stockholm</td>
            <td>SE</td>
            <td>{date.tz('Europe/Stockholm').format(DATE_FORMAT)}</td>
            <td>{date.tz('Europe/Stockholm').format(TIME_FORMAT)}</td>
          </tr>
          <tr>
            <td>Madison</td>
            <td>US</td>
            <td>{date.tz('America/Chicago').format(DATE_FORMAT)}</td>
            <td>{date.tz('America/Chicago').format(TIME_FORMAT)}</td>
          </tr>
          <tr>
            <td>Raleigh</td>
            <td>US</td>
            <td>{date.tz('America/New_York').format(DATE_FORMAT)}</td>
            <td>{date.tz('America/New_York').format(TIME_FORMAT)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WorldClock;
