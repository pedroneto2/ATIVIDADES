import 'components/template/MainTemplate/MainTemplate.scss';

import { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import TocIcon from '@mui/icons-material/Toc';

import logo from 'images/logotipo.png';
import anonymousUser from 'images/user-anonymous.png';

const toggleDrawer = (anchor, open, state, setState) => (event) => {
  if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  setState({ ...state, [anchor]: open });
};

const MainTemplate = ({ children, anchor, theme, setTheme }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const userImageLink = '';

  return (
    <div
      className={`main-template-container d-block d-md-flex ${
        theme === 'light' ? 'bg-primary text-black-50' : 'bg-dark text-info'
      }`}
    >
      <div
        className={`nav-hidden-links-container d-flex d-md-none justify-content-between ${
          theme === 'light' ? 'bg-light' : 'bg-secondary'
        }`}
      >
        <div className="main-template-logo-container d-flex align-items-end pb-3">
          <div className="d-flex">
            <img id="main-template-winmed-logo" src={logo} alt="Winmed" />
            <p className="ms-3">Winmed</p>
            <ModeStandbyIcon
              sx={{ color: '#896dca', marginLeft: '30px', transform: 'translateY(22px)' }}
            />
          </div>
        </div>
        <Button onClick={toggleDrawer(anchor, true, state, setState)}>
          <TocIcon sx={{ color: `${theme === 'light' ? '#2f2f2f' : '#c8c8c8'}` }} />
        </Button>
      </div>

      <div
        className={`nav-links-container d-none d-md-block ${
          theme === 'light' ? 'bg-light' : 'bg-secondary'
        }`}
      >
        <div className="main-template-logo-container d-flex align-items-end justify-content-evenly">
          <div className="d-flex">
            <img id="main-template-winmed-logo" src={logo} alt="Winmed" />
            <p className="ms-3">Winmed</p>
          </div>
          <ModeStandbyIcon sx={{ color: '#896dca', marginLeft: '25px' }} />
        </div>
        <div className="links">
          <List>
            <ListItem button>
              <ListItemIcon sx={{ minWidth: '35px' }}>
                <HomeIcon sx={{ color: `${theme === 'light' ? '#2f2f2f' : '#c8c8c8'}` }} />
              </ListItemIcon>
              <ListItemText primary="Dashboards" />
              <span id="nav-dashboard-notification">2</span>
              <ArrowForwardIosIcon
                sx={{ fontSize: '11px', color: `${theme === 'light' ? '#2f2f2f' : '#c8c8c8'}` }}
              />
            </ListItem>
          </List>
        </div>
      </div>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false, state, setState)}
        onOpen={toggleDrawer(anchor, true, state, setState)}
        PaperProps={{
          sx: {
            backgroundColor: `${theme === 'light' ? '#ffff' : '#36364e'}`,
            color: `${theme === 'light' ? '#2f2f2f' : '#c8c8c8'}`,
          },
        }}
      >
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, true, state, setState)}
          onKeyDown={toggleDrawer(anchor, true, state, setState)}
        >
          <List>
            <ListItem button>
              <ListItemIcon sx={{ minWidth: '35px' }}>
                <HomeIcon sx={{ color: `${theme === 'light' ? '#2f2f2f' : '#c8c8c8'}` }} />
              </ListItemIcon>
              <ListItemText primary="Dashboards" />
              <span id="nav-dashboard-notification">2</span>
              <ArrowForwardIosIcon
                sx={{ fontSize: '11px', color: `${theme === 'light' ? '#2f2f2f' : '#c8c8c8'}` }}
              />
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
      <div className="show-area p-4 w-100">
        <div
          className={`info-bar shadow p-3 mb-4 rounded w-100 d-flex justify-content-between align-items-center ${
            theme === 'light' ? 'bg-light' : 'bg-secondary'
          }`}
        >
          <div>
            <MailOutlineIcon />
            <ArrowDropDownIcon sx={{ transform: 'translateY(-15px)' }} />
          </div>
          <div className="user-info-container d-flex align-items-center">
            {theme === 'light' ? (
              <DarkModeOutlinedIcon onClick={() => setTheme('dark')} />
            ) : (
              <WbSunnyOutlinedIcon onClick={() => setTheme('light')} />
            )}
            <SearchOutlinedIcon sx={{ marginLeft: '10px' }} />
            <div className="user-container d-flex flex-column align-items-end ms-2 ms-sm-5">
              <p className="fs-6 m-0 fw-bold">Rodolfo</p>
              <p className={`fs-6 m-0 ${theme === 'light' ? 'text-black-50' : 'text-info'}`}>
                admin
              </p>
            </div>
            {userImageLink ? (
              <img id="main-template-user-image" src={userImageLink} alt="user" />
            ) : (
              <img id="main-template-user-image" src={anonymousUser} alt="anonymous user" />
            )}
            <CircleIcon
              sx={{
                color: 'green',
                fontSize: '14px',
                transform: 'translate(-15px,15px)',
                background: 'green',
                border: '2px solid white',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};
export default MainTemplate;
