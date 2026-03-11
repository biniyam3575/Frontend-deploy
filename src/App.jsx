import { useContext, useEffect } from 'react'
import Router from '../Router.jsx'
import './App.css'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx'
import { DataContext } from './components/DataProvider/DataProvider.jsx'
import { auth } from './Utils/firebase.js'
import { Type } from './Utils/action.type.js'
function App() {
  const [user , dispatch] = useContext(DataContext);
  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          dispatch({
            type: Type.SET_USER,
            user: authUser,
          });
        } else {
          dispatch({
            type: Type.SET_USER,
            user: null,
          });
        }
        // IMPORTANT: Dispatch a 'SET_LOADING' false action here if you have one, 
        // or ensure your state reflects that the auth check is finished.
      });
      return () => unsubscribe();
    }, []);

  return (
    <>
      <ScrollToTop />
      <Router/>
    </>
  )
}

export default App
