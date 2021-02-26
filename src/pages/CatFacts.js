import { useState, useEffect } from "react";

const catFactsUrl = "https://cat-fact.herokuapp.com/facts";

function CatFacts() {
    const [catFactsData, setCatFactsData] = useState([]);

    useEffect(() => {
        getCatFactsWithFetch();
    }, []);

    const getCatFactsWithFetch = async () => {
        const response = await fetch(catFactsUrl);
        const jsonData = await response.json();
        setCatFactsData(jsonData);
    };

    return (
        <div className="CatFacts">
            <h1>Cat Facts</h1>
            <h2>Random cat facts from {catFactsUrl}:</h2>
            <ul>
                {catFactsData.map((item, index) => (
                    <li key={index}>
                        Index: {index}<br/>
                        Verified: {item.status.verified}<br/>
                        sentCount: {item.status.sentCount}<br/>
                        feedback: {item.status.feedback}<br/>
                        type: {item.type}<br/>
                        user: {item.user}<br/>
                        text: {item.text}<br/>
                        __v: {item.__v}<br/>
                        source: {item.source}<br/>
                        createdAt: {item.createdAt}<br/>
                        used: {item.used}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CatFacts;