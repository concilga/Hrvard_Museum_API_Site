import React from 'react';

import { fetchQueryResultsFromURL } from '../api';

const Preview = (props) => {

  const {setSearchResults, setFeaturedResult, setIsLoading} = props;
  const {info, records} = props.searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <aside id="preview">
    <header className="pagination">
      {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
      <button 
        disabled={!info.prev} 
        className="previous"
        onClick={async() => {await fetchPage(info.prev)}}>Previous</button>
      {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
      <button
        disabled={!info.next}
        className="next"
        onClick={async() => {await fetchPage(info.next)}}>Next</button>
    </header>
    <section className="results">
      {
         records.map(record => {
          return (
            <div  
              key={ record.id }
              className="object-preview"
              onClick={(event) => {
                event.preventDefault();
                setFeaturedResult(record);
              }}>
              { record.primaryimageurl ? (
                  <img src={ record.primaryimageurl } alt={ record.description } />
                ) : (
                  null
                )
              }
              {
                record.title ? (
                  <h3>{ record.title }</h3>
                ) : (
                  <h3>MISSING INFO</h3>
                )
              }
            </div>
          );
        })
      }
    </section>
  </aside>
}

export default Preview;