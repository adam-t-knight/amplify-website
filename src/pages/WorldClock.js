import React, { Component } from "react";
import moment from "moment-timezone";

class WorldClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chicagoDate: moment().tz("America/Chicago").format('HH:mm:ss DD/MM/YYYY'),
            beijingDate: moment().tz("Asia/Shanghai").format('HH:mm:ss DD/MM/YYYY'),
            vancouverDate: moment().tz("America/Vancouver").format('HH:mm:ss DD/MM/YYYY'),
            copenhagenDate: moment().tz("Europe/Copenhagen").format('HH:mm:ss DD/MM/YYYY'),
            raleighDate: moment().tz("America/New_York").format('HH:mm:ss DD/MM/YYYY')
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
            chicagoDate: moment().tz("America/Chicago").format('HH:mm:ss DD/MM/YYYY'),
            beijingDate: moment().tz("Asia/Shanghai").format('HH:mm:ss DD/MM/YYYY'),
            vancouverDate: moment().tz("America/Vancouver").format('HH:mm:ss DD/MM/YYYY'),
            copenhagenDate: moment().tz("Europe/Copenhagen").format('HH:mm:ss DD/MM/YYYY'),
            raleighDate: moment().tz("America/New_York").format('HH:mm:ss DD/MM/YYYY')
        });
    }

    render() {
        return (
            <div>
                <h1>World Clock</h1>
                <h2>Vancouver, CA: {this.state.vancouverDate.toString()}</h2>
                <h2>Beijing, CN: {this.state.beijingDate.toString()}</h2>
                <h2>Copenhagen, DK: {this.state.copenhagenDate.toString()}</h2>
                <h2>Chicago, US: {this.state.chicagoDate.toString()}</h2>                
                <h2>Raleigh, US: {this.state.raleighDate.toString()}</h2>
            </div>
        );
      }
}

export default WorldClock;