const printPostLikes = (post, userId) => {
    post.userLiked = false
    post.userDisliked = false
    if (post.likesUsers.includes(userId)) {
        post.userLiked = true
    }
    if (post.dislikesUsers.includes(userId)) {
        post.userDisliked = true
    }
    post.dislikesUsers = null
    post.likesUsers = null

    return post
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

module.exports = {printPostLikes, likeOrDislike}