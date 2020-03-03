const printPostLikes = (post, userId) => {
    let result = post.toJSON()
    result.userLiked = false
    result.userDisliked = false
    if (post.likesUsers.includes(userId)) {
        result.userLiked = true
    }
    if (post.dislikesUsers.includes(userId)) {
        result.userDisliked = true
    }
    result.dislikesUsers = null
    result.likesUsers = null

    return result
}

const followOrUnfollow = async(user, userToFollow) => {
    if(!user.followers.includes(userToFollow._id)){
        userToFollow.followercount += 1
        user.followers.push(userToFollow._id)
    } else{
        userToFollow.followercount -= 1
        user.followers.splice(user.followers.indexOf(userToFollow._id))
    }
    return [user, userToFollow]
}

const likeOrDislike = async(likesUsers, likes, userId) => {
    if (!likesUsers.includes(userId)) {
        likes = likes + 1
        likesUsers.push(userId)
    } else {
        likes = likes - 1
        likesUsers.splice(likesUsers.indexOf(userId))
    }
    return [likesUsers, likes]
}

module.exports = {printPostLikes, likeOrDislike, followOrUnfollow}