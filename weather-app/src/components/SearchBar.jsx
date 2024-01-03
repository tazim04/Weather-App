import { useState, useEffect } from 'react'

function SearchBar({setCity, setNewCity}) {

    const [location, setLocation] = new useState("");


    console.log(location);

    const enterLocation = (e) => {
      if (e.key === 'Enter') {
        let city = e.target.value;

        setNewCity(city);

        document.getElementById('LocationInput').value = '';
      }
    }

  return (
    <div>
      <div class="mb-3">
        <input
          type="text"
          className="form-control col-md-6"
          id="LocationInput"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={enterLocation}
        />
      </div>
    </div>
  );
}

export default SearchBar;
