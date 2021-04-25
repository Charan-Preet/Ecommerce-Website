import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {Link} from 'react-router-dom'

export default function LogOutBtn() {
    const { getLoggedIn } = useContext(AuthContext);

    const history = useHistory();

    async function logOut() {
        await axios.get(
            "https://ecommerce-charanpreet.herokuapp.com/users/logout"
        );
        await getLoggedIn();
        history.push("/");
    }

    return <Link className='white-90 no-underline' to=''><button className='white-90 bn bg-transparent pointer:hover' onClick={logOut}>Logout</button></Link>;
}
