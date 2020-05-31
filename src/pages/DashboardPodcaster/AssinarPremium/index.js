import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutform.js";
import "./style.css"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_azCrKTmhQ2ph9NJeCHRCAPxH006ldhL02m");

export default function index() {
  return (
   
      <Elements stripe={promise} >
        <CheckoutForm />
      </Elements>
   
  );
}
