import React, { useState } from 'react';

import { Container, Input, Button } from 'reactstrap';
import { IoMdClose } from 'react-icons/io';

import Lottie from 'react-lottie'
import * as animationData from '../../assets/animations/like.json'

export default function Comentario({data, profile}) {
   const [comentarios, setComentarios] = useState(data);
   const [responder, setResponder] = useState(false);


   const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

  return(
        <>
         <div   style={{display: "flex", flexDirection: "column",flex:1, padding:20}}>
            <div style={{display: "flex", flexDirection: "row", flex:1, padding:5, height:50, marginBottom:10}}>
              <div style={{width: 50, height:50}}>
                {profile && (
                  <img
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  src={'https://api.adorable.io/avatars/285/' + profile.usu_email}
                  />
                )}

              </div>
              <div style={{width:"40%", height: 60,display:"flex",alignItems:"center", marginLeft:20}}>
                <p style={{color:"#fff", fontWeight: "bold", fontSize:20}}>

                  {profile !== null ? profile.usu_nome : "Não logado"}
                </p>
              </div>

            </div>

            <div style={{width: "100%", background: "#232659", minHeight: 80, maxHeight:"auto", borderRadius:4, padding:10, color:"#fff"}}>

                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                  <div  style={{display:"flex", flexDirection:"row", borderBottom:"1px dashed #ccc"}}>
                      <div style={{display:"flex",alignItems:"center", flexDirection:"row",}}>
                        <a onClick={() => {}}>
                          <Lottie  options={defaultOptions}
                                height={80}
                                width={80}
                                speed={2}
                                direction={1}
                              />
                          </a>
                          199
                      </div>

                      <div style={{display:"flex",alignItems:"center",marginLeft:30,flexDirection:"row"}}>
                          <a  onClick={() => { setResponder(true)}} style={{alignItems:"center",cursor:"pointer", color:"#1bfdbe"}}>
                            Responder
                          </a>
                      </div>

                  </div>


                        <div   style={{display:"flex", flexDirection:"column", marginLeft:"5%", marginTop:10}}>
                          Respostas
                          <div style={{display:"flex", flexDirection:"row", height:30,marginTop:5}}>
                            <div style={{width: 30, height:30}}>
                            {profile && (
                              <img
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                              src={'https://api.adorable.io/avatars/285/' + profile.usu_email}
                              />
                            )}
                            </div>

                            <div style={{width:"50%", height: 40,display:"flex", alignItems:"center", marginLeft:20}}>
                              <p style={{color:"#fff", fontWeight: "bold", fontSize:20}}>

                                {profile !== null ? profile.usu_nome : "Não logado"}
                              </p>
                            </div>
                          </div>
                          <div className="shadow" style={{width: "100%", background: "#232659", minHeight: 80, maxHeight:"auto", borderRadius:4, padding:10, color:"#fff"}}>
                          Lorem Ipsum is simply dummy text of theblishing software like Aldus PageMaker including versions of Lorem Ipsum.
                          </div>
                        </div>

                  </div>




              { responder && (
                <>
                <div style={{display:"flex", flexDirection:"column", marginLeft:"5%", marginTop:10}}>
                <a onClick={() => {setResponder(false)}}>
                  <IoMdClose size={35} style={{float:"right"}} color="#fff"></IoMdClose>
                </a>
                <textarea className="shadow" style={{width: "100%", background: "#232659", minHeight: 100, borderRadius:4, border:"1px solid #666", padding:5, color:"#fff"}}></textarea>
                <div className="text-right" style={{marginTop: 10}}>
                  <Button type="submit" color="primary" onClick={() => {}}>
                    Responder
                  </Button>
                </div>
                </div>

              </>
              )}
          </div>
        </>
  );
}
