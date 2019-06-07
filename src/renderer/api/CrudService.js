let STORE_NAME = 'charts'
const addChart = (newChart) => {
  var db
  var request = indexedDB.open(STORE_NAME, 1)
  request.onupgradeneeded = function () {
    console.log('2. upgrade needed')
    request.result.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true})
  }
  request.onsuccess = function () {
    db = request.result
    var transaction = db.transaction(STORE_NAME, 'readwrite')
    var objectStore = transaction.objectStore(STORE_NAME)
    objectStore.put(newChart)
    return transaction.complete
  }
  request.onerror = function (err) {
    return err
  }
}
const getLastId = () => {
  var data
  var db
  var request = indexedDB.open(STORE_NAME, 1)
  request.onupgradeneeded = function () {
    request.result.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true})
  }
  request.onsuccess = function () {
    db = request.result
    var transaction = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME)
    transaction.openCursor(null, 'prev').onsuccess = async function (event) {
      var cursor = event.target.result
      if (cursor) {
        data = cursor.value.id
        cursor.continue()
      } else {
        return 0
      }
    }
  }
  console.log(data)
  return data
}
const readChart = (id) => {
  var db
  var charts = []
  var request = indexedDB.open(STORE_NAME, 1)
  request.onupgradeneeded = function () {
    request.result.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true})
  }
  request.onsuccess = function () {
    db = request.result
    var transaction = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME)
    transaction.openCursor().onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor) {
        if (cursor.value.id === id) {
          charts.push(cursor.value)
        }
        cursor.continue()
      } else {
        return 0
      }
      return cursor.value
    }
  }
  return charts
}
const deleteChart = (id) => {
  var db
  var request = indexedDB.open(STORE_NAME, 1)
  request.onupgradeneeded = function () {
    console.log('2. upgrade needed')
    request.result.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true})
  }
  request.onsuccess = function () {
    db = request.result
    var transaction = db.transaction(STORE_NAME, 'readwrite')
    var objectStore = transaction.objectStore(STORE_NAME)
    objectStore.delete(id)
    return transaction.complete
  }
  request.onerror = function (err) {
    return err
  }
}
const updateChart = (id, newChart) => {
  console.log(JSON.stringify(newChart) + id)
  var request = indexedDB.open(STORE_NAME, 1)
  request.onupgradeneeded = function () {
    request.result.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true})
  }
  request.onsuccess = function () {
    request = request.result
    var objectStore = request.transaction(['charts'], 'readwrite').objectStore('charts')
    var objectStoreTitleRequest = objectStore.get(id)
    objectStoreTitleRequest.onsuccess = function () {
      var data = objectStoreTitleRequest.result
      data.data = newChart.data
      data.options = newChart.options
      var updateTitleRequest = objectStore.put(data)
      updateTitleRequest.onsuccess = function () {
        return true
      }
    }
  }

  // request.onsuccess = function () {
  //   db = request.result
  //   var transaction = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME)
  //   transaction.openCursor().onsuccess = function (event) {
  //     var cursor = event.target.result
  //     if (cursor) {
  //       if (cursor.value.id === id) {
  //         console.log(cursor)
  //         cursor.value.data = newChart
  //         const request = cursor.update(newChart)
  //         request.onsuccess = function () {
  //           console.log(newChart)
  //         }
  //       }
  //       cursor.continue()
  //     } else {
  //       console.log('Entries displayed.')
  //     }
  //   }
  // }
}

const getAllCharts = function () {
  var db
  var charts = []
  var request = indexedDB.open(STORE_NAME, 1)
  request.onupgradeneeded = function () {
    request.result.createObjectStore(STORE_NAME, {keyPath: 'id', autoIncrement: true})
  }
  request.onsuccess = function () {
    db = request.result
    var transaction = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME)
    transaction.openCursor().onsuccess = function (event) {
      var cursor = event.target.result
      if (cursor) {
        charts.push(cursor.value)
        cursor.continue()
      } else {
        return 0
      }
      return cursor.value
    }
  }
  return charts
}

const destroyDb = db => {
  try {
    var dbDeleteRequest
    if (!db || db === '') {
      return false
    } else {
      dbDeleteRequest = indexedDB.deleteDatabase(db)
    }
    dbDeleteRequest.onsuccess = function () {
      console.log('Baza danych została usunięta')
      location.reload()
    }
    dbDeleteRequest.onerror = function () {
      console.log('Wystąpił błąd podczas usuwania bazy danych. Zrestartuj aplikację i spróbuj jeszcze raz.')
    }
  } catch (e) {
    console.log('Wystąpił błąd podczas usuwania bazy danych. Zrestartuj aplikację i spróbuj jeszcze raz.')
  }
}

export default {
  addChart,
  readChart,
  deleteChart,
  updateChart,
  getAllCharts,
  destroyDb,
  getLastId
}
