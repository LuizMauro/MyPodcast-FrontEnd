import React from "react";	
import { loadStripe } from "@stripe/stripe-js";	
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutform.js";	
import "./style.css"

const promise = loadStripe("pk_test_wih1P39k7lCPP4sAW1afmh08005Ux0NVvw");

export default function index() {

  return (
    <Elements stripe={promise} >
      <CheckoutForm />
    </Elements>
  );	 
}