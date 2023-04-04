import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import OptionsBar from "../../common/OptionsBar";

const Safety = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [log, setLog] = useState({});
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  return (
    <div className="container assets">
      <div className="row head">
        <h1>Safety</h1>
        <div className="head-buttons">
          {searchParams.get("view") == 0 && (
            <button
              className="button"
              onClick={() => {
                setMethod("POST");
                // setVehicleFormOpen(true);
              }}
            >
              +
            </button>
          )}
          {searchParams.get("view") == 1 && (
            <button
              className="button"
              onClick={() => {
                setMethod("POST");
                // setTrailerFormOpen(true);
              }}
            >
              +
            </button>
          )}
        </div>
      </div>
      <OptionsBar
        options={[
          { title: "Warning zones", link: "/safety?view=0", active: window.location.href.includes("view=0") },
          { title: "Reports", link: "/safety?view=1", active: window.location.href.includes("view=1") },
        ]}
      />
      {/* {searchParams.get("view") == 1 && trailerFormOpen && <TrailerForm closeForm={closeForm} method={method} edit={edit} />} */}
    </div>
  );
};

export default Safety;
