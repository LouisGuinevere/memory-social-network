import React from "react"
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import PostDetails from "./components/PostDetails/PostDetails"
import Profile from "./components/Profile/Profile"
import Form from "./components/Form/Form"
import Setting from "./components/Setting/Setting"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const App = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    return ( 
        <BrowserRouter>
            <Navbar/>
            <Container maxwidth="xl">
                <Routes>
                    <Route path="/" exact element={<Navigate replace to="/posts" />}/>
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    <Route path="/posts/:id" exact element={<PostDetails />} />
                    <Route path="/auth" exact element={!user ? <Auth /> : <Navigate replace to="/posts" />} />
                    <Route path="/profile/:id" exact element={<Profile />}></Route>
                    <Route path="/create" exact element={<Form />}></Route>
                    <Route path="/edit/:id" exact element={<Form />}></Route>
                    <Route path="/setting" exact element={<Setting />}></Route>
                </Routes>
            </Container >
        </BrowserRouter>
    )
}

export default App;