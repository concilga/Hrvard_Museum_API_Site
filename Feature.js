import React, { Fragment } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = (props) => {
    const {setIsLoading, setSearchResults, searchTerm, searchValue} = props;

    return (
        <span className="content">
            <a href="#" onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);

                try {
                    console.log(searchTerm);
                    const result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                    setSearchResults(result);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }}>{searchTerm}</a>
        </span>
    )   
}

const Feature = (props) => {
    const {setIsLoading, setSearchResults, featuredResult} = props;
    console.log(featuredResult);

    const {
        title, 
        dated,
        images,
        primaryimageurl,
        description,
        culture,
        style,
        technique,
        medium,
        dimensions,
        people,
        department,
        division,
        contact,
        creditline,
    } = featuredResult;

    const descriptionArr = 
        [{name: "Desription", value: description, search: false}, {name: "Culture", value: culture, search: true}, 
         {name: "Style", value: style, search: false}, {name: "Technique", value: technique, search: true}, 
         {name: "Medium", value: medium, search: true}, {name: "Dimensions", value: dimensions, search: false},
         {name: "Person", value: people, search: true}, {name: "Department", value: department, search: false}, 
         {name: "Divison", value: division, search: false}, {name: "Contact", value: contact, search: false}, 
         {name: "Credit Line", value: creditline, search: false}];
    
    return (
        <main id="feature"> 
            {featuredResult.title ? (
                <div className="object-feature">
                        <header>
                            <h3>{title}</h3>
                            <h4>{dated}</h4>
                        </header>
                        <section className="facts">
                            {descriptionArr.map(item => {
                                if(item.value) {
                                    if(item.value !== people) {
                                        if(item.search) {
                                            return(
                                                <>
                                                    <span className="title">{item.name}</span>
                                                    <Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults}
                                                                searchTerm={item.value} searchValue={item.value} />
                                                </>
                                            )
                                        } else {
                                            return(
                                                <>
                                                    <span className="title">{item.name}</span>
                                                    <span className="content">{item.value}</span>
                                                </>
                                            )
                                        }
                                    } 
                                    if(item.value === people) {
                                        return item.value.map(person => {
                                            return(
                                                <>
                                                    <span className="title">Person</span>
                                                    <Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults}
                                                                searchTerm={person.displayname} searchValue={person.name} />
                                                </>
                                            )
                                        })
                                    }
                                }
                            })
                        }
                        </section>
                        <section className="photos">
                            {images ? (
                                featuredResult.images.map(image => {
                                    return(
                                        <img key={image.imageid}src={image.baseimageurl} alt="none"/>
                                    )
                                })
                            ):(
                                <img src={primaryimageurl} alt="https://quotefancy.com/media/wallpaper/1600x900/3233413-Arturo-Alfonso-Schomburg-Quote-We-need-the-historian-and.jpg"/>
                            )}
                        </section>
                    </div>
            ) : (
                null
            )}
        </main>
    )
}

export default Feature;