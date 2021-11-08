import React, {Component} from 'react';
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import {Delete} from "@mui/icons-material";
import axios from "axios";

class PostCard extends Component {

    constructor(props) {
        super(props);
        this.state = {"date": this.props.date, "votes": this.props.votes}
        this.changeVote = this.changeVote.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.sleep = this.sleep.bind(this);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    changeVote(value) {
        const postData = {
            "post-id": this.props.postId,
            "up-count": value
        }
        axios.post("https://my-worker.amondal5.workers.dev/vote", JSON.stringify(postData)).then(res => {
            console.log(res.data);
            if(res.data.length === 1) {
                this.setState({"date": res.data[0]["date"], "votes": res.data[0]["votes"]})
            }
        });
    }

    deletePost() {
        const postData = {
            "post-id": this.props.postId
        }
        axios.post("https://my-worker.amondal5.workers.dev/delete", JSON.stringify(postData)).then(res => {
            console.log(res.data);
            console.log(res.data);
            if(res.data === "Success") {
                alert("Post deleted!! Please refresh after few seconds")
                this.sleep(6000);
                window.location.reload()
            } else {
                alert("Please try later")
            }
        });
    }

    render() {
        return (
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: "orangered"}} aria-label="recipe">
                            {this.props.username.toUpperCase()[0]}
                        </Avatar>
                    }
                    title={this.props.title}
                    subheader={this.state.date}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={"https://picsum.photos/690/338?random=" + this.props.postId}
                    alt="Random Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {this.props.username.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {this.props.postContent}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="up-vote">
                        {this.state.votes}
                    </IconButton>
                    <IconButton aria-label="up-vote" onClick={() => this.changeVote(1)}>
                        <ArrowCircleUp/>
                    </IconButton>
                    <IconButton aria-label="down-vote" onClick={() => this.changeVote(0)}>
                        <ArrowCircleDown/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={this.deletePost}>
                        <Delete/>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }

}

export default PostCard;