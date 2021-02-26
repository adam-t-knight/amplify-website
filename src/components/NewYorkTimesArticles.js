import React from "react";
import '../assets/css/NewYorkTimesArticles.css';

class NewYorkTimesArticles extends React.Component {

    render() {
        return(
            <table id="NytTable">
                <thead>
                    <tr>
                        <th>
                            Article #
                        </th>
                        <th>
                            Title and link
                        </th>
                        <th>
                            Abstract
                        </th>
                        <th>
                            Byline
                        </th>
                        <th>
                            Published date
                        </th>
                        <th>
                            Updated date
                        </th>
                        <th>
                            Section
                        </th>
                        <th>
                            Subsection
                        </th>
                        <th>
                            Location(s)
                        </th>
                        <th>
                            Tag(s)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.articles.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><a href={item.url}>{item.title}</a></td>
                                <td>{item.abstract}</td>
                                <td>{item.byline}</td>
                                <td>{item.published_date}</td>
                                <td>{item.updated_date}</td>
                                <td>{item.section}</td>
                                <td>{item.subsection}</td>
                                <td>
                                    <ul>
                                        {
                                            item.geo_facet && item.geo_facet.map((gfacet, gindex) => (
                                                <li key={gindex}>{gfacet}</li>
                                            ))      
                                        }                                   
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {
                                            item.des_facet && item.des_facet.map((dfacet, dindex) => (
                                                <li key={dindex}>{dfacet}</li>
                                            ))                                
                                        }
                                    </ul>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    
}

export default NewYorkTimesArticles;