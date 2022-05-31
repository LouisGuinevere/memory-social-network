import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row"
    },
    drawer: {
        margin: 0,
        padding: 0,
    },
    drawerItem: {
        alignItems: "center",
        borderLeft: "3px solid #FFFFFF",
        borderRight: "2px solid #DBDBDB",
        display: "flex",
        fontSize: "18px",
        height: "40px",
        listStyle: "none",
        padding: "4px 0 4px 8px",
        width: "240px",
    },
    drawerItemHovering: {
        backgroundColor: "#FAFAFA",
        borderLeft: "3px solid #DBDBDB",
        cursor: "pointer"
    },
    drawerItemSelecting: {
        fontWeight: "700",
        borderLeft: "3px solid #000000",
    }
}));