import { Route, Routes } from 'react-router';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './src/Pages/Home/Home';
import Auth from './src/Pages/Auth/Auth';
import ProductDetail from './src/Pages/ProductDetail/ProductDetail';
import Order from './src/Pages/Order/Order';
import Payment from './src/Pages/Payment/Payment';
import Cart from './src/Pages/Cart/Cart';
import Result from './src/Pages/Result/Result';
import ProtectedRoute from './src/components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51T7KWnQUCha35LfGkW9wvCr7mqtpoQPgtmgp2ToAmI5yNBIKHsE5J7HlWxPJkQ7ysUHXs7Xgypgew7ZZeattQtwF008b6cJW1E');

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/order' element={
          <ProtectedRoute msg="Please log in to access your orders" redirect="/order">
            <Order/>
          </ProtectedRoute>
          }/>
        <Route path='/product/:productId' element={<ProductDetail/>}/>
        <Route path='/payment' element={
          <Elements stripe={stripePromise}>
          <ProtectedRoute msg="Please log in to make a payment" redirect="/payment">
            <Payment />
          </ProtectedRoute>
          </Elements>
        }/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/category/:categoryName' element={<Result/>}/>
        <Route path='/auth' element={<Auth/>}/>
    </Routes>
  );
};

export default Router;