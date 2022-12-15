import { PeopleOutline } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState, useEffect } from "react";
import Group from "../Group/Group";
import "./sharePage.css"

function SharePage() {
    const [currentView, setCurrentView] = useState(<Group />);

    return (
        <div className="mainShare">
            {currentView}
            <BottomNavigation className="nav" onChange={(event, newValue) => {

            }}>
                <BottomNavigationAction label="Group" value="group" icon={<PeopleOutline />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Group" value="group" icon={<PeopleOutline />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Group" value="group" icon={<PeopleOutline />}>
                </BottomNavigationAction>
            </BottomNavigation>
        </div>
    );
}

export default SharePage;