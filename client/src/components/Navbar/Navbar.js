import React, {useState, useEffect} from "react";
import { AppBar, Toolbar, Typography, Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import { IoHomeOutline, IoNotificationsOutline, IoCreateOutline, IoChatbubbleEllipsesOutline, IoPersonOutline, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { getPostsBySearch } from '../../actions/posts';
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = ({tags}) => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchPost();
        }
    };

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}`);
        } else {
            navigate("/");
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate(`/profile/${user.result._id}`);
    }

    const handleSetting = () => {
        handleClose();
        navigate("setting");
    }

    const handleLogout = () => {
        handleClose();
        logout();
    }

    const login = () => {
        navigate("/auth");
    }

    const logout = () => {
        dispatch({type: "LOGOUT"});
        navigate("/auth");
        setUser(null);
    }

    const handleHomeClick = () => {
        const currentPathName = location.pathname;
        currentPathName === "/posts" ? window.location.reload() : navigate("/posts");
    }

    const handleCreateClick = () => {
        navigate("/create");
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location])
    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"></img>
            </div>
            <div>
                <input type="text" className={classes.search} onKeyPress={handleKeyPress} onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search momery's name..."/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <IoHomeOutline className={classes.navIcon} onClick={handleHomeClick}/>
                        <IoCreateOutline className={classes.navIcon} onClick={handleCreateClick}/>
                        <IoChatbubbleEllipsesOutline className={classes.navIcon}/>
                        <IoNotificationsOutline className={classes.navIcon} />
                        <div className={classes.navIcon}>
                            <Avatar 
                                id="profile-button" 
                                className={classes.purple} 
                                onClick={handleClick} 
                                alt={user?.result.name} 
                                src={user?.result.imageUrl}
                                aria-controls={open ? 'profile-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                {user?.result.name.charAt(0)}
                            </Avatar>
                            <Menu
                                id="profile-menu"
                                aria-labelledby="profile-button"
                                anchorEl={anchorEl}
                                getContentAnchorEl={null}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleProfile}><IoPersonOutline />&nbsp; Profile</MenuItem>
                                <MenuItem onClick={handleSetting}><IoSettingsOutline />&nbsp; Setting</MenuItem>
                                <MenuItem onClick={handleLogout}><IoLogOutOutline />&nbsp; Logout</MenuItem>
                            </Menu>
                        </div>
                        {/* <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
                    </div>
                ) : (
                    <Button variant="contained" color="primary" onClick={login}>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;