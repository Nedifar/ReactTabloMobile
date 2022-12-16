import { GroupsOutlined, MeetingRoomOutlined, SchoolOutlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState, useEffect } from "react";
import Group from "../Group/Group";
import "./sharePage.css"

function SharePage() {
    const [currentView, setCurrentView] = useState(<Group />);
    const [navigationValue, setNavigationValue] = useState('group');

    return (
        <div className="mainShare">
            {currentView}
            <BottomNavigation className="nav" value={navigationValue} onChange={(event, newValue) => {
                setNavigationValue(newValue)
            }}>
                <BottomNavigationAction label="Group" value="group" icon={<GroupsOutlined />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Cabinet" value="cabinet" icon={<MeetingRoomOutlined />}>
                </BottomNavigationAction>
                <BottomNavigationAction label="Teacher" value="teacher" icon={<SchoolOutlined />}>
                </BottomNavigationAction>
            </BottomNavigation>
        </div>
    );
}

export default SharePage;