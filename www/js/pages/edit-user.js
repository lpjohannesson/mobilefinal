const editUserForm = $('#edit-user-form')

function initEditUserPage() {
    if (selectedUser == null) {
        editUserForm.trigger('reset')
    }
    else {
        Users.select(selectedUser).then((user) => {
            if (user == null) {
                return
            }
    
            editUserForm.find('#name').val(user.name)
            editUserForm.find('#bio').val(user.bio)
        })
    }
}

function validateEditUser() {
    editUserForm.validate({
        errorClass: 'error',
        rules: {
            name: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            name: {
                required: 'Required',
                minlength: '2 characters minimum'
            }
        }
    })

    return editUserForm.valid()
}

$('#edit-user-submit').on('click', () => {
    if (!validateEditUser()) {
        return
    }

    const user = {
        name: editUserForm.find('#name').val(),
        bio: editUserForm.find('#bio').val()
    }

    if (selectedUser == null) {
        Users.insert(user)
    }
    else {
        user.id = selectedUser
        Users.update(user)
    }

    $.mobile.changePage("#users-page")
})