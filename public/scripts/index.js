(function () {
  var listInput = document.getElementById('menuId')
  listInput.addEventListener('click', contactClick)

  var detailsInput = document.getElementById('detailsId')

  var list, prevName

  function contactClick (event) {
    var nameSelected
    var target = event.target.innerHTML
    if (prevName) {
      prevName.className = 'liStyle'
    }
    prevName = event.target

    for (let i = 0; i < list.length; i++) {
      if (target === list[i].Name) {
        nameSelected = list[i]
        break
      }
    }
    event.target.className += ' clicked'
    showDetails(nameSelected)
  }

  function showDetails (nameSelected) {
    detailsInput.innerHTML = ''
    const container = document.createElement('div')
    for (let key in nameSelected) {
      const details = document.createElement('div')
      if (key !== '_id') {
        details.innerHTML = key + ': ' + nameSelected[key]
        details.className = 'detailStyle'
        container.appendChild(details)
      }
    }
    detailsInput.appendChild(container)
  }

  function myCallBack (xhr) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      list = JSON.parse(xhr.responseText)

      let listMain = document.createElement('ul')
      listMain.className = 'ulStyle'

      for (let i = 0; i < list.length; i++) {
        let listName = document.createElement('li')
        listName.innerHTML = list[i].Name
        listName.className = 'liStyle'
        listMain.appendChild(listName)
      }
      listInput.appendChild(listMain)
    }
  }

  function makeAjaxRequest (url, callBack) {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      callBack(xhr)
    }
    xhr.open('Get', url, true)
    xhr.send()
  }

  makeAjaxRequest('http://localhost:3000/contacts', myCallBack)
})()
