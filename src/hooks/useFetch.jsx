import { useCallback, useState } from "react";
import { STATUS_FETCH } from "../constants/constants";
import { defaultFetchFunction } from "../utils/functions";

const useFetch = (fetchFunction = defaultFetchFunction) => {
  const [data, setData] = useState();
  const [fetchStatus, setFetchStatus] = useState(STATUS_FETCH.INITIAL);

  const request = useCallback(async (url) => {
    setFetchStatus(STATUS_FETCH.LOADING);
    try {
      const { data } = await fetchFunction(url);
      setData(data);
      setFetchStatus(STATUS_FETCH.DONE);
    } catch (e) {
      setFetchStatus(STATUS_FETCH.ERROR);
      console.log(e);
    }
  }, []);

  return { data, fetchStatus, request };
};

export default useFetch;
