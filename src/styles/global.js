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

    .active{
        background:#232659;
        border-top-left-radius:20px;
        border-bottom-left-radius:20px;
        margin-bottom:10px;
        width:200%;
        padding:15px 0px;
    }

`;
