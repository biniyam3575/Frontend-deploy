import React, { useContext, useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { db } from "../../Utils/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import classes from "./Order.module.css";
import Loading from "../../components/Loading/Loading"; 
import { useLocation } from "react-router";

const Order = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const successMsg = location.state?.msg;

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          
          {/* 1. Success Notification (Disappears on Refresh) */}
          {successMsg && (
            <div className={classes.success_notification}>
              <FaRegCheckCircle size={22} className={classes.success_icon} />
              <span>{successMsg}</span>
            </div>
          )}

          <h1>Your Orders</h1>
          
          {loading ? (
            <Loading /> 
          ) : (
            <div className={classes.orders_list}>
              {/* 2. Better Logic: Check length clearly */}
              {orders?.length === 0 ? (
                <div className={classes.no_orders}>
                   <p>You haven't placed any orders yet.</p>
                </div>
              ) : (
                orders.map((eachOrder) => (
                  <div key={eachOrder.id} className={classes.order_card}>
                    
                    {/* Header: Order Meta Info */}
                    <div className={classes.order_header}>
                      <div className={classes.meta_group}>
                        <p className={classes.label}>ORDER PLACED</p>
                        {/* 3. Safe Date Check */}
                        <p>
                          {eachOrder.data?.created 
                            ? new Date(eachOrder.data.created * 1000).toLocaleDateString() 
                            : "Date processing..."}
                        </p>
                      </div>
                      <div className={classes.meta_group}>
                        <p className={classes.label}>TOTAL</p>
                        <p className={classes.total_price}>
                          {/* 4. Safe Amount Check */}
                          ${((eachOrder.data?.amount || 0) / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className={classes.order_id_box}>
                        <p className={classes.label}>ORDER # {eachOrder.id}</p>
                      </div>
                    </div>

                    {/* Body: List of Products */}
                    <div className={classes.order_items}>
                      {eachOrder.data?.cart?.map((item) => (
                        <div key={item.id} className={classes.single_item}>
                          {/* 5. Fallback for missing images/titles */}
                          <img 
                            src={item.image || "https://via.placeholder.com/150"} 
                            alt={item.title || "Product"} 
                          />
                          <div className={classes.item_info}>
                            <h3>{item.title || "Untitled Product"}</h3>
                            <p className={classes.item_desc}>
                              {item.description?.slice(0, 150)}...
                            </p>
                            <p className={classes.item_qty}>Quantity: {item.amount || 1}</p>
                            <p className={classes.item_price}>${item.price || "0.00"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Order;