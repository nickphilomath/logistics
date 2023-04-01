import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import TrailerForm from "./TrailerForm";
import TrailersTable from "./TrailersTable";
import TrailerLogs from "./TrailerLogs";
import Loading from "../../common/Loading";
import Switch from "../../common/Switch";
import OptionsBar from "../../common/OptionsBar";
import { ASSETS_URL } from "../../constants/constants";
import "./Assets.css";

const Assets = () => {
  const request = useRequest(ASSETS_URL + "trailers/");
  const locationRequest = useRequest(ASSETS_URL + "trailers/location");
  const [searchParams, setSearchParams] = useSearchParams();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [vehicleFormOpen, setVehicleFormOpen] = useState(false);
  const [trailerFormOpen, setTrailerFormOpen] = useState(false);
  const [trailerLogOpen, setTrailerLogOpen] = useState(false);
  const [log, setLog] = useState({});
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  useEffect(() => {
    request.get();
    locationRequest.get();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRefresh) {
        if (searchParams.get("view") == 1) locationRequest.get();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const closeForm = ({ reload }) => {
    setVehicleFormOpen(false);
    setTrailerFormOpen(false);
    setTrailerLogOpen(false);
    if (reload) {
      request.get();
    }
  };

  const handleEdit = (handle) => {
    setEdit(handle);
    setMethod("PUT");
    if (searchParams.get("view") == 0) setVehicleFormOpen(true);
    if (searchParams.get("view") == 1) setTrailerFormOpen(true);
  };

  const handleLog = (handle) => {
    setLog(handle);
    if (searchParams.get("view") == 1) setTrailerLogOpen(true);
  };

  const handleChange = ({ currentTarget: input }) => {
    setAutoRefresh(!autoRefresh);
  };

  return (
    <div className="container assets">
      <div className="row head">
        <h1>Assets</h1>
        <div className="head-buttons">
          <Switch value={autoRefresh} label="Auto refresh:" onChange={handleChange} />
          {searchParams.get("view") == 0 && (
            <button
              className="button"
              onClick={() => {
                setMethod("POST");
                setVehicleFormOpen(true);
              }}
            >
              Add vehicle
            </button>
          )}
          {searchParams.get("view") == 1 && (
            <button
              className="button"
              onClick={() => {
                setMethod("POST");
                setTrailerFormOpen(true);
              }}
            >
              Add trailer
            </button>
          )}
        </div>
      </div>
      <OptionsBar
        options={[
          { title: "Vehicles", link: "/assets?view=0", active: window.location.href.includes("view=0") },
          { title: "Trailers", link: "/assets?view=1", active: window.location.href.includes("view=1") },
        ]}
      />
      {searchParams.get("view") == 1 && (request.isLoading ? <Loading /> : <TrailersTable trailers={request.data} locations={locationRequest.data} handleEdit={handleEdit} handleLog={handleLog} />)}
      {searchParams.get("view") == 1 && trailerFormOpen && <TrailerForm closeForm={closeForm} method={method} edit={edit} />}
      {searchParams.get("view") == 1 && trailerLogOpen && <TrailerLogs close={closeForm} trailer={log} />}
    </div>
  );
};

export default Assets;
