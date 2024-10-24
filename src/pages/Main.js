import React, { useCallback, useEffect } from "react";
import CountryListPage from "./country-list/CountryListPage";
import { useHttpRequest } from "../hooks/useHttpRequests";
import { useDispatch, useSelector } from "react-redux";
import { setCountries, setLoading, setError } from "../store/slice";

const MainPage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.countries.status);
  const countryList = process.env.REACT_APP_COUNTRY_LIST_API;
  const { sendRequest } = useHttpRequest(countryList);

  const sort = (array) => {
    const len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (array[j].name.common > array[j + 1].name.common) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  };

  const getCountries = useCallback(async () => {
    dispatch(setLoading());
    try {
      const res = await sendRequest({ method: "get" });
      if (res) {
        const sortedData = sort(res);
        console.log("data", sortedData);
        dispatch(setCountries(sortedData));
      }
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error fetching data:", error);
    }
  }, [sendRequest, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      getCountries().catch((e) =>
        console.error("Error during getCountries:", e)
      );
    }
  }, [getCountries, status]);

  return (
    <>
      <CountryListPage />
    </>
  );
};

export default MainPage;
