import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import api from "../../../services/api";
import axios from "axios";
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
import * as success from "../../../assets/animations/success_credit_card.json";
import * as procces from "../../../assets/animations/procces_credit_card.json";
import * as errorCard from "../../../assets/animations/error_credit_card.json";
import Lottie from "react-lottie";

import { useSelector } from "react-redux";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [plano, setPlano] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [respClientSecret, SetrespClientSecret] = useState(null);

  const [buttonPodCaster, setButtonPodCaster] = useState("");
  const [buttonOuvinte, setButtonOuvinte] = useState("");
  const [errorProvider, setErrorProvider] = useState("");

  const profile = useSelector((state) => state.user.profile);
  const usu_email = profile.usu_email;
  const usu_nome = profile.usu_nome;

  useEffect(async () => {
    // Create PaymentIntent as soon as the page loads
  }, []);

  async function createIntent(item) {
    SetrespClientSecret(false);

    const response = await api.post("create-payment-intent", {
      items: item,
    });

    console.log(response);
    setClientSecret(response.data.clientSecret);
    SetrespClientSecret(true);
  }

  async function sendMail(plano) {
    let price = 200;
    if (plano === "Mensal") {
      price = 20;
    }
    await api.post("/sendmail", { usu_email, usu_nome, price, plano });
  }

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    console.log(profile);
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    console.log(elements.getElement(CardElement));

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: profile.usu_email,
          name: profile.usu_nome,
        },
      },
      return_url: "http://localhost:3000/",
      receipt_email: profile.usu_email,
    });
    console.log("TESTE - > ", payload);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log("infos ->", payload);
      console.log("ID->", payload.paymentIntent.id);
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      sendMail(payload.paymentIntent.description);
    }
  };

  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const proccesOptions = {
    loop: true,
    autoplay: true,
    animationData: procces.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const errorOptions = {
    loop: false,
    autoplay: true,
    animationData: errorCard.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function Plano(id) {
    if (id === 1) {
      createIntent({ id: "Mensal", price: 2000 });
      setButtonPodCaster("");
      setButtonOuvinte("buttonActive");
    } else {
      createIntent({ id: "Anual", price: 20000 });
      setButtonOuvinte("");
      setButtonPodCaster("buttonActive");
    }
    setErrorProvider("");
  }

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
                <Row lg="12" className="mb-3">
                  <Col xs="6">
                    <Button
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#232659",
                        border: "none",
                        padding: "10px 0 10px 0",
                        color: "#1BFDBE",
                      }}
                      className={buttonOuvinte}
                      onClick={(e) => Plano(1)}
                    >
                      <p className="mt-2">Mensal</p>
                    </Button>
                  </Col>
                  <Col xs="6">
                    <Button
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "#232659",
                        border: "none",
                        padding: "10px 0 10px 0",
                        color: "#1BFDBE",
                      }}
                      className={buttonPodCaster}
                      onClick={(e) => Plano(2)}
                    >
                      <p className={"mt-2"}>Anual</p>
                    </Button>
                  </Col>
                  <Col xs="12 mt-2">
                    <p className="text-center" style={{ color: "red" }}>
                      {errorProvider !== "" ? errorProvider : " "}
                    </p>
                  </Col>
                </Row>

                {respClientSecret === false && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <ClipLoader size={50} color={"#fff"} />
                  </div>
                )}

                {respClientSecret && !succeeded && (
                  <form
                    id="payment-form"
                    onSubmit={handleSubmit}
                    style={{ margin: 0 }}
                  >
                    <CardElement
                      id="card-element"
                      options={cardStyle}
                      onChange={handleChange}
                    />
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

                    {/* <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Pagamento feito com sucesso!
                    </p> */}
                  </form>
                )}
                {/* Show a success message upon completion */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {processing && (
                    <Lottie
                      style={{ margin: 30 }}
                      options={proccesOptions}
                      height={200}
                      width={320}
                    />
                  )}

                  {succeeded && (
                    <Lottie
                      style={{ margin: 30 }}
                      options={successOptions}
                      height={120}
                      width={120}
                    />
                  )}

                  {succeeded && (
                    <h3 style={{ color: "#00c885", fontWeight: "bold" }}>
                      Pagamento realizado com sucesso!
                    </h3>
                  )}

                  {error && (
                    <Lottie
                      style={{ margin: 30 }}
                      options={errorOptions}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
