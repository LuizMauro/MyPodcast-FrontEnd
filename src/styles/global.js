import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';



export default createGlobalStyle`


    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing:border-box;
      
    }

    ul{
        list-style:none;
    }

    html,
    body {
    margin: 0;
    }

    #App {
    font-family: sans-serif;
    height: 100vh;
    }

    button:focus{
        outline:0;
    }

   

`;
