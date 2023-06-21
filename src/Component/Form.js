import React, { useEffect } from "react";
import { useState } from "react";
import Cart from "./Cart";
import CartCount from "./CartCount";

const Form = (props) => {
  const [checkedName, setIsCheckedName] = useState(
    localStorage.getItem("cheackedName") === "true"
  );
  const [checkedJobTitle, setIsCheckedJobTitle] = useState(
    localStorage.getItem("checkedJobTitle") === "true"
  );
  const [checkedMobileNumber, setIsCheckedMobileNumber] = useState(
    localStorage.getItem("cheakedMobileNumber") === "true"
  );
  const [checkedCompanyName, setIsCheckedComapanyName] = useState(
    localStorage.getItem("checkedCompanyName") === "true"
  );
  const [checkedCompanyWebsite, setIsCheckedComapanyWebsite] = useState(
    localStorage.getItem("checkedCompanyWesite") === "true"
  );
  const [checkedCompanyAddress, setIsCheckedCompanyAddress] = useState(
    localStorage.getItem("checkedCompanyAddress") === "true"
  );
  const [checkedCompanyPhoneNumber, setIsCheckedCompanyPhoneNumber] = useState(
    localStorage.getItem("checkedCompanyPhoneNumber") === "true"
  );
  const [checkedEmail, setIsCheckedEmail] = useState(
    localStorage.getItem("checkedEmail") === "true"
  );
  const [formIsVisible, setIsFormVisible] = useState(true);
  const [carstIsVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("chckedName", checkedName);
    localStorage.setItem("checkedJobTitle", checkedJobTitle);
    localStorage.setItem("checkedMobileNumber", checkedMobileNumber);
    localStorage.setItem("checkedCompanyName", checkedCompanyName);
    localStorage.setItem("checkedCpmpantWebsite", checkedCompanyWebsite);
    localStorage.setItem("checkedComapnyAddress", checkedCompanyAddress);
    localStorage.setItem(
      "checkedCompanyPhoneNumber",
      checkedCompanyPhoneNumber
    );
    localStorage.setItem("checkedEmail", checkedEmail);
  }, [
    checkedName,
    checkedMobileNumber,
    checkedJobTitle,
    checkedEmail,
    checkedCompanyWebsite,
    checkedCompanyPhoneNumber,
    checkedCompanyName,
    checkedCompanyAddress,
  ]);
  const handleName = () => {
    setIsCheckedName(!checkedName);
  };
  const handleJobTitle = () => {
    setIsCheckedJobTitle(!checkedJobTitle);
  };
  const handleMobileNumber = () => {
    setIsCheckedMobileNumber(!checkedMobileNumber);
  };
  const handleCompanyName = () => {
    setIsCheckedComapanyName(!checkedCompanyName);
  };
  const handleCompanyWebsite = () => {
    setIsCheckedComapanyWebsite(!checkedCompanyWebsite);
  };
  const handleEmail = () => {
    setIsCheckedEmail(!checkedEmail);
  };
  const handleCompanyAdd = () => {
    setIsCheckedCompanyAddress(!checkedCompanyAddress);
  };
  const handleCompanyPhoneNum = () => {
    setIsCheckedCompanyPhoneNumber(!checkedCompanyPhoneNumber);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
    setIsCartVisible(true);
  };

  const handleNextButton = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
    setIsCartVisible(true);
  };

  const handleBackButton = (e) => {
    e.preventDefault();
    setIsCartVisible(false);
    setIsFormVisible(true);
  };
  return (
    <>
      {formIsVisible && (
        <div>
          <h1>Details To Be Printed</h1>
          <br />
          <label>
            <input
              type="checkbox"
              checked={checkedName}
              onChange={handleName}
            />
            Name
          </label>

          <label>
            <input
              type="checkbox"
              checked={checkedJobTitle}
              onChange={handleJobTitle}
            />
            Job Title
          </label>
          <label>
            <input
              type="checkbox"
              checked={checkedMobileNumber}
              onChange={handleMobileNumber}
            />
            Mobile Number
          </label>

          <label>
            <input
              type="checkbox"
              checked={checkedEmail}
              onChange={handleEmail}
            />
            Email Address
          </label>

          <br />
          <label>
            <input
              type="checkbox"
              checked={checkedCompanyName}
              onChange={handleCompanyName}
            />
            Company Name
          </label>

          <label>
            <input
              type="checkbox"
              checked={checkedCompanyWebsite}
              onChange={handleCompanyWebsite}
            />
            Company WebSite
          </label>

          <label>
            <input
              type="checkbox"
              checked={checkedCompanyAddress}
              onChange={handleCompanyAdd}
            />
            Company Address
          </label>
          <label>
            <input
              type="checkbox"
              checked={checkedCompanyPhoneNumber}
              onChange={handleCompanyPhoneNum}
            />
            Company Phone Number
          </label>
          <br />
          <button onClick={handleFormSubmit}>Submit</button>
          <CartCount />
        </div>
      )}
      {carstIsVisible && (
        <Cart
          checkedName={checkedName}
          checkedCompanyName={checkedCompanyName}
          checkedMobileNumber={checkedMobileNumber}
          checkedJobTitle={checkedJobTitle}
          checkedCompanyWebsite={checkedCompanyWebsite}
          checkedCompanyAddress={checkedCompanyAddress}
          checkedCompanyPhoneNumber={checkedCompanyPhoneNumber}
          checkedEmail={checkedEmail}
        />
      )}

      <button onClick={handleBackButton}>Back</button>
      <button onClick={handleNextButton}>Next</button>
    </>
  );
};

export default Form;
