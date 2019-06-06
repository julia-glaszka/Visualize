import { openDb } from 'idb'

const checkStorage = async storeName => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB')
  }
  console.log('szmul')
  const odb = await openDb('charts', 1)
  console.log('szmul 2')

  return odb.then(db => {
    const store = db.transaction(storeName, 'readonly').objectStore(storeName)
    console.log('elo')
    return store.get(storeName)
  }).catch(error => {
    return error
  })
}

// const destroyDb = db => {
//   try {
//     var dbDeleteRequest
//     if (!db || db === '') {
//       return false
//     } else {
//       dbDeleteRequest = indexedDB.deleteDatabase(db)
//     }
//     dbDeleteRequest.onsuccess = function (e) {
//       alert('Database successfully deleted')
//       location.reload()
//     }
//     dbDeleteRequest.onupgradeneeded = function (e) {
//       console.log('Database upgrade needed ')
//     }
//     dbDeleteRequest.onerror = function (e) {
//       console.log('Error deleting database ')
//     }
//     dbDeleteRequest.onblocked = function (e) {
//       console.log('Deleting Database Blocked... Try closing the database and then deleting it ')
//     }
//   } catch (e) {
//     console.log(e)
//     console.log('Error on destroy -> deleteDatabase ')
//   }
// }

// const checkStorage = async storeName => {
//   console.log('1 open')
//   var db
//   var charts = []
//   var request = indexedDB.open(storeName, 1)
//   request.onupgradeneeded = function () {
//     console.log('2. upgrade needed')
//     request.result.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true})
//   }
//   request.onsuccess = function () {
//     console.log('3. success')
//     db = request.result
//     var transaction = db.transaction(storeName, 'readonly').objectStore(storeName)
//     console.log('5. not getall')
//     transaction.openCursor().onsuccess = function (event) {
//       var cursor = event.target.result
//       if (cursor) {
//         console.log('5.1. cursor' + JSON.stringify(cursor.value))
//         charts.push(cursor.value)
//         cursor.continue()
//       } else {
//         return 0
//       }
//       return cursor.value
//     }
//   }
//   return charts
// }

const saveToStorage = async (storeName, tasks) => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB')
  }
  console.log('szmul')
  const odb = await openDb('charts', 1, {
    upgrade (db) {
      const store = db.createObjectStore('charts', {
        keyPath: 'id',
        autoIncrement: true
      })
      store.createIndex('chart', 'chart')
    }
  })
  console.log('szmul 2')
  return odb.then(db => {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    store.put(tasks, storeName)
    return tx.complete
  }).catch(error => { return error })
}

// const saveToStorage = async (storeName, tasks) => {
//   var db
//   var request = await indexedDB.open('charts', 1)
//   request.onupgradeneeded = async function () {
//     request.result.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true})
//   }
//   request.onsuccess = async function () {
//     db = await request.result
//     var transaction = await db.transaction(storeName, 'readwrite')
//     var objectStore = await transaction.objectStore(storeName)
//     objectStore.put(tasks)
//     return transaction.complete
//   }
//   request.onerror = function (err) {
//     return err
//   }
// }

export default {
  checkStorage,
  saveToStorage
}
