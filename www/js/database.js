var db;

function createDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("LeifJohannesson_PROG2435_Final", 1)

        request.onsuccess = (event) => {
            db = event.target.result
            resolve(db)
        }
        request.onupgradeneeded = (event) => {
            db = event.target.result

            db.createObjectStore("posts", {
                keyPath: "id",
                autoIncrement: true
            })

            db.createObjectStore("users", {
                keyPath: "id",
                autoIncrement: true
            })
        }
    })
}