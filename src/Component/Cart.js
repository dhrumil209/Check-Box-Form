import React, { useEffect, useState } from "react";
const Cart = (props) => {
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("Count");
    return storedCount ? parseInt(storedCount) : 1;
  });
  const [applyToAllCards, setApplyToAllCards] = useState(false);
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

  const handleChange = (event, field, index) => {
  
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
  
  const handleApplyToAllCards = () => {
    if (applyToAllCards) {
      const firstFormData = formDataArray[0] || {};
      setFormDataArray((prevFormDataArray) => {
        const updatedArray = [...prevFormDataArray];
        for (let i = 1; i < count; i++) {
          updatedArray[i] = { ...firstFormData };
        }
        return updatedArray;
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        parseCSV(contents);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvData) => {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",");
    const parsedData = rows.slice(1).map((row) => {
      const values = row.split(",");
      const formData = {};
      headers.forEach((header, index) => {
        formData[header] = values[index];
      });
      return formData;
    });
    setFormDataArray(parsedData);
    setCount(parsedData.length);
    console.log(parsedData);
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
                  value={formData["Name"] || ""}
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
                  value={formData["Job Title"] || ""}
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
                  value={formData["Mobile Number"] || ""}
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
                  value={formData["Email"] || ""}
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
                 
                  value={applyToAllCards ? formDataArray[0]["Company Name"] || "" : formData["Company Name"] || ""}
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
                  
                  value={applyToAllCards ? formDataArray[0]["Company Website"] || "" : formData["Company Website"] || ""}
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
                  // 
                  value={applyToAllCards ? formDataArray[0]["Company Address"] || "" : formData["Company Address"] || ""}
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
                  
                  value={applyToAllCards ? formDataArray[0]["Company Phone Number"] || "" : formData["Company Phone Number"] || ""}
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
      <div>
        <input
          type="checkbox"
          onChange={(e) => setApplyToAllCards(e.target.checked)}
        />
        Apply Company Details to All Cards
      </div>
      
      {cartIncrement()}
      <button type="button" onClick={handleExportCSV}>
        Export to CSV
      </button>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};
export default Cart;
