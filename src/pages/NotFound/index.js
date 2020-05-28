import React from 'react'
// reactstrap components
import {
    Container,
  } from "reactstrap";
import Lottie from 'react-lottie'
import Menu from '../../components/Menu'
import * as animationData from '../../assets/animations/404.json'



export default function NotFound(){

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
      <>
      <Menu></Menu>
            <Container className="">
                <Lottie options={defaultOptions}
                height={600}
                width={600}
               />
            </Container>
      </>
    );
}
