import styled from 'styled-components'

export const Wrapper = styled.div`
    height:100%;
    background:#fff;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`;


export const Content = styled.div`
    width:100%;
    max-width:315px;
    text-align:center;

    form{
        display:flex;
        flex-direction:column;
        margin-top:30px;

        input{
            background: rgba(0,0,0,0.1);
            border:0;
            border-radius:5px;
            height: 44px;
            padding:0 15px;
            color:#fff;
            margin:0 0 10px;
        }

    }
`;



