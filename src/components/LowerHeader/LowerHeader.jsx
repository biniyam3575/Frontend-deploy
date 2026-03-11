import { IoMdMenu } from "react-icons/io";
import classes from './LowerHeader.module.css';

const LowerHeader = () => {
  return (
    <div className={classes.lower_header}>
      <ul className={classes.nav_list}>
        {/* The "All" Button with Hamburger Icon */}
        <li className={classes.all_menu}>
          <IoMdMenu size={24} />
          <span>All</span>
        </li>

        {/* Dynamic Navigation Links */}
        <li className={classes.nav_item}>Amazon Haul</li>
        <li className={classes.nav_item}>Best Sellers</li>
        <li className={classes.nav_item}>Amazon Basics</li>
        <li className={classes.nav_item}>Our Deals</li>
        <li className={classes.nav_item}>New Releases</li>
        <li className={classes.nav_item}>Sell on Amazon</li>
        <li className={classes.nav_item}>Books</li>
        <li className={classes.nav_item}>Gift Cards</li>
        <li className={classes.nav_item}>Home and Kitchen</li>
        <li className={classes.nav_item}>Electronics</li>
      </ul>
    </div>
  );
};

export default LowerHeader;