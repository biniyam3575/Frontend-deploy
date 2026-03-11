import { IoMdSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { BiCaretDown } from "react-icons/bi";
import flag from '../../assets/icons/image.png'; 
import cart1 from '../../assets/icons/cart.png';
import logo from '../../assets/icons/Amazon_logo.png'
import classes from './Header.module.css'; 
import { Link } from "react-router";
import { useContext, useState } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from '../../Utils/firebase'

const Header = () => {

  const [{ cart , user }] = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);

  let tot = 0;
  cart.forEach((item) => {
    tot += item.amount;
  });

  return (
    <>
      <header className={classes.amazon_header}>
        <div className={classes.inner_container}>
          
          {/* Logo */}
          <div className={classes.header_logo_container}>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="amazon logo" />
            </Link>
          </div>

          {/* Delivery */}
          <div className={classes.header_delivery}>
            <SlLocationPin className={classes.location_icon} size={20} />
            <div className={classes.delivery_text}>
              <p className={classes.text_light}>Deliver to</p>
              <span className={classes.text_bold}>Ethiopia</span>
            </div>
          </div>

          {/* Search */}
          <div className={classes.header_search}>
            <select className={classes.search_select}>
              <option value="">All</option>
            </select>
            <input
              className={classes.search_input}
              type="text"
              placeholder="Search Amazon"
            />
            <div className={classes.search_icon_wrapper}>
              <IoMdSearch size={25} />
            </div>
          </div>

          {/* Nav Right */}
          <div className={classes.header_nav_right}>
            <div className={classes.language_select}>
              <img src={flag} alt="flag" className={classes.flag_img} />
              <span className={classes.text_bold}>
                EN <BiCaretDown className={classes.caret} />
              </span>
            </div>

            <div className={classes.nav_item}>
              {user ? (
                <>
                  <p
                   onClick={() => setShowModal(true)}
                   className={classes.text_light}>
                    Hello, {user.email?.split('@')[0]}
                  </p>
                  <span
                    onClick={() => setShowModal(true)}
                    className={classes.text_bold}
                    style={{ cursor: "pointer" }}
                  >
                    Sign Out <BiCaretDown className={classes.caret} />
                  </span>
                </>
              ) : (
                <Link to="/auth">
                  <p className={classes.text_light}>Hello, sign in</p>
                  <span className={classes.text_bold}>
                    Account & Lists <BiCaretDown className={classes.caret} />
                  </span>
                </Link>
              )}
            </div>

            <Link to="/order" className={classes.nav_item}>
              <p className={classes.text_light}>Returns</p>
              <span className={classes.text_bold}>& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className={classes.cart_container}>
              <div className={classes.cart_icon_wrapper}>
                <span
                  className={`${classes.cart_count} ${
                    tot < 10
                      ? classes.small
                      : tot < 100
                      ? classes.medium
                      : classes.large
                  }`}
                >
                  {tot}
                </span>
                <img src={cart1} alt="cart" className={classes.cart_image} />
              </div>
              <span className={classes.nav_cart_text}>Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 🔥 Sign Out Modal */}
      {showModal && (
        <div className={classes.modal_overlay}>
          <div className={classes.modal}>
            <h3>Sign Out</h3>
            <p>Are you sure you want to sign out?</p>

            <div className={classes.modal_buttons}>
              <button
                className={classes.cancel_btn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className={classes.confirm_btn}
                onClick={() => {
                  auth.signOut();
                  setShowModal(false);
                }}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;