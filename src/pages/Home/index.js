import React,{ useEffect, useState } from 'react'
import {Link, } from 'react-router-dom'
import Menu from '../../components/Menu'
import api from '../../services/api'
import { IoIosSearch } from 'react-icons/io';
import history from '../../services/history'

// reactstrap components
import {
  Container,
  Button,
  Input,
  FormGroup,
} from "reactstrap";


export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [select, setSelect] = useState("");
 


  function handleSubmit(){
      history.push(`/pesquisar?select=${select}&pesquisa=${pesquisa}`);
   }

  useEffect(() => {

    async function loadPodCasters(){
      const response = await api.get('/podcasts');
      setPodcasts(response.data);
    }

    async function loadCategoria(){
      const response = await api.get('/categoria');
      setCategorias(response.data);
    }

    
    loadPodCasters();
    loadCategoria();

  },[])
  


    return (
      <>
        <Menu></Menu>
        <Container>
           
              <FormGroup className="search-home-shadow">
                  <div style={{display:"flex", direction:"row", flex:0.5, justifyContent:"center", marginTop:"10%"}}>
                    <div style={{flex:1}}>
                      <Input 
                      className="select-home"
                       type="select"
                        name="select" 
                        id="exampleSelect" p
                        onChange={(e) => setSelect(e.target.value) }
                        >

                      <option disabled selected> Selecione </option>
                        {categorias.map(item =>(
                         
                            <option key={item.ctg_id} value={item.ctg_id}>{item.ctg_descricao}</option>
                        ))}
                      
                      </Input>
                    </div>
                    <div style={{flex:2}}>
                      <Input onChange={(e) => setPesquisa(e.target.value)} className="input-search-home" type="text" name="pesquisa" />
                    </div>

                    <div style={{lex:1}}>
                      <Button onClick={handleSubmit} className="button-search-home"><IoIosSearch size={30}></IoIosSearch></Button>
                    </div>
                  </div>
                </FormGroup>  
        </Container>

        
          <div style={{flex:1, display:"flex", justifyContent: "space-around", flexWrap:"wrap", marginTop: "10%"}}>
            
            {podcasts.map(item => (
              (item.pod_destaque == 1 && item.pod_status ===1 )&&
              <div key={item.pod_id} className="card-home">
                <Link style={{width:"100%", height:"100%"}}>
                  <img style={{width:"100%", height:"100%", borderRadius:15}} src={"http://localhost:3333/files/"+item.pod_endereco_img}/>
                </Link>
                <h3 style={{color:"#fff"}} className="text-center"><Link style={{color:"#fff"}}>{item.pod_nome}</Link></h3>
               </div>
            ))}
            
           
          </div>
      
       
      </>
    )
}
