import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link,useHistory } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'

export default function Layout() {
  const [items, setItmes] = useState([])
  const cartData = useStoreState((state) => state.cartItems)
  const addToCart = useStoreActions(actions => actions.addToCart)
  const increaseCartItem = useStoreActions(actions => actions.increaseCartItem)
  let existData
  const history = useHistory()

  function checkCart(item) {
    if (cartData.length == 0)
      addToCart(item)
    else {
      existData = cartData.filter(data => {
        return data._id == item._id
      })
      if (existData === -1 || existData === undefined || existData.length === 0)
        addToCart(item)
      else
        increaseCartItem(cartData.indexOf(existData[0]))
    }
  }

  const buyNow = async(item) => {
    await checkCart(item)
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
  });

  function displayCard() {
    if (!items.length) return null;

    return items.map((item, idx) => (
      <article className="w-30-l pa2 mr2" key={idx}>
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
            className="f6 link dim ba bw2 ph3 pv2 mb2 dib near-black"
            to="#0"
            onClick={() =>buyNow(item) }
          >
            Buy Now
          </Link>
          <Link
            className="f6 link dim ba bw2 ph3 pv2 mb2 ml2 dib dark-blue"
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
      {displayCard()}
    </section>
  );
}