import React, { useEffect, useState, useCallback } from "react";
import SearchBox from "../../component/searchbox/SearchBox";
import { useHttpRequest } from "../../hooks/useHttpRequests";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CountryListPage = () => {
  const countries = useSelector((state) => state.countries.countries)
  const searchCountry = process.env.REACT_APP_COUNTRY_SEARCH_API
  const { sendRequest } = useHttpRequest()
  const [searchKeyword, setSearchKeyword] = useState("")
  const [data, setData] = useState([])
  const [message, setMessage] = useState("Retrieving Data...")
  const navigate = useNavigate()

  useEffect(() => {
    setData(countries)
  }, [countries])

  const searchCountries = useCallback(async () => {
    if (searchKeyword) {
      try {
        const res = await sendRequest({
          url: `${searchCountry}/${searchKeyword}`,
          method: "get",
        });
        if (res) {
          setData(res)
        } else {
          setData([])
          setMessage("No Data Found...")
        }
      } catch (error) {
        setMessage("Error Searching Countries...")
        console.log("Error fetching data ", error)
      }
    } else {
      setData(countries)
    }
  }, [searchCountry, searchKeyword, countries, sendRequest])

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      searchCountries()
    }, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchKeyword, countries, searchCountries])

  const searchHandler = (e) => {
    setSearchKeyword(e.target.value)
  }

  const onClearHandler = () => {
    setSearchKeyword("")
  }

  const detailCountryNavigate = (id) => {
    navigate(`/country/${id}`)
  }

  return (
    <div className="flex flex-col w-full h-full space-y-1.5">
      <div className="sticky top-[73px] md:top-[68px] z-20 w-full p-2 bg-gray-300 rounded-md shadow-lg shadow-gray-500">
        <SearchBox
          className="w-full"
          name="Search Country"
          placeHolder="Search Country"
          onChange={searchHandler}
          value={searchKeyword}
          onClear={onClearHandler}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 gap-y-8 bg-gray-300 rounded-md p-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <button
              key={index}
              onClick={() => detailCountryNavigate(item.cca3)}
              className="rounded-md bg-gray-100 items-center flex flex-col w-full p-4 space-y-1.5 shadow-lg shadow-gray-400 hover:drop-shadow-xl hover:bg-white hover:scale-110 hover:z-20"
            >
              <div className="rounded-md item-center">
                <img
                  className="w-30 h-auto rounded-md shadow-xl shadow-gray-400 sm:w-30 sm:h-25 md:w-30 md:h-20 xl:w-50 xl:h-24"
                  src={item.flags.png}
                  alt={item.name.official}
                />
              </div>
              <div className="font-bold text-b">{item.name.common}</div>
              <div className="text-gray-500">{item.timezones[0]}</div>
              <div className="underline text-blue-500">Detail</div>
            </button>
          ))
        ) : (
          <div>{message}</div>
        )}
      </div>
    </div>
  )
}

export default CountryListPage;
