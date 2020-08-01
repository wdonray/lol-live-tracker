import React from "react";
import { connect } from "react-redux";

let mapState = (store) => {
  return {
    regionState: store.region,
    statsState: store.stats,
  };
};

function Stats({ regionState, statsState }) {

  let checkIfUnranked = () => {
    if (statsState.tier) {
      return `${statsState.tier} ${statsState.rank}`
    } else {
      return 'Unranked'
    }
  }

  if (statsState.loading) {
    return <div style={{ color: "white" }}>Loading...</div>
  }

  return (
    <div style={{ color: "white" }}>
      {statsState.id
        ? `${statsState.name} is ${checkIfUnranked()}`
        : "No user found"}
    </div>
  );
}

export default connect(mapState)(Stats);
