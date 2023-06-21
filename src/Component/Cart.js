import React, { useEffect, useState } from "react";
const Cart = (props) => {
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("Count");
    return storedCount ? parseInt(storedCount) : 1;
  });
  const [companyName, setCompanyName] = useState("");
  const [formDataArray, setFormDataArray] = useState([]);
  const handleAddCart = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem("Count", newCount);
      return newCount;
    });
  };
  const handleRemoveCart = () => {
    setCount((prevCount) => {
      const newCount = prevCount - 1;
      localStorage.setItem("Count", newCount);
      return newCount;
    });
  };
  // const handleCompanyNameChange = (event) => {
  //   setCompanyName(event.target.value);
  // };
  const handleChange = (event, field, index) => {
    setCompanyName(event.target.value);
    setFormDataArray((prevFormDataArray) => {
      const updatedArray = [...prevFormDataArray];
      if (!updatedArray[index]) {
        updatedArray[index] = {};
      }
      updatedArray[index][field] = event.target.value;
      return updatedArray;
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const convertToCSV = () => {
    const headers = Object.keys(formDataArray[0]);
    const csvRows = formDataArray.map((data) => Object.values(data).join(","));
    return [headers.join(","), ...csvRows].join("\n");
  };
  const handleExportCSV = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "form_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleFillAllCards = () => {
    const cards = document.querySelectorAll(".company-name-input");
    cards.forEach((card) => {
      card.value = companyName;
    });
  };
  useEffect(() => {
    localStorage.setItem("Count", count);
  }, [count]);
  
  const cartIncrement = () => {
    const cart = [];
    for (let i = 1; i <= count; i++) {
      const index = i - 1;
      const formData = formDataArray[index] || {};
      cart.push(
        <div key={i}>
          <form onSubmit={handleSubmit}>
            <legend>
              <h2>Card Details</h2>
            </legend>
            {props.checkedName ? (
              <div>
                <label>Name : </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => handleChange(e, "Name", index)}
                />
              </div>
            ) : null}
            {props.checkedJobTitle ? (
              <div>
                <label>Job Title : </label>
                <input
                  type="text"
                  placeholder="Enter Job Title"
                  onChange={(e) => handleChange(e, "Job Title", index)}
                />
              </div>
            ) : null}
            {props.checkedMobileNumber ? (
              <div>
                <label>Mobile Number : </label>
                <input
                  type="number"
                  placeholder="Enter Mobile Number"
                  onChange={(e) => handleChange(e, "Mobile Number", index)}
                />
              </div>
            ) : null}
            {props.checkedEmail ? (
              <div>
                <label>E-mail Address : </label>
                <input
                  type="text"
                  placeholder="Enter E-mail Address"
                  onChange={(e) => handleChange(e, "Email", index)}
                />
              </div>
            ) : null}
            {props.checkedCompanyName ? (
              <div>
                <label>Company Name : </label>
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  className="company-name-input"
                  onChange={(e) => handleChange(e, "Company Name", index)}
                />
              </div>
            ) : null}
            {props.checkedCompanyWebsite ? (
              <div>
                <label>Company Website URL: </label>
                <input
                  type="text"
                  placeholder="Enter Company Website"
                  onChange={(e) => handleChange(e, "Company Website", index)}
                />
              </div>
            ) : null}
            {props.checkedCompanyAddress ? (
              <div>
                <label>Company Address: </label>
                <input
                  type="text"
                  placeholder="Enter Company Address"
                  onChange={(e) => handleChange(e, "Company Address", index)}
                />
              </div>
            ) : null}
            {props.checkedCompanyPhoneNumber ? (
              <div>
                <label>Company Phone Number: </label>
                <input
                  type="number"
                  placeholder="Enter Company Phone Number"
                  onChange={(e) =>
                    handleChange(e, "Company Phone Number", index)
                  }
                />
              </div>
            ) : null}
          </form>{" "}
          {i}
        </div>
      );
    }
    return cart;
  };
  return (
    <div>
      <div>
        <button onClick={handleRemoveCart}>-</button>
        {count}
        <button onClick={handleAddCart}>+</button>
      </div>
      {props.checkedCompanyName && (
        <div>
          <input type="checkbox" onChange={handleFillAllCards} />
          Apply Company Name To All Cards
        </div>
      )}
      {cartIncrement()}
      <button type="button" onClick={handleExportCSV}>
        Export to CSV
      </button>
    </div>
  );
};
export default Cart;