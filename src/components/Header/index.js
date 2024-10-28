import React, { useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import './Header.css';  // Add this import

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  let isAppInstalled = false;

  if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  };

  const titleStyle = {
    fontSize: '1.5em',
    transition: 'all 0.3s ease',
    color: isHovered ? '#c8d645' : 'inherit',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  return (
    <Menu stackable inverted>
      <Menu.Item header>
        <h2 
          style={titleStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Javascript Quiz
        </h2>
      </Menu.Item>
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
