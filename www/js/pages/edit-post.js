const editPostForm = $('#edit-post-form')

function initEditPostPage() {
    Users.selectAll().then((users) => {
        const userIdSelect = editPostForm.find('#userId')

        userIdSelect.empty()
        userIdSelect.append('<option value="0">None</option>')

        for (const user of users) {
            userIdSelect.append(`<option value="${user.id}">${user.name}</option>`)
        }
    })

    if (selectedPost == null) {
        editPostForm.trigger('reset')
    }
    else {
        Posts.select(selectedPost).then((post) => {
            if (post == null) {
                return
            }
    
            editPostForm.find('#title').val(post.title)
            editPostForm.find('#content').val(post.content)
            editPostForm.find('#userId').val(post.userId).change()
            editPostForm.find('#starred').val(post.starred)
        })
    }
}

function validateEditPost() {
    editPostForm.validate({
        errorClass: 'error',
        rules: {
            title: {
                required: true,
                minlength: 2
            },
            content: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            title: {
                required: 'Required',
                minlength: '2 characters minimum'
            },
            content: {
                required: 'Required',
                minlength: '2 characters minimum'
            }
        }
    })

    return editPostForm.valid()
}

$('#edit-post-submit').on('click', () => {
    if (!validateEditPost()) {
        return
    }

    const post = {
        title: editPostForm.find('#title').val(),
        content: editPostForm.find('#content').val(),
        userId: editPostForm.find('#userId').val(),
        starred: false
    }

    if (selectedPost == null) {
        Posts.insert(post)
    }
    else {
        post.id = selectedPost
        Posts.update(post)
    }

    $.mobile.changePage("#posts-page")
})