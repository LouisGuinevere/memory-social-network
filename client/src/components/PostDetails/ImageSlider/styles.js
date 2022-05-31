import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '600px',
        height: '400px',
    },
    imageSection: {
        position: 'relative',
        marginLeft: '20px',
        height: "fit-content",
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    prev: {
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        width: "auto",
        padding: "16px",
        marginTop: "-22px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "0 3px 3px 0",
        left: "0",
        userSelect: "none"
    },
    next: {
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        width: "auto",
        padding: "16px",
        marginTop: "-22px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        right: "0",
    },
    btn: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    hoverBtn: {
        backgroundColor: "black"
    }
}));