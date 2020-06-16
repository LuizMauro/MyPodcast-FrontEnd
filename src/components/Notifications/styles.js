import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';


import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
 

  ${props => 
    props.hasUnread && css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 10px;
        height: 10px;
        background: #1BFDBE;
        content: '';1BFDBE
        border-radius: 50%;
    }
  `}
`;

export const NotificationsList = styled.div`
  
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: #30346df5;
  border-radius: 4px;
  padding: 20px;
  z-index: 1;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #30346df5;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
`;

export const Notification = styled.div`
  color: #fff;

  & + div {
    margin-top:  15px;
    padding-top: 15px;
    border-top: 1px solid #ccc;
  }


  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    font-size: 12px;
    opacity: 0.6;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
    padding: 0 5px;
    margin: 0 5px;
    border-left: 1px solid #30346ded;
  }

  ${props => 
    props.unread && css`
      &::after {
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #1BFDBE;
        border-radius: 50%;
    }
  `}
`;