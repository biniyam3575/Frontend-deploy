import Layout from "../../components/Layout/Layout"
import CarouselEffect from '../../components/Carousel/CarouselEffect'
import Category from '../../components/Category/Category.jsx'
import Product from '../../components/Product/Product.jsx'
import BackToTop from "../../components/BackToTop/BackToTop.jsx"

const Home = () => {
  return (
    <Layout>
        <CarouselEffect/>
        <Category/>
        <Product/>
        <BackToTop/>
    </Layout>
  )
}

export default Home