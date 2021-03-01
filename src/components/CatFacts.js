import { useState, useEffect } from "react";
import '../assets/css/CatFacts.css';

const catFactsUrl = "https://cat-fact.herokuapp.com/facts";

function CatFacts() {
    const [catFactsData, setCatFactsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCatFactsWithFetch();
    }, []);

    const getCatFactsWithFetch = async () => {
        const response = await fetch(catFactsUrl);
        const jsonData = await response.json();
        setCatFactsData(jsonData);
        setIsLoading(false);
    };

    return isLoading ? (
        <div className="CatFacts">
            <h1>Cat Facts</h1>
            <div className="CatFactsContainer">
                <h2>Loading! Please wait...</h2>
            </div>
        </div>
    ) : (
        <div className="CatFacts">
            <h1>Cat Facts</h1>
            <div className="CatFactsContainer">
                <h2>Random cat facts from <a href={catFactsUrl}>The Cat Facts API</a>:</h2>
                <table id="CatFactsTable">
                    <thead>
                        <tr>
                            <th>
                                Index
                            </th>
                            <th>
                                Text
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {catFactsData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {index}
                                </td>
                                <td>
                                    {item.text}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CatFacts;