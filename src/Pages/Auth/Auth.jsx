import React, { useState, useContext } from 'react';
import { Link, useNavigate,useLocation } from 'react-router';
import { auth } from '../../Utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import classes from './Auth.module.css';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { Type } from '../../Utils/action.type';
import { ClipLoader } from 'react-spinners';

const Auth = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.redirect || "/";
  const message = location.state?.msg;

  const [{}, dispatch] = useContext(DataContext);

  const authHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let userInfo;
      if (isSigningUp) {
        userInfo = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userInfo = await signInWithEmailAndPassword(auth, email, password);
      }

      // Update global user state
      dispatch({
        type: Type.SET_USER,
        user: userInfo.user,
      });

      // Clear fields and navigate
      setEmail('');
      setPassword('');
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img 
          src='https://pngimg.com/uploads/amazon/amazon_PNG1.png' 
          alt="Amazon Logo" 
          className={classes.login__logo} 
        />
      </Link>

      <form className={classes.login__container} onSubmit={authHandler}>
        <h1 className={classes.login__title}>{isSigningUp ? 'Create account' : 'Sign-In'}</h1>
        
        {error && <small className={classes.error}>{error}</small>}
        {message && <small className={classes.message}>{message}</small>}

        <h5 className={classes.login__label}>E-mail</h5>
        <input 
            className={classes.login__input} 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
        />

        <h5 className={classes.login__label}>Password</h5>
        <input 
            className={classes.login__input} 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
        />

        <button 
            type="submit" 
            className={classes.login__signInButton}
            disabled={loading}
        >
          {loading ? <ClipLoader size={15} /> : (isSigningUp ? 'Create your Amazon Account' : 'Sign In')}
        </button>

        <p className={classes.login__terms}>
            By signing-in you agree to the Amazon Fake Clone Conditions of Use & Sale. Please see our Privacy Notice.
        </p>
      </form>

      <button onClick={() => setIsSigningUp(!isSigningUp)} className={classes.login__registerButton}>
        {isSigningUp ? 'Back to Sign In' : 'Create your Amazon account'}
      </button>
    </section>
  );
};

export default Auth;