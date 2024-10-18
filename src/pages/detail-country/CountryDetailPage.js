import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../hooks/useHttpRequests";
import MapComponent from "../../component/map/map";
import ModalDialog from "../../component/modal-dialog/modalDialog";
import { useDispatch, useSelector } from "react-redux";
import { setAssociatedCountries } from "../../store/associatedSlice";

const CountryDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const associatedCountries = useSelector(
    (state) => state.associated.associatedCountries
  )
  const [countryData, setCountryData] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState("loading")
  const [isCountryAssociated, setIsCountryAssociated] = useState(false)
  const countryDetail = process.env.REACT_APP_COUNTRY_DETAIL_API
  const { sendRequest } = useHttpRequest(countryDetail)

  const getCountryDetail = useCallback(async () => {
    try {
      const res = await sendRequest({
        url: `/${id}`,
        method: "get",
      });
      if (res) {
        setCountryData(res[0])
      }
    } catch (error) {
      console.log("Error fetching country details", error)
    }
  }, [sendRequest, id])

  useEffect(() => {
    if (!countryData) {
      getCountryDetail()
    }
  }, [id, getCountryDetail, countryData])

  useEffect(() => {
    if (countryData) {
      const isAssociated = associatedCountries.some(
        (country) => country.cca3 === countryData.cca3
      );
      setIsCountryAssociated(isAssociated)
    }
  }, [associatedCountries, countryData])

  const handleCooperationClick = () => {
    setModalVisible(true)
    setModalType("loading")

    const randomDelay = Math.floor(Math.random() * 9000) + 2000

    setTimeout(() => {
      const randomChance = Math.random()
      if (randomChance < 0.5) {
        setModalType("accepted!")
      } else {
        setModalType("rejected!")
      }
    }, randomDelay)
  }

  useEffect(() => {
    if (modalType === "accepted!") {
      dispatch(setAssociatedCountries(countryData))
    }
  }, [modalType, countryData, dispatch])

  return (
    <div className="flex flex-col w-full space-y-4 p-4">
      {isModalVisible && (
        <ModalDialog
          type={
            modalType === "accepted!"
              ? "finish"
              : modalType === "rejected!"
              ? "error"
              : "loading"
          }
          title={
            modalType === "loading"
              ? "Proposing Engagement..."
              : "Proposal Response"
          }
          message={modalType === "loading" ? "Please wait..." : modalType}
          yesBtn="Okay"
          onConfirm={() => {
            setModalVisible(false)
          }}
        />
      )}
      {countryData ? (
        <>
          <div className="flex flex-row text-3xl font-bold text-black items-center justify-center bg-gray-300 rounded-md space-x-2 p-1">
            <div>{countryData.flag}</div>
            <div>{countryData.name.common}</div>
            <div>{countryData.flag}</div>
          </div>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
            <div className="w-full lg:w-2/3 bg-gray-100 rounded-md p-4">
              <img
                src={countryData.flags.png}
                alt={countryData.name.official}
                className="w-full h-auto rounded-md shadow-lg border-[1px] border-slate-400"
              />
            </div>

            <div className="w-full flex flex-col bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="w-full h-64 lg:flex-grow lg:h-auto border-[1px] border-slate-400 rounded-md">
                <MapComponent latlng={countryData.latlng} />
              </div>
              <a
                className="w-full text-center underline text-blue-600 hover:text-blue-800 font-semibold mt-2"
                href={countryData.maps.openStreetMaps}
                target="_blank"
                rel="noreferrer">
                View on OpenStreetMap
              </a>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 shadow-lg flex flex-col lg:flex-row justify-between gap-0 lg:gap-4 space-y-1.5 lg:space-y-0">
            <div className="flex flex-col w-full lg:w-1/2 space-y-1.5">
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Official Name:</span>
                <span>{countryData.name.official}</span>
              </div>
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Capital:</span>
                <span>{countryData.capital[0]}</span>
              </div>
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Population:</span>
                <span>{countryData.population.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Independent:</span>
                <span>{countryData.independent ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Currency:</span>
                <span>
                  {countryData.currencies
                    ? Object.entries(countryData.currencies).map(
                        ([key, value]) => (
                          <div key={key}>
                            - {value.name} ({value.symbol})
                          </div>
                        )
                      )
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="hidden md:block w-[1px] bg-gray-400" />

            <div className="flex flex-col w-full lg:w-1/2 space-y-1.5">
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Language:</span>
                <span>
                  {countryData.languages
                    ? Object.entries(countryData.languages).map(
                        ([key, value]) => <div key={key}>- {value}</div>
                      )
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Region:</span>
                <span>{countryData.region}</span>
              </div>
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Subregion:</span>
                <span>{countryData.subregion ?? "-"}</span>
              </div>
              <div className="flex justify-between border-b-[1px] border-gray-300">
                <span className="font-semibold">Timezones:</span>
                <span>{countryData.timezones.join(", ")}</span>
              </div>
            </div>
          </div>

          {!isCountryAssociated && (
            <div className="flex w-full items-center bg-orange-600 rounded-md">
              <button
                className="w-full items-center p-4 rounded-md text-white font-bold text-lg"
                onClick={handleCooperationClick}>
                Propose Engagement
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-100 w-full rounded-md p-4">Retrieving data...</div>
      )}
    </div>
  )
}

export default CountryDetailPage;
