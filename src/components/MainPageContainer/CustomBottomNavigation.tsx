import { GroupsOutlined, MeetingRoomOutlined, SchoolOutlined } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

function CustomBottomNavigation({mainPageContainer}:CustomBottomNavigationProps) {

    return(
    <BottomNavigation className="nav" value={mainPageContainer.navigationValue} onChange={(event, newValue) => {
        mainPageContainer.setNavigationValue(newValue);
        if (newValue === "group") {
            mainPageContainer.setIndexPage(0);
        }
        else if (newValue === "cabinet") {
            mainPageContainer.setIndexPage(1);
        }
        else if (newValue === "teacher") {
            mainPageContainer.setIndexPage(2);
        }
    }}>
        <BottomNavigationAction label="Group" value="group" icon={<GroupsOutlined />}>
        </BottomNavigationAction>
        <BottomNavigationAction label="Cabinet" value="cabinet" icon={<MeetingRoomOutlined />}>
        </BottomNavigationAction>
        <BottomNavigationAction label="Teacher" value="teacher" icon={<SchoolOutlined />}>
        </BottomNavigationAction>
    </BottomNavigation>);
}

type CustomBottomNavigationProps = {
    mainPageContainer: {
        navigationValue: string, 
        setNavigationValue: React.Dispatch<React.SetStateAction<string>>,
        setIndexPage: React.Dispatch<React.SetStateAction<number>>
    }
}

export default CustomBottomNavigation;