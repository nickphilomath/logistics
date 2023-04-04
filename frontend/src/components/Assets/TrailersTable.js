// import icons
import { BsPencil } from "react-icons/bs";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { TRAILER_STATUS } from "../../constants/constants";
import { getChoice, findAndGet, sort } from "../../functions/Functions";
import useMessage from "../../hooks/useMessage";

const TrailersTable = ({ trailers, locations, handleEdit, handleLog }) => {
  const { createMessage } = useMessage();
  const handleCopyLocation = async (location) => {
    await navigator.clipboard.writeText(location.latitude + ", " + location.longitude);
    createMessage({ type: "success", content: "GPS location copied!" });
  };

  trailers = sort(trailers, [
    { column: "number", ascending: true },
    { column: "status", ascending: true },
  ]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>Number</th>
          <th>Location</th>
          <th>Is moving</th>
          <th>Last trip</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trailers.map((trailer, index) => {
          let location = findAndGet("id", trailer.id, locations);
          return (
            <tr key={trailer.id} className={trailer.status === "ius" ? "" : "inactive"}>
              <td>{index + 1}</td>
              <td>{trailer.number}</td>
              <td
                className={location ? "location" : "warn"}
                onClick={() => {
                  handleCopyLocation(location);
                }}
                title="copy"
              >
                {location ? `${location.location}` : "not connected"}
              </td>
              <td className={location && location.speed > 0 ? "good" : location ? "" : "warn"}>
                {location ? (location.speed > 0 ? `${Math.round(location.speed)} mph` : "stopped") : "not connected"}
              </td>
              <td>{trailer.last_trip}*</td>
              <td>{getChoice(trailer.status, TRAILER_STATUS)}</td>
              <td>
                <div className="actions">
                  <div
                    className="icon-holder"
                    onClick={() => {
                      handleEdit(trailer);
                    }}
                    title="edit"
                  >
                    <BsPencil className="icon edit" />
                  </div>
                  <div
                    className="icon-holder"
                    onClick={() => {
                      handleLog(trailer);
                    }}
                    title="logs"
                  >
                    <AiOutlineAlignLeft className="icon log" />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TrailersTable;
