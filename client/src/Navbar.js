import React, { useContext } from 'react'
import { useStoreState } from 'easy-peasy'
import { Link } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import LogOutBtn from './Auth/LogOutBtn'
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default function Navigation() {
    const count = useStoreState(state => state.cartItems)
    const { loggedIn } = useContext(AuthContext)

    return (
        <nav className="sans-serif db dt-l w-100 border-box pa3 ph5-l bg-black-90">
            <Link className="db dtc-l v-mid mid-gray link dim w-100 w-25-l tc tl-l mb2 mb0-l" to="/" title="Home">
                <img src="http://tachyons.io/img/logo.jpg" className="dib w2 h2 br-100" alt="Site Name"/>
            </Link>
            { loggedIn === false
                ?
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <Link className="link white-90 f6 f5-l dib mr3 mr4-l" to='/' title="Home">Home</Link>
                    <Link className="link white-90 f6 f5-l dib mr3 mr4-l" to="#" title="How it Works">How it Works</Link>
                    <Link className="link white-90 f6 f5-l dib mr3 mr4-l" to='/cart'>Cart({count.length})</Link>
                    <Link className="link white-90 f6 f5-l dib mr3 mr4-l" to='/Register'>Register</Link>
                    <Link className="link white-90 f6 f5-l dib mr3 mr4-l" to='/Login'>Login</Link>
                </div> :
                <div className="db dtc-l v-mid w-100 w-75-l tc tr-l">
                    <Link className="link white-90 f6 f5-l dib mr3 mr4-l" to='/' title="Home">Home</Link>
                    <a className="link white-90 f6 f5-l dib mr3 mr4-l" href="#" title="How it Works">How it Works</a>
                    <Link className="link white-90 f6 f5-l dib mr3 mr4-l" to='/cart'>Cart({count.length})</Link>
                    <LogOutBtn/>
                </div>
            }
        </nav>
    )
}

