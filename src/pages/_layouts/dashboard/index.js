import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { Wrapper }  from './styles'
import Navbar from '../../../components/NavbarDash/Navbar';
import SidebarPod from '../../../components/SidebarPodcaster/index'

 
export default function DashboardLayout({ children }) {
    const profile = useSelector((state) => state.user.profile);

    return (
        <Wrapper>
            {profile.tus_id === 4 ? <Navbar teste={children}/> : <SidebarPod teste={children}/> }
            
        </Wrapper>
    )
}

DashboardLayout.prototype = {
    children: PropTypes.element.isRequired,
}


