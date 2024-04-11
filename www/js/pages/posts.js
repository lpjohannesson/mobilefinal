var selectedPost = null

function addPost() {
    selectedPost = null
}

function editPost(id) {
    selectedPost = id
    $.mobile.changePage("#edit-post-page")
}

function deletePost(id) {
    Posts.delete(id)
    initPostsPage()
}

function initPostsPage() {
    const list = $('#posts-list')
    list.empty()

    Posts.selectAll().then(async (posts) => {
        let fullText = ''

        for (const post of posts) {
            let userText

            let postUser = null

            if (post.userId) {
                await Users.select(parseInt(post.userId)).then((foundUser) => {
                    postUser = foundUser
                })
            }

            if (postUser == null) {
                userText = 'No attribution'
            }
            else {
                userText = `Attributed to <a href="#" onclick="editUser(${postUser.id})">${postUser.name}</a>`
            }

            list.append( 
                `<li>
                    <p><i>${userText}</i></p>
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <div class="ui-grid-b">
                        <div class="ui-block-a">
                            <a data-role="button" data-icon="edit" onclick="editPost(${post.id})">Edit</a>
                        </div>
                        <div class="ui-block-b">
                            <a data-role="button" data-icon="delete" onclick="deletePost(${post.id})">Delete</a>
                        </div>
                        <div class="ui-block-c">
                            <a data-role="button" data-icon="star">Star</a>
                        </div>
                    </div>
                </li>`
            )
        }

        list.listview('refresh')
        list.trigger('create')
    })
}