import React from "react";
import '../assets/css/NewYorkTimesArticle.css';

class NewYorkTimesArticle extends React.Component {

    render() {
        return(
            <table id="NytTable">
                <thead>
                    <tr>
                        <th>
                            Article #
                        </th>
                        <th>
                            Abstract
                        </th>
                        <th>
                            Byline
                        </th>
                        <th>
                            Created date
                        </th>
                        <th>
                            Published date
                        </th>
                        <th>
                            Section
                        </th>
                        <th>
                            Title and link
                        </th>
                        <th>
                            Updated date
                        </th>
                        <th>
                            Subsection
                        </th>
                        <th>
                            Des facet
                        </th>
                        <th>
                            Geo facet
                        </th>
{/*                         <th>
                            Multimedia
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.articles.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.abstract}</td>
                                <td>{item.byline}</td>
                                <td>{item.created_date}</td>
                                <td>{item.published_date}</td>
                                <td>{item.section}</td>
                                <td><a href={item.url}>{item.title}</a></td>
                                <td>{item.updated_date}</td>
                                <td>{item.subsection}</td>
                                <td>
                                    {
                                        item.des_facet && item.des_facet.map((dfacet, dindex) => (
                                            <p key={dindex}>{dfacet}</p>
                                        ))                                
                                    }
                                </td>
                                <td>
                                    {
                                        item.geo_facet && item.geo_facet.map((gfacet, gindex) => (
                                            <p key={gindex}>{gfacet}</p>
                                        ))                                
                                    }
                                </td>
{/*                                 {
                                    item.multimedia && item.multimedia.map((media, mindex) => (
                                        <td key={mindex}>
                                            <img src={media.url} alt={media.caption}/>
                                            {media.caption}
                                        </td>
                                    ))                                
                                } */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    
}

export default NewYorkTimesArticle;