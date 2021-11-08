import React, {Component} from 'react';
import Header from "./header";
import PostCard from "./post-card";
import {Grid} from "@mui/material";
import axios from "axios";
import NewPost from "./new-post";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {"posts": []}
    }

    componentDidMount() {
        axios.get("https://my-worker.amondal5.workers.dev/posts").then(res => {
            console.log(res.data);
            this.setState({
                "posts": res.data
            });
        });
    }

    render() {
        this.state.posts.sort(function (a, b) {
            return b.votes - a.votes;
        });
        return (
            <div>
                <Header/>
                <Grid container
                      alignContent="center"
                      alignItems="center"
                      justifyItems="center"
                      justifyContent="center"
                      spacing={4}
                      columns={8}>
                    <NewPost />
                    {this.state.posts.map((value, index) => {
                        return (
                        <Grid item columns={4} key={index+1}>
                            <PostCard username={value.username}
                                      postContent={value.content}
                                      title={value.title}
                                      date={value.date}
                                      votes={value.votes}
                                      postId={value["post-id"]}
                            />
                        </Grid>);
                    })}

                </Grid>
            </div>
        );
    }
}

export default HomePage;
