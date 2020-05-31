import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement
} from "@stripe/react-stripe-js";

import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    Container,
    Row,
    Col,
    CardTitle,
  } from "reactstrap";
  import ClipLoader from "react-spinners/ClipLoader";
  import * as success from '../../../assets/animations/success_credit_card.json'
  import * as procces from '../../../assets/animations/procces_credit_card.json'
  import * as errorCard from '../../../assets/animations/error_credit_card.json'
  import Lottie from 'react-lottie'

  
   

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [plano, setPlano] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

   useEffect( async() => {
    // Create PaymentIntent as soon as the page loads
   
  }, []);

  async function createIntent(item){
    const response = await axios.post("http://localhost:3333/create-payment-intent",{
      items:item
  })

  console.log(response)
  setClientSecret(response.data.clientSecret);

  }

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    console.log(elements.getElement(CardElement));

  

    const payload = await stripe.confirmCardPayment(clientSecret, {
      
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: "luizm1997@hotmail.com",
          name: "Luiz Mauro"
        },
      },
      return_url: "http://localhost:3000/",
      receipt_email: "luizm1997@hotmail.com"
    });
    console.log("TESTE - > ", payload);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log();
    
      console.log("ID->",payload.paymentIntent.id);
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const successOptions = {
    loop: false,
    autoplay: true, 
    animationData: success.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const proccesOptions = {
    loop: true,
    autoplay: true, 
    animationData: procces.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const errorOptions = {
    loop: false,
    autoplay: true, 
    animationData: errorCard.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <section className="section section-shaped section-lg">
    <Container className="pt-lg-1">
      <Row style={{ justifyContent: "center" }}>
        <Col lg="12">
          <Card className="bg-secondary shadow border-0">
            <CardBody
              className="px-lg-5 py-lg-5"
              enctype="multipart/form-data"
            >
              <button onClick={() => createIntent({id:"Plano 1", price: 3000})}>Plano 1</button>
              <button onClick={() => createIntent({id:"Plano 2", price: 5000})}>Plano 2</button>
                  <form id="payment-form" onSubmit={handleSubmit} style={{margin:0}}>
                      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                      <button
                      className="buttonPagar"
                        disabled={processing || disabled || succeeded}
                        id="submit"
                      >
                        <span id="button-text">
                          {processing ? (
                          <ClipLoader size={30} color={"#fff"} />
                          ) : (
                            "Comprar"
                          )}
                        </span>
                      </button>
                      {/* Show any error that happens when processing the payment */}
                      
                      {/* Show a success message upon completion */}
                    
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    {processing && (
                        <Lottie style={{margin:30}} options={proccesOptions}
                      
                        height={200}
                        width={320}
                       />
                      )}

                      {succeeded && (
                        <Lottie style={{margin:30}} options={successOptions}
                        height={120}
                        width={120}
                       />
                      )}

                      {succeeded && (
                       <h3 style={{color:"#00c885", fontWeight:"bold"}}>
                         Pagamento realizado com sucesso!
                       </h3>
                      )}

                      {error && (
                       <Lottie style={{margin:30}} options={errorOptions}
                       height={120}
                       width={120}
                      />
                      )}

                      {error && (
                        <div className="card-error" role="alert">
                          {error}
                        </div>
                      )}
                    </div>
                      

                      {/* <p className={succeeded ? "result-message" : "result-message hidden"}>
                      Pagamento feito com sucesso!
                      </p> */}
                    </form>

            </CardBody>
            </Card>
            </Col>
            </Row>
            </Container>
            </section>
   

  
  );
}
