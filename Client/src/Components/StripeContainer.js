import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_TYooMQauvdEDq54NiTphI7jx"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
        <div>Hello
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
        </div>
	)
}