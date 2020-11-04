import React from "react";
import styled from "styled-components";

export default function Map({ location, zoomLevel }) {
  return (
    <MapContainer>
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=${zoomLevel}&size=600x300&maptype=roadmap
          &markers=color:blue%7Clabel:S%7C${location.latitude},${location.longitude}
          &key=${process.env.REACT_APP_GOOGLE_API}`}
        alt="google map"
      />
    </MapContainer>
  );
}

const MapContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 300px;
`;
