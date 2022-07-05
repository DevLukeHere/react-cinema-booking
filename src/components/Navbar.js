import React, { useState } from "react";
import {
  Button,
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  Box,
  AppBar,
} from "@mui/material";
import DialogWrapper from "./DialogWrapper";
import MenuIcon from "@mui/icons-material/Menu";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, logout } = UserAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e.message);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Cinema Central
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding style={{ justifyContent: "center" }}>
          <Link to={"/"} style={{ color: "black", textDecoration: "none" }}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Now Showing"} />
            </ListItemButton>
          </Link>
        </ListItem>
        {user ? (
          <ListItem disablePadding style={{ justifyContent: "center" }}>
            <Link
              to={"/account"}
              style={{ color: "black", textDecoration: "none" }}
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={"Account"} />
              </ListItemButton>
            </Link>
          </ListItem>
        ) : null}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            {user ? (
              <ListItemText onClick={handleSignOut} primary={"Sign Out"} />
            ) : (
              <ListItemText onClick={handleDialogOpen} primary={"Sign In"} />
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <DialogWrapper
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
      />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Cinema Central
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>Now Showing</Button>
            {user ? (
              <>
                <Button sx={{ color: "#fff" }}>Account</Button>
                <Button sx={{ color: "#fff" }}>Sign Out</Button>
              </>
            ) : (
              <Button sx={{ color: "#fff" }}>Sign In</Button>
            )}
          </Box>
          <Box
            sx={{
              textAlign: "end",
              width: "100%",
              display: { sm: "none" },
            }}
          >
            {user ? (
              <Button onClick={handleSignOut} color="inherit">
                Sign Out
              </Button>
            ) : (
              <Button onClick={handleDialogOpen} color="inherit">
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
