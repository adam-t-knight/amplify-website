import React, { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import NewYorkTimesArticles from '../components/NewYorkTimesArticles';
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
            <h2>Loading! Please wait...</h2>
        </div>
    ) : (
        <div className="NewYorkTimes">
            <h1>New York Times</h1>
            <h2>Last updated: {moment(nytData.last_updated).tz("America/New_York").toString()}</h2>
            <h2>Number of results: {nytData.num_results}</h2>
            <h2>News section: {nytData.section}</h2>
            <NewYorkTimesArticles articles={nytData.results} />
        </div>
    );
}

export default NewYorkTimes;