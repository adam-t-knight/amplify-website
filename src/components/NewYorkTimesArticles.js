import '../assets/css/NewYorkTimesArticles.css';

function NewYorkTimesArticles({articles}) {

    return (
        <div id="NytArticles" className="table-responsive">
            <table id="NytArticlesTable" className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            #
                        </th>
                        <th scope="col">
                            Article
                        </th>
                        <th scope="col">
                            Abstract
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles && articles.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><a href={item.url}>{item.title}</a></td>
                                <td>{item.abstract}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
    
}

export default NewYorkTimesArticles;