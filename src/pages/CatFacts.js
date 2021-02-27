import { useState, useEffect } from "react";
import '../assets/css/CatFacts.css';

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
        <div>
            <h1>Cat Facts</h1>
            <h2>Random cat facts from {catFactsUrl}:</h2>
            <table id="CatFactsTable">
                <thead>
                    <tr>
                        <th>
                            Index
                        </th>
                        <th>
                            Text
                        </th>
                        <th>
                            Created Date
                        </th>
                        <th>
                            User
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
                            <td>
                                {item.createdAt}
                            </td>
                            <td>
                                {item.user}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CatFacts;