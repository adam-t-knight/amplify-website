import '../assets/css/NewYorkTimesArticles.css';

type Multimedia = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};

type Article = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  itemType: string;
  updatedDate: string;
  createdDate: string;
  publishedDate: string;
  materialTypeFacet: string;
  kicker: string;
  desFacet: Array<string>;
  orgFacet: Array<string>;
  perFacet: Array<string>;
  geoFacet: Array<string>;
  multimedia: Multimedia;
  shortUrl: string;
};

type Articles = Array<Article>;

/**
 * The NewYorkTimesArticles subcomponent of the main NewYorkTimes component. Displayes the articles passed to it.
 */
function NewYorkTimesArticles(props: { articles: Articles }) {
  const { articles } = props;

  return (
    <div id="NytArticles" className="table-responsive">
      <table id="NytArticlesTable" className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Article</th>
            <th scope="col">Abstract</th>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles.map((item, index) => (
              <tr key={item.url}>
                <td>{index + 1}</td>
                <td>
                  <a href={item.url}>{item.title}</a>
                </td>
                <td>{item.abstract}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewYorkTimesArticles;
