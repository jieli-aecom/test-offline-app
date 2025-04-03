import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface Props {
  sidebarContent?: React.ReactNode;
  mainContent?: React.ReactNode;
}

export const SidebarLayout = (props: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <div className="flex w-full h-full">
      {/* Sidebar | Tailwind shadows don't work in Edge */}
      <div
        className="w-80 lg:w-96 h-full hidden lg:flex bg-white"
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        {props.sidebarContent}
      </div>

      {/* Button to open sidebar */}
      <div className="w-18 h-12 p-2 flex lg:hidden">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ width: "2rem", height: "2rem", ml: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Main */}
      <div className="grow w-full h-full overflow-x-hidden overflow-y-auto p-2">
        {props.mainContent}
      </div>
      <div className="block lg:hidden">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {props.sidebarContent}
        </Drawer>
      </div>
    </div>
  );
};
