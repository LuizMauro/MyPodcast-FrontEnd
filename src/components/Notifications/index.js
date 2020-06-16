import React, { useState } from 'react';

import { MdNotifications } from 'react-icons/md';

import { Container, Badge, NotificationsList, Scroll, Notification } from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }


  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread>
        <MdNotifications color="#fff" size={20} />
      </Badge>

      <NotificationsList visible={visible}>
        <Scroll>
          <Notification uread>
            <p>Voce possui um novo agendamento para amanha</p>
            <time>ha 2 dias</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Voce possui um novo agendamento para amanha</p>
            <time>ha 2 dias</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Voce possui um novo agendamento para amanha</p>
            <time>ha 2 dias</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Voce possui um novo agendamento para amanha</p>
            <time>ha 2 dias</time>
            <button type="button">Marcar como lida</button>
          </Notification>
          <Notification>
            <p>Voce possui um novo agendamento para amanha</p>
            <time>ha 2 dias</time>
            <button type="button">Marcar como lida</button>
          </Notification>
        </Scroll>
      </NotificationsList>
    </Container>


  );
}