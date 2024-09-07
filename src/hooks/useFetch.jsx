import { useCallback, useState } from "react";
import { STATUS_FETCH } from "../constants/constants";
import { defaultFetchFunction } from "../utils/functions";

const useFetch = (fetchFunction = defaultFetchFunction) => {
  const [data, setData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(STATUS_FETCH.INITIAL);

  const request = useCallback(
    (url) => {
      setFetchStatus(STATUS_FETCH.LOADING);

      return fetchFunction(url)
        .then((response) => {
          setData(response.data);
          setFetchStatus(STATUS_FETCH.DONE);
          return response.data;
        })
        .catch((error) => {
          setFetchStatus(STATUS_FETCH.ERROR);
          console.error(error);
          throw error;
        });
    },
    [fetchFunction]
  );

  return { data, fetchStatus, request };
};

export default useFetch;
