import React, { useState } from "react";
import hogs from "../porkers_data"; 
import HogTile from "../HogTile";
import FilterSort from "../FilterSort";
import NewHogForm from "../NewHogForm";
import Nav from "../components/Nav";
import 'semantic-ui-css/semantic.min.css';
import '../index.css'

function App() {
  const [hogData, setHogData] = useState(hogs);
  const [filterGreased, setFilterGreased] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [hiddenHogs, setHiddenHogs] = useState([]);

  const getVisibleHogs = () => {
    let filteredHogs = hogData;

    if (filterGreased) {
      filteredHogs = filteredHogs.filter((hog) => hog.greased);
    }

    if (sortType === "name") {
      filteredHogs = filteredHogs.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "weight") {
      filteredHogs = filteredHogs.sort((a, b) => a.weight - b.weight);
    }

    return filteredHogs.filter((hog) => !hiddenHogs.includes(hog.name));
  };

  const addNewHog = (newHog) => {
    setHogData([...hogData, newHog]);
  };

  const hideHog = (hogName) => {
    setHiddenHogs([...hiddenHogs, hogName]);
  };

  return (
    <div className="App">
      <Nav />

      <h1>Porker App</h1>

      <FilterSort
        filterGreased={filterGreased}
        setFilterGreased={setFilterGreased}
        setSortType={setSortType}
      />

      <NewHogForm addNewHog={addNewHog} />

      {/* Parent container with the required semantic UI grid classes */}
      {/* <div className="ui grid container">
        {getVisibleHogs().map((hog) => (
          <HogTile key={hog.name} hog={hog} hideHog={hideHog} />
        ))}
      </div> */}
      <div className="ui grid container">
  {getVisibleHogs().map((hog) => (
    <div className="ui eight wide column" key={hog.name}>
      <HogTile hog={hog} hideHog={hideHog} />
    </div>
  ))}
</div>

    </div>
  );
}

export default App;
