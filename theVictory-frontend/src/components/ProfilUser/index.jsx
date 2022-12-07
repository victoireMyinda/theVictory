
import React from 'react'
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material'
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import ModifProfilUser from '../ModifProfilUser';
import FacebookIcon from '@mui/icons-material/Facebook';
import { GitHub } from '@material-ui/icons';
import { LinkedIn } from '@material-ui/icons';
import { Link, NavLink } from 'react-router-dom';

import './style.css'


const ProfilUser = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const userImg = window.localStorage.getItem("profilUser");
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar alt="user connected" src={userImg} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 25,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem>
                    <Avatar /> Victoire myinda
                </MenuItem>
                <Divider />

                <MenuItem>
                    <LinkedIn />    LinkedIn
                </MenuItem>

                <MenuItem>
                    <GitHub />    Github
                </MenuItem>

                <MenuItem>
                    <FacebookIcon /> Facebook
                </MenuItem>

                <MenuItem>
                    <Avatar />Portfolio
                </MenuItem>

                <Divider />
                <NavLink to={{ pathname: '/modifyProfilUser' }} state={{ val: "modif" }}>
                    <MenuItem>
                        <Avatar /> Modifier compte
                    </MenuItem>
                </NavLink>
            </Menu>
        </>
    )
}
export default ProfilUser;