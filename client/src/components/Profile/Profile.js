import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../actions/profile';
import { Grid, CircularProgress, AppBar, Typography, Avatar, Button, Toolbar } from "@material-ui/core"
import Post from "../Posts/Post/Post"
import useStyles from "./styles"

const Profile = () => {
    const { profile, isLoading } = useSelector(state => state.profile);
    const currentUser = JSON.parse(localStorage.getItem("profile"));
    const { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getProfile(id));
    }, [id]);

    const handleEditEvent = () => {
        //Implement later
    }

    const handleFollowEvent = () => {
        //Implement later
    }

    const handleUnfollowEvent = () => {
        //Implement later
    }

    const handleBlockEvent = () => {
        //Implement later
    }

    return (
        isLoading ? <CircularProgress /> : (
            <div>
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <div className={classes.horizontalFlexbox}>
                        <Avatar className={`${classes.avatar} ${classes.flexboxItem}`} alt={profile?.username} src={profile?.imageUrl}>{profile?.username?.charAt(0)}</Avatar>
                        <div className={`${classes.flexboxItem} ${classes.bottom}`}>
                            <Typography className={`${classes.userName}`} variant="h6">{profile?.username}</Typography>
                            <div className={`${classes.horizontalFlexbox}`}>
                                <Typography className={classes.flexboxItem}>{profile?.posts?.length} posts</Typography>
                                <Typography className={classes.flexboxItem}>{profile?.followers?.length} followers</Typography>
                                <Typography className={classes.flexboxItem}>{profile?.following?.length} following</Typography>
                            </div>
                        </div>
                    </div>
                    <Toolbar className={classes.toolbar}>
                        {
                            currentUser?.result._id === id
                            ? <Button className={classes.flexboxItem} onClick={handleEditEvent} variant="contained" color="primary">Edit Profile</Button>
                            :
                            <div>
                                {
                                    !currentUser?.result.following.find((item) => item === id)
                                    ? <Button className={classes.flexboxItem} onClick={handleFollowEvent} variant="contained" color="primary">Follow</Button>
                                    : <Button className={classes.flexboxItem} onClick={handleUnfollowEvent} variant="contained" color="primary">Unfollow</Button>
                                }
                                <Button className={classes.flexboxItem} onClick={handleBlockEvent} variant="contained" color="secondary">Block</Button>
                            </div>
                        }
                    </Toolbar>
                </AppBar>    
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {
                        profile?.posts?.length
                        ? profile?.posts?.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                                <Post post={post} />
                            </Grid>
                        ))
                        : <div></div>
                    }
                </Grid>
            </div>
        )
    )
}

export default Profile