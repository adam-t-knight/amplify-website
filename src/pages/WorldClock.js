import { useState, useEffect } from "react";
import moment from "moment-timezone";
import '../assets/css/WorldClock.css';

function WorldClock() {
    const [date, setDate] = useState(new moment());

    useEffect(() => {
        let timerID = setInterval( () => tick(), 1000 );
   
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setDate(new moment());
    }

    return (
        <div id="WorldClock">
            <h1>World Clock</h1>
            <table id="WorldClockTable">
                <thead>
                    <tr>
                        <th scope="col">
                            City
                        </th>
                        <th scope="col">
                            Country
                        </th>
                        <th scope="col">
                            Date
                        </th>
                        <th scope="col">
                            Local Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Vancouver
                        </td>
                        <td>
                            CA
                        </td>
                        <td>
                            {date.tz("America/Vancouver").format('dddd, MMMM Do')}
                        </td>
                        <td>
                            {date.tz("America/Vancouver").format('HH:mm:ss')}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Beijing
                        </td>
                        <td>
                            CN
                        </td>
                        <td>
                            {date.tz("Asia/Shanghai").format('dddd, MMMM Do')}
                        </td>
                        <td>
                            {date.tz("Asia/Shanghai").format('HH:mm:ss')}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Copenhagen
                        </td>
                        <td>
                            DK
                        </td>
                        <td>
                            {date.tz("Europe/Copenhagen").format('dddd, MMMM Do')}
                        </td>
                        <td>
                            {date.tz("Europe/Copenhagen").format('HH:mm:ss')}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Madison
                        </td>
                        <td>
                            US
                        </td>
                        <td>
                            {date.tz("America/Chicago").format('dddd, MMMM Do')}
                        </td>
                        <td>
                            {date.tz("America/Chicago").format('HH:mm:ss')}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Raleigh
                        </td>
                        <td>
                            US
                        </td>
                        <td>
                            {date.tz("America/New_York").format('dddd, MMMM Do')}
                        </td>
                        <td>
                            {date.tz("America/New_York").format('HH:mm:ss')}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WorldClock;