function CustomBottomNavigation() {
    const mainPageContainer = props.mainPageContainer;

    return(
    <BottomNavigation className="nav" value={navigationValue} onChange={(event, newValue) => {
        setNavigationValue(newValue);
        if (newValue == "group") {
            setIndexPage(0);
        }
        else if (newValue == "cabinet") {
            setIndexPage(1);
        }
        else if (newValue == "teacher") {
            setIndexPage(2);
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