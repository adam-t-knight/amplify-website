import React, { Component } from "react";
import moment from "moment-timezone";
import '../assets/css/WorldClock.css';

class WorldClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: moment()
        });
    }

    render() {
        return (
            <div>
                <h1>World Clock</h1>
                <table id="worldClockTable">
                    <tbody>
                        <tr>
                            <th>
                                City
                            </th>
                            <th>
                                Country
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Time
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Vancouver
                            </td>
                            <td>
                                CA
                            </td>
                            <td>
                                {this.state.date.tz("America/Vancouver").format('dddd, MMMM Do')}
                            </td>
                            <td>
                                {this.state.date.tz("America/Vancouver").format('HH:mm:ss')}
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
                                {this.state.date.tz("Asia/Shanghai").format('dddd, MMMM Do')}
                            </td>
                            <td>
                                {this.state.date.tz("Asia/Shanghai").format('HH:mm:ss')}
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
                                {this.state.date.tz("Europe/Copenhagen").format('dddd, MMMM Do')}
                            </td>
                            <td>
                                {this.state.date.tz("Europe/Copenhagen").format('HH:mm:ss')}
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
                                {this.state.date.tz("America/Chicago").format('dddd, MMMM Do')}
                            </td>
                            <td>
                                {this.state.date.tz("America/Chicago").format('HH:mm:ss')}
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
                                {this.state.date.tz("America/New_York").format('dddd, MMMM Do')}
                            </td>
                            <td>
                                {this.state.date.tz("America/New_York").format('HH:mm:ss')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
      }
}

export default WorldClock;