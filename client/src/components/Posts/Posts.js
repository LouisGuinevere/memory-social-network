import React from "react"
import Post from "./Post/Post"
import useStyles from "./styles"
import { Grid, CircularProgress } from "@material-ui/core"
import postNotFound from "../../images/post-not-found.png";
import { useSelector } from "react-redux"

const Posts = () => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector(state => state.posts);

    if(!posts.length && !isLoading) return (
        <div className={classes.mainContainer}>
            <img src={postNotFound} alt="" />
            <p>We can't find your post. Please try again!</p>
        </div>
    );

    return (
        isLoading ? <div className={classes.mainContainer}><CircularProgress /></div> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts;