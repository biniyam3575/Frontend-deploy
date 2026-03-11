import React, { useContext, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utils/action.type";
import classes from "./Cart.module.css";
import { Link } from "react-router";

const Cart = () => {
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [{ cart }, dispatch] = useContext(DataContext);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.amount, 0);
  }, [cart]);

  return (
    <>
          {itemToDelete && (
      <div className={classes.modal_overlay}>
        <div className={classes.modal}>
          <h3>Remove Item</h3>
          <p>Are you sure you want to remove this item from the cart?</p>

          <div className={classes.modal_buttons}>
            <button
              className={classes.cancel_btn}
              onClick={() => setItemToDelete(null)}
            >
              Cancel
            </button>

            <button
              className={classes.confirm_btn}
              onClick={() => {
                dispatch({
                  type: Type.REMOVE_FROM_CART,
                  id: itemToDelete.id,
                });
                setItemToDelete(null);
              }}
            >
              Yes, Remove
            </button>
          </div>
        </div>
      </div>
    )}
     <Layout>
      <section className={classes.cart_container}>
        <div className={classes.cart_left}>
          <h1>Shopping Cart</h1>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={classes.cart_item}>
                <img src={item.image} alt={item.title} />

                <div className={classes.cart_details}>
                  <h3>{item.title}</h3>

                  <div className={classes.controls}>
                    <div className={classes.qty_buttons}>
                      <button
                        onClick={() =>
                          dispatch({
                            type: Type.UPDATE_QTY,
                            id: item.id,
                            qty: item.amount + 1,
                          })
                        }
                      >
                        +
                      </button>

                      <span>{item.amount}</span>

                      <button
                        onClick={() =>
                          dispatch({
                            type: Type.UPDATE_QTY,
                            id: item.id,
                            qty: item.amount - 1,
                          })
                        }
                        disabled={item.amount <= 1}
                      >
                        −
                      </button>
                    </div>

                    <button
                    className={classes.delete_btn}
                    onClick={() => setItemToDelete(item)}
                  >
                    Delete
                  </button>
                  </div>
                </div>

                <div className={classes.cart_price}>
                  ${(item.price * item.amount).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className={classes.cart_right}>
          <div className={classes.subtotal_box}>
            <p>
              Subtotal ({cart.reduce((a, c) => a + c.amount, 0)} items):{" "}
              <strong>${total.toFixed(2)}</strong>
            </p>
           {cart.length > 0 && (
              <Link to="/payment">
                <button className={classes.checkout_btn}>
                  Proceed to checkout
                </button>
              </Link>
            )}
            
          </div>
        </div>
      </section>
    </Layout>
    </>
   
  );
};

export default Cart;