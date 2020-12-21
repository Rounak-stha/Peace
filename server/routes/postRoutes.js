const postRoutes = require('express').Router()
const userDetails = require('../models/userDetailsModel')
const credentials = require("../models/credentialModel")
const bcrypt = require('bcrypt');
const {Avatar} = require('../config')



// save posts
postRoutes.post('/userPost', (req, res) => {
    //console.log(req.body.userName)
    userDetails.updateOne({userName: req.body.userName}, {$addToSet: {posts: req.body.post}},
        (err, doc) => {
            if (err) res.send(err)
            else {
               //console.log(doc)
                res.send(doc.nModified.toString())
            }
        }) 
})

/* // get my posts
postRoutes.post('/myPosts', (req, res) => {
    userPosts.find({userName: req.body.userName}, (err, doc) => {  // doc is an array of documents
        if (err) {
            res.status(500).end()
            console.log(err)
        }
        else {
            res.send({posts: doc[0].posts})
            // console.log(doc) // doc is an array
        }
    })
}) */

// following users posts
postRoutes.post('/followingPosts', (req, res) => {
    userDetails.find({userName: req.body.userName}, (err, doc) => {
        if (err) res.status(500).end()
        else{
            userDetails.find({userName: {$in: [...doc[0].following]}}, (err, posts) => {
                if (err) res.status(500).end()
                else res.send(posts)
            })
        }
    })
})

// userdetails and post
postRoutes.post('/profileData', (req, res) => {  // all fields must be dfined in mongoose schema or we caant access it
    let toSend = {}
    userDetails.find({userName: req.body.userName}, (err, doc) => {
        if (err) res.status(500).end()
        else {
            toSend = {posts: doc[0].posts, followers: doc[0].followers.length, following: doc[0].following.length, avatarSrc: doc[0].avatarSrc}
            if (req.body.myName) {
                let following = doc[0].followers.find((follower) => follower === req.body.myName)
                toSend.iFollow = following ? true : false
            } 
            res.send(toSend)
        }
    })
}) 

// find searched users
postRoutes.post('/findUsers', (req, res) => {
    userDetails.find({displayName : new RegExp(`^${req.body.displayName}`, 'i')}, (err, users) => {  // use regular expression for displayname starting with the req.doby.displayname and 'i' flag for case insensitivity
        if (err) res.status(500).end()
        else res.send(users)
    })
})

// add following and follower
postRoutes.post('/follow', (req, res) => {
    userDetails.updateOne({userName: req.body.follower}, 
                          {$addToSet: {following: req.body.following}}, (err) => {  // add to or update the array, not whole document 
                              if (err) res.status(500).end()
                              else userDetails.updateOne({userName: req.body.following}, 
                                                         {$addToSet: {followers: req.body.follower}}, 
                                                         (err) => {
                                                            if (err) {
                                                                res.status(500).end()
                                                                userDetails.updateOne({userName: req.body.follower}, 
                                                                    {$pull: {following: req.body.following}})
                                                            }
                                                            else res.end()
                                                         })
                          }) 
})

// unfollow
postRoutes.post('/unFollow', (req, res) => {
    userDetails.updateOne({userName: req.body.unFollower}, 
                          {$pull: {following: req.body.unFollowing}}, (err) => {  // pull or delete the element or update the array, not whole document 
                              if (err) res.status(500).end()
                              else userDetails.updateOne({userName: req.body.unFollowing}, 
                                                         {$pull: {followers: req.body.unFollower}}, 
                                                         (err) => {
                                                            if (err) {
                                                                res.status(500).end()
                                                                userDetails.updateOne({userName: req.body.unFollower}, 
                                                                    {$addToSet: {following: req.body.unFollowing}})
                                                            }
                                                            else res.end()
                                                         })
                          }) 
})

postRoutes.post('/checkuser', (req, res) => {
    credentials.find({userName: req.body.userName}, (err, foundUser) => {
        if (err) {
            res.status(500).end()
            return
        }
        // founduser is an array of documents (objects) satisfying the condn (user: req.body.name)
        if (foundUser.length > 0) res.send({exists: true})
        else res.send({exists: false})
    })
})

postRoutes.post('/register', async (req, res) => {
    const displayName = req.body.displayName;
    const userName = req.body.userName;
    const userPassword = req.body.password;
    const avatar = Avatar[req.body.avatar][Math.floor(Math.random() * 7)]
    // hash the password: hash(pw, saltrounds, callback), 10 is enough, greater rounds will take much greater hashing time
    await bcrypt.hash(userPassword, 10, (err, hash) => { // used async await just as a reminder that the hash func is asynchronous
        if (err) {
            // console.log(err)
            res.status(500).end();
            return
        }
        else {
            const userCred = new credentials({displayName, userName, password: hash, avatarSrc: avatar});
            const userDetail = new userDetails({displayName, userName, avatarSrc: avatar})
            userCred.save((err) => {
                if (err) {
                    res.status(500).end()
                    return
                }
                userDetail.save((err, doc) => {  // saving a single document, the response document is also a object not an array
                    //console.log(doc)
                    if (err) {
                        res.status(500).end();
                        userCred.deleteOne({userName})
                        return
                    }
                        res.send({displayName: doc.displayName, userName: doc.userName, avatarSrc: doc.avatarSrc})
                    })   
                })
        }
    });
});

postRoutes.post('/login', (req, res) => {
    // console.log(res.getHeaders())
    credentials.find({userName: req.body.userName}, (err, foundUser) => {
        if (err) {
            res.status(500).send({error: "Server Error"})
            return
        }
        if (foundUser.length === 0) {
            res.status(400).send({error: "User does not Exists"})
            return
        }
        bcrypt.compare(req.body.password, foundUser[0].password)
            .then((result) => {
                if (result) {
                    res.send({success: true, user: {displayName: foundUser[0].displayName, userName: foundUser[0].userName, avatarSrc: foundUser[0].avatarSrc}})
                }
                else res.status(400).send({error: "Incorrect Password"})
            })
            .catch(() => res.status(500).send({error: "Server Error"}))
    })
})  

module.exports = postRoutes
        

