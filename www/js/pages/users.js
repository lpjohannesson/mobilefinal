var selectedUser = null

function addUser() {
    selectedUser = null
}

function editUser(id) {
    selectedUser = id
    $.mobile.changePage("#edit-user-page")
}

function deleteUser(id) {
    Users.delete(id)
    initUsersPage()
}

function initUsersPage() {
    const list = $('#users-list')
    list.empty()

    Users.selectAll().then((users) => {
        let fullText = ''

        for (const user of users) {
            list.append(
                `<li>
                    <h3>${user.name}</h3>
                    <p>${user.bio}</p>
                    <div class="ui-grid-a">
                        <div class="ui-block-a">
                            <a data-role="button" data-icon="edit" onclick="editUser(${user.id})">Edit</a>
                        </div>
                        <div class="ui-block-b">
                            <a data-role="button" data-icon="delete" onclick="deleteUser(${user.id})">Delete</a>
                        </div>
                    </div>
                </li>`
            )
        }

        list.listview('refresh')
        list.trigger('create')
    })
}