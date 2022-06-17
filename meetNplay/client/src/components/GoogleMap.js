import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Loader } from "@googlemaps/js-api-loader";

//google API loader
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
  const { place, setPlace, showSearchBar } = props;
  const [query, setQuery] = useState(place ? place : "");
  const [queryIsDone, setQueryIsDone] = useState(place ? true : false);
  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  const ref = useRef();
  const mapDraw = () => {
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
    setQueryIsDone(false);
  };
  useEffect(() => {
    console.log(query);
    console.log({ place });
    if (query && queryIsDone) {
      mapDraw();
    }
  }, [query, place]);

  const reDraw = (e) => {
    e.preventDefault();
    mapDraw();
  };
  return (
    <>
      <Form>
        <div className="d-flex">
          {showSearchBar && (
            <>
              <Form.Control
                type="text"
                value={query}
                name="query"
                onChange={changeHandler}
              />
              <Button variant="success" onClick={reDraw}>
                search
              </Button>
            </>
          )}
        </div>
        <div ref={ref} id="map" style={containerStyle} />
      </Form>
    </>
  );
}

export default GoogleMap;
