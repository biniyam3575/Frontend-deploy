import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Layout from '../../components/Layout/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import classes from './Payment.module.css';
import { axiosInstance } from '../../Api/axios';
import { db } from "../../Utils/firebase"; 
import { doc, setDoc } from "firebase/firestore";
import { Type } from '../../Utils/action.type'; // Ensure Type is imported
import { useNavigate } from 'react-router'; // Import useNavigate

const Payment = () => {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate(); // Initialize navigate

  const total = cart.reduce((sum, item) => sum + item.price * item.amount, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) return;

  setProcessing(true);

  try {
    // 1. Get Client Secret
    const response = await axiosInstance({
      method: "post",
      url: `/payment/create?total=${Math.round(total * 100)}`,
    });

    const clientSecret = response.data?.clientSecret;

    // 2. Confirm Payment
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setCardError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else {
      // 3. Save Order to Firestore (Wait for this to finish!)
      await setDoc(
        doc(db, "users", user?.uid, "orders", paymentIntent.id),
        {
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      // 4. EMPTY the cart 
      // This now triggers the localStorage.removeItem("cart") in your reducer
      dispatch({
        type: Type.EMPTY_CART,
      });

      setCardError(null);
      setProcessing(false);
      setSuccess(true);
      
      // 5. REDIRECT
      navigate("/order", { state: { msg: "You have placed a new order" }, replace: true });
    }

  } catch (error) {
    console.error("Error processing payment:", error);
    setCardError("An unexpected error occurred.");
    setProcessing(false);
  }
};

  const handelChange = (e)=>{
    console.log(e)
    e?.error?.type ? setCardError(e?.error?.message): setCardError('');
  }
  return (
    <Layout>
      <div className={classes.payment_container}>
        <h2>Checkout ({totalItems} items)</h2>
        <hr /><br />
        
        <div className={classes.payment_content}>
          {/* LEFT COLUMN: Items */}
          <div className={classes.payment_section}>
            <h3>Review items and delivery</h3>
            {cart.map((item) => (
              <div key={item.id} className={classes.payment_item}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>${(item.price * item.amount).toFixed(2)}<small>({item.amount})</small></p>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Address & Payment */}
          <div className={classes.right_column}>
            <div className={classes.payment_section}>
              <h3>Delivery Address</h3>
              <p>{user?.email}</p>
              <p>123 React Lane, Addis Ababa</p>
            </div>

            <div className={classes.payment_section}>
              <h3>Payment Method</h3>
              <form onSubmit={handleSubmit}>
                <div className={classes.payment_form}>
                  {cardError && <small style={{color:'red'}}>{cardError}</small>}
                   <CardElement onChange={handelChange}/>
                </div>
                <div className={classes.payment_price}>
                    <h3>Order Total: ${total.toFixed(2)}</h3>
                    <button type="submit" className={classes.pay_btn} disabled={processing || success}>
                        {processing ? "Processing..." : "Place your order"}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;