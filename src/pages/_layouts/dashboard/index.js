import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Wrapper } from "./styles";
import Navbar from "../../../components/NavbarDash/Navbar";
import SidebarPod from "../../../components/SidebarPodcaster/index";
import SidebarMod from "../../../components/SidebarMod/index";
import SidebarPremium from "../../../components/SidebarPremium/index";
import { signOut } from "../../../store/modules/auth/actions";
import { useDispatch } from "react-redux";

export default function DashboardLayout({ children }) {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Wrapper>
      {profile.tus_id === 4 ? (
        <Navbar signOut={handleSignOut} teste={children} />
      ) : profile.tus_id === 3 ? (
        <SidebarMod signOut={handleSignOut} teste={children} />
      ) : profile.tus_id === 2 && profile.usu_premium ? (
        <SidebarPremium signOut={handleSignOut} teste={children} />
      ) : (
        <SidebarPod signOut={handleSignOut} teste={children} />
      )}
    </Wrapper>
  );
}

DashboardLayout.prototype = {
  children: PropTypes.element.isRequired,
};
