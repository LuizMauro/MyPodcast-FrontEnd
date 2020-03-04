import React from 'react';

import {  Button }  from './styles'


export default function index({ type, height, width, bg, color, Text }) {
  return(
        <>
         <Button type={type} height={height}  width={width} bg={bg} color={color}>
            {Text}
        </Button>
        </> 
  );
}