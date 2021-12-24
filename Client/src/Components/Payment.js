import React, {  useState } from "react";
import Axios from "axios";;
export const Payment= () => 
{
    var stripeHandler = StripeCheckout.configure({
        key : process.env.STRIPE_PUBLIC_KEY,
        locale : 'en',
        token : function(token)
        {
          console.log(token);
          Axios.post("/purchase",{ body : { stripeTokenId : token.id,   items : items  }})
          .then(function(res) {return res.json()})
        .catch(function(error) {console.error(error) })
        }
    }) 
    function purchaseHandler()
    {
        // Price is expected to be in cents if the payment is done with USD
        stripeHandler.open({
            amount : price
        })
    }
    return
    (
        <div id="payment">
        <h1>Payment Page</h1>
        </div>
    )
}
// export default Payment;