import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { stringToDateTime, dateToString, fixDate, getChoice } from "../../functions/Functions";
import ActivityChart from "../../common/ActivityChart";
import useRequest from "../../hooks/useRequest";
import Loading from "../../common/Loading";
import { TRAILERS_URL, TRAILER_LOG_STATUS, TRAILER_LOG_STATUS_COLOR } from "../../constants/constants";

const TrailerLogs = ({ close, trailer }) => {
  const [scale, setScale] = useState({
    choice: "r2",
    from: stringToDateTime("1 days before & no time"),
    to: stringToDateTime("today"),
  });

  const request = useRequest(`${TRAILERS_URL}logs?id=${trailer.id}&from=${dateToString(scale.from, "%y-%m-%dT%H:%M:%S")}&to=${dateToString(scale.to, "%y-%m-%dT%H:%M:%S")}`);

  useEffect(() => {
    request.get();
  }, []);

  return (
    <div className="focus-area">
      <div className="asset-log">
        <div className="form-info">
          <div className="row">
            <h1>Trailer {trailer.number} logs</h1>
            <div className="close-icon" onClick={close}>
              <ImCross />
            </div>
          </div>
          <p>This form shows information of the trailer, when it moved or stopped and how long </p>
        </div>
        <ActivityChart
          data={{
            from: scale.from,
            to: scale.to,
            charts: request.data,
            colors: TRAILER_LOG_STATUS_COLOR,
            colorChoices: TRAILER_LOG_STATUS,
          }}
        />
        <div className="assets-log-table-container">
          {request.isLoading ? (
            <Loading />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>status</th>
                  <th>time</th>
                  <th>location</th>
                  <th>vehicle</th>
                </tr>
              </thead>
              <tbody>
                {request.data.map((log, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{getChoice(log.status, TRAILER_LOG_STATUS)}</td>
                      <td>{fixDate(log.time)}</td>
                      <td>*</td>
                      <td>*</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerLogs;
