import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper }  from './styles'
import Navbar from '../../../components/NavbarDash/Navbar';

 
export default function DashboardLayout({ children }) {
    return (
        <Wrapper>
            <Navbar/>
            {children}
        </Wrapper>
    )
}

DashboardLayout.prototype = {
    children: PropTypes.element.isRequired,
}


