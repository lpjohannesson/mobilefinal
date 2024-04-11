function createStore(name) {
    return {
        insert: (data) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([name], 'readwrite')
                const store = transaction.objectStore(name)
    
                const req = store.add(data)
    
                req.onsuccess = (event) => { resolve(event) }
                req.onerror = (event) => { reject(event) }
            })
        },
        update: (data) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([name], 'readwrite')
                const store = transaction.objectStore(name)
    
                const req = store.put(data)
    
                req.onsuccess = (event) => { resolve(event) }
                req.onerror = (event) => { reject(event) }
            })
        },
        delete: (id) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([name], 'readwrite')
                const store = transaction.objectStore(name)
    
                const req = store.delete(id)
    
                req.onsuccess = (event) => { resolve(event) }
                req.onerror = (event) => { reject(event) }
            })
        },
        select: (id) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([name], 'readonly')
                const store = transaction.objectStore(name)
    
                const req = store.get(id)
                
                req.onsuccess = (event) => { event.target.result ? resolve(event.target.result) : resolve(null) }
                req.onerror = (event) => { reject(event) }
            })
        },
        selectAll: () => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([name], 'readonly')
                const store = transaction.objectStore(name)
    
                const cursor = store.openCursor()
                const dataList = []
    
                cursor.onsuccess = (event) => {
                    const dataResult = event.target.result
    
                    if (dataResult) {
                        dataList.push(dataResult.value)
                        dataResult.continue()
                    }
                    else {
                        resolve(dataList)
                    }
                }
            })
        }
    }
}

const Posts = createStore('posts')
const Users = createStore('users')
