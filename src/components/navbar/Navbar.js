import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Context } from "../../App";
import { auth } from "../../Fire";
import '../navbar/Navbar.css'
import logo from '../../assets/logo.svg'
const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header() {
  const user = useContext(Context);
  const [headersData, setHeadesData] = useState([
    {
      label: "Home",
      href: "/",
    },
    {
      label:"My Courses",
      href:"/mycourses"
    },
    {
      label: "Add Course",
      href: "/addCourse",
    },
 
    {
      label: "login",
      href: "/login",
    },
 
  ]);

  useEffect(() => {
    if (user){

    
    setHeadesData([
      {
        label: "Home",
        href: "/",
      },
      {
        label:"My Courses",
        href:"/mycourses"
      },
      {
        label: "Add Course",
        href: "/addCourse",
      },
   
      {
        label: "logout",
        href: "/",
      },
    ]);
  }
  }, [user]);

  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {UlarnLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{UlarnLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      if (label == "logout") {
        return (
          <MenuItem>
            {" "}
            <a
            onClick={()=>{auth.signOut().then(()=>window.location.reload())}}
            >
              {label}
            </a>
          </MenuItem>
        );
            }

        else{return (
            <Link
            {...{
              component: RouterLink,
              to: href,
              color: "inherit",
              style: { textDecoration: "none" },
              key: label,
            }}
            >
            <MenuItem>{label}</MenuItem>
            </Link>
            );
          }
          });
        };
        
  const UlarnLogo = (
 <p className="logo" >Ularn</p>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      if (label == "logout") {
        return (
          <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
          onClick={()=>{auth.signOut().then(()=>window.location.reload())}}
          >
              {label}
              </Button>
        );
            }
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            className: menuButton,
            to: href,
            component: RouterLink,
            className: menuButton,
            }}
        
          >{label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header} position="sticky">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
