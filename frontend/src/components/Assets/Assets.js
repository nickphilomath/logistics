import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loading from "../../common/Loading";
import "./Assets.css";

const Assets = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCxEmDuIktygNt0OBZVZRd9jRFP7bIaFvw", // "AIzaSyCxEmDuIktygNt0OBZVZRd9jRFP7bIaFvw", //
  });
  const center = useMemo(() => ({ lat: 40.77185, lng: -73.973587 }), []);
  return (
    <div className="assets">
      {isLoaded ? (
        <GoogleMap center={center} zoom={10} mapContainerClassName="assets-map">
          <Marker position={{ lat: 40.77185, lng: -73.943587 }} />
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Assets;
