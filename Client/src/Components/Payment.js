// import React, { useState } from "react";
// import Axios from "axios";
// import StripeCheckout from 'react-stripe-checkout'
// // import Safe from "react-safe"
// export const Payment = (items) => {
//     const handleToken = () => {
//         console.log(token);
//         Axios.post("/purchase", { body: { stripeTokenId: token.id, items: items } })
//             .then(function (res) { return res.json() })
//             .catch(function (error) { console.error(error) })
//     }
//     // var stripeHandler = StripeCheckout.configure({
//     //     key : process.env.STRIPE_PUBLIC_KEY,
//     //     locale : 'en',
//     //     token : function(token)
//     //     {
//     //       console.log(token);
//     //       //Axios.post("/purchase",{ body : { stripeTokenId : token.id,   items : items  }})
//     //       Axios.post("/purchase",{ body : { stripeTokenId : {},   items : {}  }})
//     //       .then(function(res) {return res.json()})
//     //     .catch(function(error) {console.error(error) })
//     //     }
//     // }) 
//     // function purchaseHandler()
//     // {
//     //     // Price is expected to be in cents if the payment is done with USD
//     //     stripeHandler.open({
//     //         // amount : price
//     //            amount : {}})
//     // }
//     return (<div>
//         <StripeCheckout
//             stripeKey="{token}"
//             token={handleToken}>
//         </StripeCheckout>

//     </div>);
// }
