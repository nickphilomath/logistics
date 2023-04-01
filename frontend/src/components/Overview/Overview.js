import { useMemo } from "react";
import Map from "../Map/Map";
import "./Overview.css";

const Overview = () => {
  return (
    <div className="assets">
      <Map />
    </div>
  );
};

export default Overview;

// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// const Overview = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyCxEmDuIktygNt0OBZVZRd9jRFP7bIaFvw", // "AIzaSyCxEmDuIktygNt0OBZVZRd9jRFP7bIaFvw", //2zcy50OjMzfHMuZTpsfHAudjpvZmYscy50OjM3fHAudjpvZmYscy50OjJ8cy5lOmwudHxwLnY6b2Zm
//   });
//   const center = useMemo(() => ({ lat: 40.77185, lng: -73.973587 }), []);
//   return (
//     <div className="assets">
//       {isLoaded ? (
//         <GoogleMap center={center} zoom={10} mapContainerClassName="assets-map">
//           <Marker position={{ lat: 40.77185, lng: -73.943587 }} />
//         </GoogleMap>
//       ) : (
//         <Loading />
//       )}
//     </div>
//   );
// };
