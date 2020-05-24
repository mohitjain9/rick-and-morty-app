import React, {useReducer, useState, useCallback, useEffect, useRef} from 'react';
import Head from 'next/head';
import CardList from '../Components/CardList';
import Filter from '../Components/Filter';
import FilterChips from '../Components/FilterChips';
import SearchInput from '../Components/SearchInput';
import filterReducer from '../Components/Filter/reducer.js';
import {getCharacters} from '../Services/Rest';

export default function Home(props) {
  const didMountRef = useRef(true);
  const [data, setData] = useState(props.data);
  const [speciesFilter, updateSpeciesFilter] = useReducer(filterReducer, []);
  const [genderFilter, updateGenderFilter] = useReducer(filterReducer, []);
  const [searchCharName, setSearchName] = useState('');
  const [isAsec, setSort] = useState(true);
  const toggleSort = useCallback(() => {
    setSort(!isAsec);
  });
  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false;
    } else {
      let queryString = '';
      let genderFilterText = !!genderFilter.length && 'gender=' + genderFilter.join('|');
      if (genderFilterText) {
        queryString += genderFilterText;
      }
      let speciesFilterText = !!speciesFilter.length && 'species=' + speciesFilter.join('|');
      if (speciesFilterText) {
        queryString += '&' + speciesFilterText;
      }
      if (searchCharName) {
        queryString += '&name=' + searchCharName;
      }

      getCharacters(queryString)
        .then(({data}) => {
          setData(data);
        })
        .catch(({response} = {}) => {
          if (response && response.status === 404) {
            setData({results: []});
          }
        });
    }
  }, [genderFilter, speciesFilter, searchCharName]);
  const removeFilter = useCallback((filter, value) => {
    if (filter === 'gender') {
      return updateGenderFilter({type: 'remove', data: value});
    } else if (filter === 'species') {
      return updateSpeciesFilter({type: 'remove', data: value});
    }
  });
  return (
    <>
      <Head>
        <title>Rick and Morty App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap" rel="stylesheet"></link>
      </Head>
      <header className="visually-hidden">
        <h1 aria-hidden="true">Rick and Morty App</h1>
      </header>
      <main className="flex main-container">
        <aside className="flex filter-section">
          <h2 className="filter-title">Filters</h2>
          <div className="flex filter-list">
            <Filter
              options={['Male', 'Female']}
              title="Gender"
              handleFilterChange={updateGenderFilter}
              values={genderFilter}
            />
            <Filter
              options={['Human', 'Alien']}
              title="Species"
              handleFilterChange={updateSpeciesFilter}
              isRadioType
              values={speciesFilter}
            />
          </div>
        </aside>
        <div className="section-left">
          <section className="search-section">
            <FilterChips filters={{gender: genderFilter, species: speciesFilter}} removeFilter={removeFilter} />
            <div className="flex search-row">
              <SearchInput title="Filter by Name" onSearch={setSearchName} />
              <button onClick={toggleSort} className="sort-button">
                Sorted by ID {isAsec ? <>&uarr;</> : <>&darr;</>}
              </button>
            </div>
          </section>
          <section className="caracterlist-section">
            <CardList data={isAsec ? data.results : data.results.slice().reverse()} />
          </section>
        </div>
      </main>

      <style jsx>{`
        .main-container {
          flex-direction: column;
        }
        .filter-section {
          width: 100%;
          flex-direction: column;
        }
        .filter-list {
          border-top: 2px solid #edebef;
          border-bottom: 2px solid #edebef;
        }
        .filter-title {
          padding: 10px;
        }

        .section-left {
          display: flex;
          flex-direction: column;
        }

        .search-section {
          padding: 0 10px;
        }

        .search-row {
          flex-direction: column;
          padding: 10px 0;
          flex: 1;
        }

        .sort-button {
          border: 1px solid #d4d5d9;
          margin-top: 10px;
          font-size: 14px;
          color: #333;
          background-color: #fff;
          border-color: #ccc;
        }

        .caracterlist-section {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          max-width: 100%;
        }

        @media only screen and (min-width: 768px) {
          .main-container {
            flex-direction: row;
          }
          .filter-section {
            border-right: 2px solid #edebef;
          }

          .filter-title {
            padding: 10px;
            border-bottom: 2px solid #edebef;
          }
          .filter-list {
            border: none;
            flex-direction: column;
          }
          .section-left {
            flex: 4;
          }
          .search-section {
            padding: 10px;
          }
          .sort-button {
            margin: 0;
          }
          .caracterlist-section {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
          }
          .search-row {
            justify-content: space-between;
            padding: 10px 0;
            flex-direction: row;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0 auto;
          font-family: Balsamiq Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .visually-hidden {
          clip: rect(0 0 0 0);
          height: 1px;
          width: 1px;
          margin: -1px;
          padding: 0;
          border: 0;
          overflow: hidden;
          position: absolute;
        }
        .flex {
          display: flex;
          flex: 1;
        }

        .flex-column {
          display: flex;
          flex: 1;
          flex-direction: column;
        }

        .inline-flex-column {
          display: inline-flex;
          flex-direction: column;
        }

        .flex-center {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const {data} = await getCharacters();

  return {
    props: {
      data: data,
    },
  };
}
