import styled from 'styled-components';


export const Button = styled.button`
        margin:10px;
        background: ${props => props.bg};
        color: ${props => props.color};
        padding: 10px !important;
        height: ${props => props.height};
        width: ${props => props.width};

        border: none;
        border-radius:5px;
        box-shadow: 6px 6px 30px rgba(0,0,0,0.3);

        display:flex;
        justify-content:center;
        align-items:center;

        font-weight:700;
        cursor: pointer;
`;


