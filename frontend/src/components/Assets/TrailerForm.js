import { useState, useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { TRAILER_STATUS, ASSETS_URL } from "../../constants/constants";
import LoadingButton from "../../common/LoadingButton";
import Input from "../../common/Input";
import Select from "../../common/Select";

const TrailerForm = ({ closeForm, method, edit }) => {
  const { errors, post, put, isLoading } = useRequest(ASSETS_URL + "trailers/");
  const [log, setLog] = useState(
    method === "PUT"
      ? {
          ...edit,
        }
      : {
          number: "",
          unit: "",
          status: "ius",
          notes: "",
        }
  );

  const handleChange = ({ currentTarget: input }) => {
    const newLog = { ...log };
    if (input.type == "checkbox") {
      newLog[input.name] = !newLog[input.name];
    } else {
      newLog[input.name] = input.value;
    }
    setLog(newLog);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // post or put to server
    let response;
    if (method == "POST") response = await post(log);
    if (method == "PUT") response = await put(log);
    if (response) closeForm({ reload: true });
  };

  const handelCancel = (e) => {
    e.preventDefault();
    closeForm({ reload: false });
  };

  return (
    <div className="focus-area">
      <div className="form">
        <div className="form-info">
          {method === "POST" ? (
            <>
              <h1>Create a new asset</h1>
              <p>Follow these instructions to create a new asset. Once created, the asset will be available to use, control, and get update about it</p>
            </>
          ) : (
            <>
              <h1>Update the existing asset</h1>
            </>
          )}
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <Input name="number" type="text" value={log.number} label="Trailer number" onChange={handleChange} error={errors.number} />
            <Select name="unit" selections={[]} isObject={true} value={log.unit} label="Unit" onChange={handleChange} error={errors.unit} />
            <Select name="status" selections={TRAILER_STATUS} isObject={true} value={log.status} label="Status" onChange={handleChange} error={errors.status} />
            <Input name="notes" type="text" value={log.notes} label="Notes" onChange={handleChange} error={errors.notes} />
          </form>
        </div>
        <div className="row buttons-container">
          <p></p>
          <div className="buttons">
            <button onClick={handelCancel} className="cancel">
              Cancel
            </button>
            {isLoading ? (
              <LoadingButton className={"save"} />
            ) : (
              <button className="save" onClick={handleSubmit}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerForm;
