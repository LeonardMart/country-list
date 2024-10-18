import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowRight from "../../assets/icon/chevron-right";
import { removeAssociatedCountry } from "../../store/associatedSlice";
import ModalDialog from "../../component/modal-dialog/modalDialog";
import { useNavigate } from "react-router-dom";

const AssociatedCountry = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const countries = useSelector(
    (state) => state.associated.associatedCountries
  )
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleCancelEngagement = (country) => {
    setSelectedCountry(country)
    setModalVisible(true)
  }

  const confirmRemoval = () => {
    if (selectedCountry) {
      dispatch(removeAssociatedCountry(selectedCountry))
      setModalVisible(false)
      setSelectedCountry(null)
    }
  }

  return (
    <div className="bg-gray-300 w-full h-full p-4 rounded-md">
      {isModalVisible && (
        <ModalDialog
          title={`Remove ${selectedCountry.name.common}?`}
          message={`Are you sure that you want to delete selected country?`}
          noBtn="Cancel"
          yesBtn="Remove"
          type="warning"
          onCancel={() => setModalVisible(false)}
          onConfirm={confirmRemoval}
        />
      )}
      <div className="flex flex-col space-y-4">
        {countries.length > 0 ? (
          countries.map((item) => (
            <div
              key={item.cca3}
              className="bg-gray-100 w-full p-4 rounded-md flex flex-col md:flex-row lg:flex-row space-y-1.5 justify-between shadow-lg">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center space-x-1.5">
                  <img
                    className="w-12 h-10"
                    src={item.flags.png}
                    alt={item.name.official}
                  />
                  <div className="font-semibold text-lg">
                    {item.name.common}
                  </div>
                </div>
                <button onClick={() => navigate(`/country/${item.cca3}`)} className="text-gray-600 h-full hover:scale-110 md:hidden lg:hidden w-6">
                  <ArrowRight
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              <div className="flex flex-row w-full md:w-fit lg:w-fit items-center rounded-md space-x-1.5">
                <button
                  className="w-full items-center px-4 py-1 rounded-md bg-orange-600 hover:scale-105 text-white font-bold text-lg"
                  onClick={() => handleCancelEngagement(item)}>
                  Cancel Engagement
                </button>

                <button
                  onClick={() => navigate(`/country/${item.cca3}`)}
                  className="text-gray-600 h-full hover:scale-110 hidden md:block lg:block w-6">
                  <ArrowRight
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No data yet...</div>
        )}
      </div>
    </div>
  );
};

export default AssociatedCountry;
