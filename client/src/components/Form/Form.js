import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../actions/posts";

const Form = () => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const { editingPost, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);
    console.log(editingPost);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
            //dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
        clear();
    }

    const clear = () => {
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value = {postData.title} onChange = {(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" multiline rows={12} fullWidth value = {postData.message} onChange = {(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={true} onDone={(files) => setPostData({ ...postData, selectedFile: [...files] })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;