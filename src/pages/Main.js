import React, { useCallback, useEffect } from "react";
import CountryListPage from "./country-list/CountryListPage";
import { useHttpRequest } from "../hooks/useHttpRequests";
import { useDispatch, useSelector } from "react-redux";
import { setCountries, setLoading, setError } from "../store/slice";

const MainPage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.countries.status)
  const countryList = process.env.REACT_APP_COUNTRY_LIST_API
  const { sendRequest } = useHttpRequest(countryList)

  const getCountries = useCallback(async () => {
    dispatch(setLoading())
    try {
      const res = await sendRequest({ method: "get" })
      dispatch(setCountries(res))
    } catch (error) {
      dispatch(setError(error.message))
      console.error("Error fetching data:", error)
    }
  }, [sendRequest, dispatch])

  useEffect(() => {
    if (status === 'idle') {
      getCountries().catch((e) => console.error("Error during getCountries:", e))
    }
  }, [getCountries, status])

  return (
    <>
      <CountryListPage />
    </>
  );
};

export default MainPage;
