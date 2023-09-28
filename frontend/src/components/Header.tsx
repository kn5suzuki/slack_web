import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ alignItems: "center" }}>
        <Toolbar sx={{ width: "80%" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Slack Management
          </Typography>
          <Button color="inherit">Help</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
