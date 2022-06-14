import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Loader } from "@googlemaps/js-api-loader";

//let center = new google.maps.LatLng(34.052235, -118.243683);
const loader = new Loader({
  apiKey: process.env.REACT_APP_MAP_KEY,
  version: "weekly",
  libraries: ["places"],
});
let containerStyle = {
  height: "400px",
  width: "100%",
};
let map;
let infowindow;
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new window.google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  window.google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

function GoogleMap(props) {
  const { place, setPlace } = props;
  const [query, setQuery] = useState("");
  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  const ref = useRef();

  const reDraw = (e) => {
    e.preventDefault();
    containerStyle = { height: "400px" };
    loader.load().then((google) => {
      map = new google.maps.Map(ref.current, {
        center: new google.maps.LatLng(34.052235, -118.243683),
        zoom: 10,
      });
      infowindow = new google.maps.InfoWindow();
      const request = {
        query: query,
        fields: ["name", "geometry", "formatted_address"],
      };
      const service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results, stat) => {
        if (stat === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);

            console.log(results[i]);
          }
          setPlace(results[0].formatted_address);
          map.setCenter(results[0].geometry.location);
        } else {
          console.log("map query error");
        }
      });
    });
  };
  return (
    <>
      <Form>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={query}
            name="query"
            onChange={changeHandler}
          />
          <button onClick={reDraw}>search</button>
        </div>
        <div ref={ref} id="map" style={containerStyle} />
        <Form.Label>Place:</Form.Label>
        <Form.Control type="text" value={place} name="place" readOnly />
      </Form>
    </>
  );
}

export default GoogleMap;
