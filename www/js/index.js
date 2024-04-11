$(document).ready(() => {
    createDatabase().then(() => {
        $('#posts-page').on('pageshow', initPostsPage);
        $('#users-page').on('pageshow', initUsersPage);
        $('#edit-post-page').on('pageshow', initEditPostPage);
        $('#edit-user-page').on('pageshow', initEditUserPage);
    }) 
})