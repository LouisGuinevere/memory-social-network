import React from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Pagination from "../Pagination";
import useStyles from "./styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = ({posts, isLoading}) => {
    const query = useQuery();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");
    const classes = useStyles();

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={12}>
                        <Posts posts={posts} isLoading={isLoading}/>
                    </Grid>
                </Grid>
                {(!searchQuery) && (
                    <Paper elevation={6} className={classes.pagination}>
                        <Pagination page={page} />
                    </Paper>
                )}
            </Container>
        </Grow>
    );
};

export default Home;