import Box from "@mui/material/Box";
import React from "react";

import Header from "./Header";
import NavActions from "./NavActions";
import { navbarContainerStyles } from "./styles";

export const Navbar: React.FC = () => {
  return (
    <Box component="header" sx={navbarContainerStyles} className="app-navbar">
      <Header />
      <NavActions />
    </Box>
  );
};
export default Navbar;
