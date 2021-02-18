import React from "react";
import styled from "styled-components";

const TabContaniner = styled.div`
margin: 10px;

  height: 300px;
  width: 400px;
`;

const TabInfo = ({ location: { state } }) => {

    if (typeof state === "undefined") {
        return (<TabContaniner>
            <h2>Select Tab</h2>
        </TabContaniner>)
    }
    const { info } = state;
    return (
        <TabContaniner>
            {info && info.length > 0 && info.map((country) => (<h3>{country.name}</h3>))}
        </TabContaniner>
    )
};

export default TabInfo;