import React from "react";

class NewYorkTimesArticle extends React.Component {

    render() {
        return(
            <ul>
                {this.props.articles.map((item, index) => (
                    <li key={index}>
                        Article #{index + 1}<br/>
                        Abstract: {item.abstract}<br/>
                        Byline: {item.byline}<br/>
                        Created date: {item.created_date}<br/>
                        Published date: {item.published_date}<br/>
                        Section: {item.section}<br/>
                        Title: {item.title}<br/>
                        Updated date: {item.updated_date}<br/>
                        URL: {item.url}<br/>
                        Subsection: {item.subsection}<br/>
                        Des facet:
                        {
                            item.des_facet.map((dfacet) => (
                                <p>{dfacet}</p>
                            ))
                        }<br/>
                        Geo facet:
                        {
                            item.geo_facet.map((gfacet) => (
                                <p>{gfacet}</p>
                            ))
                        }<br/>
                        Multimedia:
                        {
                            item.multimedia.map((media) => (
                                <p>
                                    <img src={media.url} alt={media.caption}/>
                                    {media.caption}
                                </p>
                            ))
                        }<br/>
                    </li>
                ))}
            </ul>
        )
    }
    
}

export default NewYorkTimesArticle;