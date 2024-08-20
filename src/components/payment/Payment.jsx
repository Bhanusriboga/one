import React from "react";
import "./Payment.css";

const UPIPayment = () => {

  const handlePayment = () => {
    const options = {
      key: "rzp_test_NW4wGI973WWT4O", // Enter the Key ID generated from the Razorpay Dashboard
      amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 10000 means 100 INR
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function(response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    

    <div className="main text-center d-flex justify-content-center align-items-center mt-5 vh-100 main-card-payment overlay">
      <div className="card1">
        <div className="mt-3">
        <button type="button" className="close-button" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <h1 className="card-title text-center">Pellisambandalu Pricing</h1>
            <h3 className="price"><span className="amount">₹ 500 </span></h3>
         
            <hr className="hrline"/>
          
          <ul>
            <li className="mb-2">Unlimited Profile views</li>
            {/* <li className="mb-2">XXXXXXXXXXXXXXXXXXXX</li>
            <li className="mb-2">XXXXXXXXXXXXXXXXXXXX</li> */}
          </ul>
          <button type="button" className="button" onClick={handlePayment}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};


export default UPIPayment;
