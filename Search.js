import React, { useEffect, useState } from 'react';

import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
 
  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState('');
  const [century, setCentury] = useState('any');
  const [classification, setClassification] = useState('any');


  useEffect(() => {
    Promise.all([fetchAllCenturies(), fetchAllClassifications()])
    .then((response) => {
      setCenturyList(response[0]);
      setClassificationList(response[1]);
    }).catch(error => {
      console.error(error.message);
    })
  }, []);


  return <form id="search" onSubmit={async (event) => {
    event.preventDefault();
    props.setIsLoading(true);

    try {
      const response = await fetchQueryResults({century, classification, queryString})
      props.setSearchResults(response);
    } catch (error){
      console.error(error);
    } finally {
      props.setIsLoading(false);
    }
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={(e) => setQueryString(e.target.value)}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value={classification} 
        onChange={(e) => setClassification(e.target.value)}>
        <option value="any">Any</option>
        {
          classificationList.map(inputClassification => {
            return (
              <option key={inputClassification.id}>{inputClassification.name}</option>
            );
          })
        }
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
        name="century" 
        id="select-century"
        value={century} 
        onChange={(e) => setCentury(e.target.value)}>
        <option value="any">Any</option>
        {
          centuryList.map(inputCentury => {
            return (
              <option key={inputCentury.id}>{inputCentury.name}</option>
            );
          })
        }
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;