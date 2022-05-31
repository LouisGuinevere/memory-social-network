import React, { useState } from 'react'
import useStyles from "./styles"
import { Card } from "@material-ui/core";
import ChangePassword from "../SettingItems/ChangePassword/ChangePassword"
import EditProfile from "../SettingItems/EditProfile/EditProfile"
import Notification from "../SettingItems/Notification/Notification"
const Sidebar = () => {

    const drawerItems = ["Account", "Security", "Notification"];
    const [selectingDrawerItem, setSelectingDrawerItem] = useState("0");
    const classes = useStyles();

    const handleMouseEnter = (e) => {
        let drawerItem = e.target;
        if (drawerItem.getAttribute("id") !== selectingDrawerItem) {
            drawerItem.setAttribute("class", `${classes.drawerItem} ${classes.drawerItemHovering}`);
        }
    }

    const handleMouseLeave = (e) => {
        let drawerItem = e.target;
        if (drawerItem.getAttribute("id") !== selectingDrawerItem) {
            drawerItem.setAttribute("class", `${classes.drawerItem}`);
        }
    }

    const handleMouseClick = (e) => {
        let currentDrawerItem = document.getElementById(selectingDrawerItem);
        let drawerItem = e.target;
        let itemID = drawerItem.getAttribute("id");
        let newDrawerItem = document.getElementById(itemID);
        currentDrawerItem.setAttribute("class", `${classes.drawerItem}`);
        newDrawerItem.setAttribute("class", `${classes.drawerItem} ${classes.drawerItemSelecting}`)
        setSelectingDrawerItem(itemID);
    }

    const Content = () => {
        switch (selectingDrawerItem) {
            case "0": return <EditProfile />
            case "1": return <ChangePassword />
            case "2": return <Notification />
            default: return <EditProfile />
        }
    }

    return (
        <Card className={classes.container} raised elevation={6}>
            <ul className={classes.drawer}>
                {
                    drawerItems.map((item, index) => {
                        if (index == selectingDrawerItem){
                            return <li className={`${classes.drawerItem} ${classes.drawerItemSelecting}`} key={index} id={index} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMouseClick}>{item}</li>
                        }
                        return <li className={classes.drawerItem} key={index} id={index} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMouseClick}>{item}</li>
                    })
                }
            </ul>
            <Content />
        </Card>
    )
}

export default Sidebar