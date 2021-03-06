import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toArray } from '../../utils/toArray'
import firebase from '../../config/firebaseConfig'
import { useSelector } from "react-redux";

import { Container, Badge, NotificationsList, Scroll, Notification } from './styles';

import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

export default function Notifications() {
  const profile = useSelector((state) => state.user.profile);
  const [visible, setVisible] = useState(false);
  const database = firebase.database();
  const [notifications, setNotifications] = useState([])
  const [alert, setAlert] = useState()

  const app = database.ref().child('notifications/' + profile.usu_id );

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function formatDate(datetime){
    const dateParsed = formatRelative(datetime, new Date(), {
      locale: pt,
      addSuffix: true
    });

    return dateParsed;
  }

  useEffect( () => {
    let notifications;
       app.on('value', snap => { 
        console.log(snap.val())
        notifications = toArray(snap.val())
        let count = 0;

        notifications.map((item) => {
          if(!item.viewed){
            count++;
          }
        })

        

        setAlert(count)
        setNotifications(notifications.reverse())
      });

  }, [])

  async function visualizar(key, url){
    await database.ref(`notifications/` + profile.usu_id + "/" + key).update({
      viewed: 1
    });

  }

   function goToLink(key, url){
    visualizar(key, url)
    window.location = url
  }



  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={alert > 0 ? true : false}>
        <FaBell color="#fff" size={25} />
      </Badge>

      <NotificationsList visible={visible}>
        <Scroll>
          
        {notifications.length ? notifications.map((item) => (
          <Notification key={item.key}  unread={item.viewed ? false : true} >

            <span  onClick={() => goToLink(item.key, item.url)} style={{cursor:'pointer'}}>
              <p style={{color: "#fff"}}>{item.title}</p>
              <span> {formatDate(item.datetime)} </span>
            </span>

            <button onClick={() => visualizar(item.key, item.url)} style={{color:"#1BFDBE"}}>Marcar como lida</button>
          </Notification>
         )) : <span>Sem notificações no momento</span>}
        </Scroll>
      </NotificationsList>
    </Container>
  );
}