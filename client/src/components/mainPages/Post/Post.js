import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import 'font-awesome/css/font-awesome.min.css';
import './Post.css'

function Post({displayName, userName, avatarSrc, postText}) {
    return (
        <div className="post-wrapper">
            <Avatar className="userAvatar" alt="User Avatar" src={avatarSrc}/>
            <Card className="post-content">
                <CardHeader
                    action={
                        <IconButton 
                            onClick={(e) =>{
                                e.stopPropagation()
                                alert("Looks good, doesn't it?")
                            }} 
                            aria-label="settings"
                        >
                          <MoreHorizIcon style={{fontSize: 25}}/>
                        </IconButton>
                      } 
                    className="post-header"
                    title={displayName}
                    subheader={`  @${userName}`}
                />
                <CardContent className="peace-post">
                     <p className="post-text">{postText}</p>
                </CardContent>
                <div className="post-footer">
                <CardActions className="peace-actions" disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteBorderIcon fontSize="small" className="fav-icon"/>
                    </IconButton>
                </CardActions>
                </div>
            </Card>
        </div>
    )
}

export default Post
