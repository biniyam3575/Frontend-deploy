import classes from './Footer.module.css';
import ukFlag from '../../assets/icons/image.png';
const Footer = () => {
  return (
    <footer className={classes.footer}>
      {/* Top section: Main Link Columns */}
      <div className={classes.footer_links}>
        <div className={classes.column}>
          <h4>Get to Know Us</h4>
          <a href="#">About Amazon</a>
          <a href="#">Careers</a>
          <a href="#">Sustainability</a>
          <a href="#">Amazon Science</a>
        </div>
        <div className={classes.column}>
          <h4>Make Money with Us</h4>
          <a href="#">Sell with over £42K / €47K in incentives</a>
          <a href="#">Sell on Amazon Business</a>
          <a href="#">Sell on Amazon Handmade</a>
          <a href="#">Associates Programme</a>
          <a href="#">Fulfilment by Amazon</a>
          <a href="#">Advertise Your Products</a>
        </div>
        <div className={classes.column}>
          <h4>Amazon Payment Methods</h4>
          <a href="#">Amazon Business Amex Card</a>
          <a href="#">Payment Methods Help</a>
          <a href="#">Gift Cards</a>
          <a href="#">Top Up Your Account</a>
        </div>
        <div className={classes.column}>
          <h4>Let Us Help You</h4>
          <a href="#">Track Packages or View Orders</a>
          <a href="#">Returns & Replacements</a>
          <a href="#">Customer Service</a>
          <a href="#">Report illegal content</a>
        </div>
      </div>

      {/* Bottom section: Branding and Language */}
      <div className={classes.footer_bottom}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon logo" className={classes.logo} />
        <div className={classes.lang_buttons}>
          <button>English</button>
          <button>
            {/* Using the imported image directly */}
            <img src={ukFlag} alt="UK Flag" className={classes.flag_icon} /> 
            United Kingdom
          </button>
        </div>
      </div>

      {/* Copyrights */}
      <div className={classes.footer_copyright}>
        <p>Conditions of Use & Sale | Privacy Notice | Cookies Notice | Interest-Based Ads Notice</p>
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;