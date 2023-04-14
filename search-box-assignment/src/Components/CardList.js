import React, { useState, useEffect } from 'react';

export default function CardList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedCard, setHighlightedCard] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
      .then(response => response.json())
      .then(data => {
        setData(data.items);
        setIsFetching(false)});
      // .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data + "testtttt");
      const filtered = data.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatch || descriptionMatch;
      });
      setFilteredData(filtered);
    }
  }, [data, searchQuery]);

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleCardMouseOver(index) {
    setHighlightedCard(index);
  }

  function handleCardKeyDown(event, index) {
    if (event.key === 'ArrowUp' && highlightedCard > 0) {
      setHighlightedCard(highlightedCard - 1);
    } else if (event.key === 'ArrowDown' && highlightedCard < filteredData.length - 1) {
      setHighlightedCard(highlightedCard + 1);
    }
  }

  return (
    <div>
      {isFetching && <p>Loading data...</p>}
      {!isFetching && (
        <>
        <input type="text" value={searchQuery} onChange={handleSearchChange} />
        {filteredData.length === 0 && (
        <div className="card empty-card">
          No results found.
        </div>
         )}
        
     

      {filteredData.map((item, index) => (
        <div
          className={`card ${highlightedCard === index ? 'highlighted' : ''}`}
          key={item.id}
          onMouseOver={() => handleCardMouseOver(index)}
          onKeyDown={event => handleCardKeyDown(event, index)}
        >
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          {searchQuery && (
            <p>{searchQuery} found in items</p>
          )}
        </div>
      ))}
      </>
      )}
    </div>
  );
}
