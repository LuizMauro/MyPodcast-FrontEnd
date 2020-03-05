import React from 'react'
import { Link } from 'react-router-dom';
// reactstrap components
import {
    Container,  
    Row,
  } from "reactstrap";
import Lottie from 'react-lottie'

import * as animationData from '../../assets/animations/errorPage.json'



export default function NotFound(){ 

    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
      <>
            <Container className="pt-lg-5">
                <Lottie options={defaultOptions}
                height={200}
                width={200}
               />
               <Row >
                    <Container className="pt-lg-2" >
                        <h3 className="text-center" style={{color:"#EC2727", fontWeight:"bold"}}>
                            Erro: Sem permissão para acessar essa página! 
                            <Link to={"/Login"} className="text-center" style={{color: "#fff"}}> Ir para tela de login</Link> 
                        </h3>
                    </Container>
               </Row>
            </Container>
      </>
    );
}
