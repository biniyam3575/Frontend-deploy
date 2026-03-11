import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import classes from './Layout.module.css'; 
import LowerHeader from '../LowerHeader/LowerHeader.jsx';
const Layout = ({ children }) => {
  return (
    <div className={classes.layout_container}>
        <div className={classes.sticky_header}>
            <Header />
            <LowerHeader />
        </div>
        <main className={classes.main_content}>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout