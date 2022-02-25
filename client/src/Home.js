import React, { useState, useEffect } from "react";
import "./HomeStyle.css"
import Axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Layout() {
  const [items, setItmes] = useState([])
  const cartData = useStoreState((state) => state.cartItems)
  const addToCart = useStoreActions(actions => actions.addToCart)
  const increaseCartItem = useStoreActions(actions => actions.increaseCartItem)
  const history = useHistory()
  let existData

  const checkCart = async (item) => {
    if (cartData.length == 0) {
      await addToCart(item)
      NotificationManager.success('Added To Cart', "Success", 800)
    }
    else {
      existData = cartData.filter(data => {
        return data._id == item._id
      })
      if (existData === -1 || existData === undefined || existData.length === 0) {
        await addToCart(item)
        NotificationManager.success('Added To Cart', "Success", 800)
      }
      else {
        increaseCartItem(cartData.indexOf(existData[0]))
        NotificationManager.success('Cart updated', "Success", 800)
      }
    }
  }

  const buyNow = async (item) => {
    checkCart(item)
    history.push('/cart')
  }
  //    Getting Items Data from mongodb data base using Axios 

  useEffect(() => {
    Axios.get("https://ecommerce-charanpreet.herokuapp.com/items/data")
      .then((res) => {
        setItmes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  function displayCard() {
    if (!items.length) return null;

    return items.map((item, idx) => (
      <article className=" br3 sans-serif w-30-l pa2 mr2 mt2 mb3" key={idx} id="card">
        <img src={item.url} className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." />
        <div className="pa2 ph3-ns pb3-ns">
          <div className="dt w-100 mt1">
            <div className="dtc">
              <h1 className="f5 f4-ns mv0">{item.title}</h1>
            </div>
            <div className="dtc tr">
              <h2 className="f5 mv0">₹ {item.price}</h2>
            </div>
          </div>
          <p className="f6 lh-copy measure mt2 mid-gray">{item.description}</p>
          <Link
            className="br4 f6 link dim ba bw2 ph3 pv2 mb2 dib near-black"
            to="#0"
            onClick={() => buyNow(item)}
          >
            Buy Now
          </Link>
          <Link
            className="br4 f6 link dim ba bw2 ph3 pv2 mb2 ml2 dib dark-blue"
            href="#0"
            onClick={() => checkCart(item)}
          >
            Add To Cart
          </Link>
        </div>
      </article >
    ));
  }

  return (
    <section className="flex flex-wrap justify-around center mw9">
      <img className="grow br4 mt2 front image" src="https://i.postimg.cc/9Q4MsCh9/FRONTPAGE.jpg" />
      {displayCard()}
      <NotificationContainer />
    </section>
  );
}