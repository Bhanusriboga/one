import React from 'react';

const UPIPayment = () => {
  const handlePayment = () => {
    const options = {
      key: 'rzp_test_NW4wGI973WWT4O', // Enter the Key ID generated from the Razorpay Dashboard
      amount: 10000, // Amount is in currency subunits. Default currency is INR. Hence, 10000 means 100 INR
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      },
      method: {
        upi: true
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h2>Make a UPI Payment</h2>
      <button onClick={handlePayment}>Pay with UPI</button>
    </div>
  );
};

export default UPIPayment;