import React, { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import NewYorkTimesArticles from './NewYorkTimesArticles';
import moment from "moment-timezone";
import '../assets/css/NewYorkTimes.css';

function NewYorkTimes() {
    const [nytData, setNytData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNewYorkTimesWithFetch();
    }, []);

    const getNewYorkTimesWithFetch = async () => {
        const data = await API.get('ExternalAPIs', '/GetNewYorkTimes', '');
        setNytData(data);
        setIsLoading(false);
    };

    return isLoading ? (
        <div className="NewYorkTimes">
            <h1>New York Times</h1>
            <div className="nytContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    ) : (
        <div className="NewYorkTimes">
            <h1>New York Times</h1>
            <div className="nytContainer">
                <h2>Top articles on <a href="https://www.nytimes.com/">nytimes.com</a> {nytData.section}</h2>
                <h2>Last updated {moment(nytData.last_updated).tz("America/New_York").format('MM-DD-YYYY HH:mm').toString()}</h2>
                <h2>{nytData.num_results} results</h2>
                <NewYorkTimesArticles articles={nytData.results} />
            </div>
        </div>
    );
}

export default NewYorkTimes;