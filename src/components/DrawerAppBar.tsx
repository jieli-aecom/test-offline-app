import { ReactNode, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import icon from "../assets/icon.png";

export enum Page {
  Introduction = 'Introduction',
  ManageScenarios = 'Manage Scenarios',
  ScenarioParameters = 'Scenario Parameters',
  CapabilityReview = 'Capability Review',
  PlannedActions = 'Planned Actions',
  CapabilityAssessment = 'Capability Assessment',
  Reports = 'Reports',
  DataManager = 'Data Manager',
}

export const pages: Page[] = [
  Page.Introduction,
  Page.ManageScenarios,
  Page.ScenarioParameters,
  Page.CapabilityReview,
  Page.PlannedActions,
  Page.CapabilityAssessment,
  Page.Reports,
  Page.DataManager,
]

// Reference: https://mui.com/material-ui/react-app-bar/?srsltid=AfmBOorUZUWj8u0x7H0LZsE9K6UUwzIW5oOARgLhhDJhM1idsypsE9K1

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  setPage: (page: Page) => void;
  children?: ReactNode;
}

const drawerWidth = 240;

const TITLE = 'Regional Share Design';
const TOOLBAR_HEIGHT_PX = 64; // px

export function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Large screens only */}
      <AppBar component="nav" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ gap: 8}}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex gap-4 items-center grow sm:justify-end md:justify-end lg:justify-start">
            <img src={icon} alt="logo" className="h-10" />
            <div className="text-slate-500 font-semibold text-nowrap">{TITLE}</div>
          </div>

          <Box sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }}>
            {pages.map((item) => (
              <Button key={item} onClick={() => props.setPage(item)} sx={{ p: 1}}>
                <div className="text-slate-500 normal-case text-xs">{item}</div>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Small screens only */}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              {TITLE}
            </Typography>
            <Divider />
            <List>
              {pages.map((item) => (
                <ListItem key={item} disablePadding onClick={() => props.setPage(item)}>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
      <Box component="main" sx={{ width: '100vw' }}>
        {/* Placeholder, not covered by toolbar */}
        <Toolbar />
        <div
          style={{
            height: `calc(100vh - ${TOOLBAR_HEIGHT_PX}px)`,
            backgroundColor: 'transparent',
            overflowY: 'auto',
          }}
        >
          {props.children}
        </div>
      </Box>
    </Box>
  );
}
