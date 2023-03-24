import { Box } from "@mui/system"
import { NavBar, Sidebar } from "../../UI";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            
            <NavBar drawerWidth = { drawerWidth } />

            <Sidebar drawerWidth = { drawerWidth } />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/*Toolbar*/}

                { children }
            </Box>
        </Box>
    )
}
