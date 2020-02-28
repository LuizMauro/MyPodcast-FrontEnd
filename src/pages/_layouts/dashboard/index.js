import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper }  from './styles'


 
export default function DashboardLayout({ children }) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

DashboardLayout.prototype = {
    children: PropTypes.element.isRequired,
}


