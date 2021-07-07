import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import StripeCheckout from 'react-stripe-checkout'
import { Link } from 'react-router-dom'
import './cartStyle.css'

export default function Cart() {
    const Items = useStoreState((state) => state.cartItems)
    const removeFromCart = useStoreActions(actions => actions.removeFromCart)
    const increase = useStoreActions(actions => actions.increaseCartItem)
    const decrease = useStoreActions(actions => actions.decreaseCartItem)

    const data = Items.map(item => item)
    let sum = 0
    for (var i = 0; i < data.length; i++) {
        sum += data[i].price * data[i].cart_quantity
    }

    const removeZeroItem = () => {
        Items.map(item => {
            if (item.cart_quantity < 1)
                removeFromCart(item._id)
        })
    }

    const displayCard = () => (Items.length === 0) ? (<h1 className='tc h5'>Add Items to Cart</h1>)
        : (
            // Stripe Payment Gateway
            <div className='sans-serif'>

                <section className="ph3 ph5-ns pv5">
                    <article className="payment mw7 center br3 ba b--light-blue bg-lightest-blue">
                        <div className="dt-ns dt--fixed-ns w-100">
                            <div className="pa3 pa4-ns dtc-ns v-mid">
                                <div>
                                    <h2 style={{ color: "#3e4152", fontSize: "18px" }} className="mt0 mb0">Total Amount: ₹{sum} </h2>
                                </div>
                            </div>
                            <div class="pa3 pa4-ns dtc-ns v-mid">
                                <StripeCheckout>
                                    <Link to="#" id="payment-button" className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br3">Pay via Stripe</Link>
                                </StripeCheckout>
                            </div>
                        </div>
                    </article>
                </section>

                {/* Products Cards */}

                <div className="flex flex-wrap justify-around center mw9">
                    {Items.map((item, idx) => (
                        <article className="br4 w-30-l pa2 mr2 mb2 mt0" key={idx} id="card">
                            <img src={item.url} className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." />
                            <div className="pa2 ph3-ns pb3-ns">
                                <div className="dt w-100 mt1">
                                    <div className="dtc">
                                        <h1 className="f5 f4-ns mv0">{item.title}</h1>
                                    </div>
                                    <div className="dtc tr">
                                        <h2 className="f5 mv0">₹{item.price * item.cart_quantity}</h2>
                                    </div>
                                </div>
                                <p className="f6 lh-copy measure mt2 mid-gray">{item.description}</p>
                                <div className='buttons flex justify-between'>
                                    <div>
                                        <div className='flex justify-between'>
                                            <Link className='mr1' onClick={() => decrease(Items.indexOf(item))}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" alt="decrease quantity of product" viewBox="0 0 512 512"><path d="M256 0C114.9 0 0 114.8 0 256s114.9 256 256 256c141.2 0 256-114.8 256-256S397.1 0 256 0zM256 472.3c-119.3 0-216.3-97-216.3-216.3S136.7 39.7 256 39.7 472.3 136.7 472.3 256 375.3 472.3 256 472.3z" /><path d="M355.1 234.4H156.9c-10.9 0-19.8 8.9-19.8 19.8s8.9 19.8 19.8 19.8h198.3c10.9 0 19.8-8.9 19.8-19.8S366.1 234.4 355.1 234.4z" /></svg>
                                            </Link>
                                            <div className="v-mid">{item.cart_quantity}</div>
                                            <Link className='ml1' onClick={() => increase(Items.indexOf(item))}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="23" alt="increase quantity of product" viewBox="0 0 512 512"><path d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.9 256-256S397.2 0 256 0zM256 472.3c-119.3 0-216.3-97-216.3-216.3S136.7 39.7 256 39.7 472.3 136.7 472.3 256 375.3 472.3 256 472.3z" /><path d="M355.1 234.4H275.8v-79.3c0-10.9-8.9-19.8-19.8-19.8s-19.8 8.9-19.8 19.8v79.3h-79.3c-11 0-19.8 8.9-19.8 19.8s8.9 19.8 19.8 19.8h79.3v79.3c0 10.9 8.9 19.8 19.8 19.8s19.8-8.9 19.8-19.8v-79.3h79.3c11 0 19.8-8.9 19.8-19.8S366.1 234.4 355.1 234.4z" /></svg>
                                            </Link>
                                            {removeZeroItem()}
                                        </div>
                                    </div>
                                    <div>
                                        <Link class="f6 link dim ph3 pv2 mb2 dib white bg-light-purple br4 shadow-3" onClick={() => removeFromCart(item._id)}>Remove Item</Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        )

    return (
        <section>
            {displayCard()}
        </section>
    )
}