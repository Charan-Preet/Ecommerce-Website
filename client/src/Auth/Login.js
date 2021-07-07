import axios from "axios";
import './loginStyle.css'
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom'

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("")

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  function displayError() {
    if(errorMessage)
      return (
        <div className='Error br4 center ma3 pa2'>
          <div className='tc'>{errorMessage}</div>
        </div>
      )
  }

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      // await axios.post("http://localhost:5000/auth/login", loginData);
      await axios.post(
        "https://ecommerce-charanpreet.herokuapp.com/users/login",
        loginData
      );
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      if(err) {
        seterrorMessage(err.response.data.errorMessage)
      }
    }
  }

  return (
    <main id='test' className="pa4 black-80 pb5">
      <form onSubmit={login} className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
          {displayError()}
          <div className="mt3">
            <label className="db fw6 lh-copy f6" for="email-address">
              Email
            </label>
            <input
              className="br4 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" for="password">
              Password
            </label>
            <input
              className="br4 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="password"
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
            />
          </div>
          <label className="pa0 ma0 lh-copy f6 pointer">
            <input type="checkbox" /> Remember me
          </label>
        </fieldset>
        <div className="">
          <input
            className="br4 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
          />
        </div>
        <div className="lh-copy mt3">
          <Link to='/register' className="f6 link dim black db">
            Sign up
          </Link>
          <a href="#0" className="f6 link dim black db">
            Forgot your password?
          </a>
        </div>
      </form>
    </main>
  )
}
