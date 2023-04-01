import "./Map.css";
import { useState, useRef, useEffect } from "react";

const Map = () => {
  const mapRef = useRef();
  const [location, setLocation] = useState({ x: 0.0, y: 0.0, z: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState([0, 0]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // const map = document.getElementById("map");

  // document.addEventListener(
  //   "mousedown",
  //   function (e) {
  //     setIsMouseDown(true);
  //     setOffset([mapRef.offsetLeft - e.clientX, mapRef.offsetTop - e.clientY]);
  //   },
  //   true
  // );

  // document.addEventListener(
  //   "mouseup",
  //   function () {
  //     setIsMouseDown(false);
  //   },
  //   true
  // );

  useEffect(() => {
    const handleMouseDown = () => {
      setIsMouseDown(true);
      console.log("mouse is down", isMouseDown);
    };
    if (mapRef && mapRef.current) mapRef.current.addEventListener("mousedown", handleMouseDown, false);

    return () => {
      if (mapRef && mapRef.current) mapRef.current.removeEventListener("mousedown", handleMouseDown, false);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isMouseDown) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
        // mapRef.style.left = mousePosition.x + offset[0] + "px";
        // mapRef.style.top = mousePosition.y + offset[1] + "px";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="map" ref={mapRef}>
      <div className="map-container" style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}>
        <div className="map-box" style={{ transform: "translate(-256px, -256px)" }}>
          <img draggable={false} alt="" src="http://127.0.0.1:8000/static/mapData/z1/map-0-0-1.jpg" className="map-image" />
        </div>
        <div className="map-box" style={{ transform: "translate(-256px, 0px)" }}>
          <img draggable={false} alt="" src="http://127.0.0.1:8000/static/mapData/z1/map-0-1-1.jpg" className="map-image" />
        </div>
        <div className="map-box" style={{ transform: "translate(0px, -256px)" }}>
          <img draggable={false} alt="" src="http://127.0.0.1:8000/static/mapData/z1/map-1-0-1.jpg" className="map-image" />
        </div>
        <div className="map-box" style={{ transform: "translate(0px, 0px)" }}>
          <img draggable={false} alt="" src="http://127.0.0.1:8000/static/mapData/z1/map-1-1-1.jpg" className="map-image" />
        </div>
      </div>
    </div>
  );
};

export default Map;
