import React, {Component} from "react";
import {Button, FormGroup, Grid, TextField} from "@mui/material";
import {Card, CardHeader} from "@mui/material";
import axios from "axios";


class NewPost extends Component {
    constructor(props) {
        super(props);
        this.submitPost = this.submitPost.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.sleep = this.sleep.bind(this);
        this.state = {"username": "", "title": "", "content": ""}
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    submitPost() {
        console.log(this.state);
        const postData = {
            "username": this.state.username,
            "title": this.state.title,
            "content": this.state.content,
        }
        axios.post("https://my-worker.amondal5.workers.dev/posts", JSON.stringify(postData)).then(res => {
            console.log(res.data);
            if(res.data === "Success") {
                alert("Post submitted!! Please refresh after few seconds")
                this.sleep(6000);
                window.location.reload()
            } else {
                alert("Please try later")
            }
        })
    }

    handleUsernameChange(value) {
        this.setState({"username": value})
    }

    handleTitleChange(value) {
        this.setState({"title": value})
    }

    handleContentChange(value) {
        this.setState({"content": value})
    }

    render() {
        return (
            <Grid item columns={4} key={0}>
                <Card sx={{minWidth: 345}} style={{padding: '10px'}}>
                    <CardHeader
                        title="Now Post Form"
                        subheader="Enter the details here"
                    />
                    <FormGroup>
                        <TextField
                            required
                            value={this.state.username}
                            onChange={e=>this.handleUsernameChange(e.target.value)}
                            id="outlined-required"
                            label="Username"
                        />
                        <br />
                        <TextField
                            required
                            value={this.state.title}
                            onChange={e=>this.handleTitleChange(e.target.value)}
                            id="outlined-required"
                            label="Post title"
                        />
                        <br />
                        <TextField
                            required
                            value={this.state.content}
                            onChange={e=>this.handleContentChange(e.target.value)}
                            id="outlined-multiline-static"
                            label="Post Content"
                            multiline
                            rows={4} />
                        <br />
                        <Button variant="contained" onClick={this.submitPost}>Submit</Button>
                    </FormGroup>
                </Card>
            </Grid>
        );
    }
}

export default NewPost;