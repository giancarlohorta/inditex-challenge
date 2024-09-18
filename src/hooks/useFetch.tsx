/* eslint-disable no-console */
import { useCallback, useState } from "react";
import { STATUS_FETCH } from "../constants/constants";
import { defaultFetchFunction } from "../utils/functions";
import { FetchFunctionType, useFetchResponse } from "../types";

const useFetch = (fetchFunction: FetchFunctionType = defaultFetchFunction): useFetchResponse => {
  const [data, setData] = useState<object>({});
  const [fetchStatus, setFetchStatus] = useState<string>(STATUS_FETCH.INITIAL);

  const request = useCallback(
    async (url: string) => {
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
        });
    },
    [fetchFunction]
  );

  return { data, fetchStatus, request };
};

export default useFetch;
