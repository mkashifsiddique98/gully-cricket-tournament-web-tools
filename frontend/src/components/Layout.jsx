/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import SideBar from "./SideBar";
import { useTheme } from "@mui/material/styles";
import { Box, Container, useMediaQuery } from "@mui/material";

const Layout = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  
  // Sidebar state management
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(matches);
  }, [matches]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Header */}
      <Header handleSidebar={toggleSidebar} />
      {/* Sidebar */}
      <Box sx={{ display: "flex", height: "100vh", mt: 10 }}>
        <SideBar SidebarOpen={sidebarOpen} />
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  );
};

// PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
