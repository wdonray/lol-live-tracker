import React from "react";
import "../style/HomeStyle.css";
import SearchForm from "./helpers/SearchForm"

function Home() {
  return (
    <div className={"centerContainer"}>
      <div>
        <h1>LOL Live Tracker</h1>
        <p onClick={() => window.open("https://www.donrayxwilliams.com/")}>
          Created by Donray Williams
        </p>
      </div>
      <SearchForm header={false}/>
    </div>
  );
}

export default (Home);
