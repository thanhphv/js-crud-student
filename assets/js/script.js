const btnOpenForm = document.querySelector('.btn-add')
const btnCloseForm = document.querySelector('.btn-close')
const formActive = document.querySelector('.form-wrapper')

btnOpenForm.addEventListener('click', function () {
    formActive.classList.add('form-active')
})

btnCloseForm.addEventListener('click', function () {
    formActive.classList.remove('form-active')
})


// get data student

const studentApi = 'http://localhost:3000/student'
fetch(studentApi)
    .then(response => response.json())
    .then(renderStudent)

function renderStudent(data) {
    let html = data.map((item, index) =>
        `
        <tr data-id=${item.id}>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>${item.address}</td>
        <td>
            <button class="btn btn-edit" onclick="handleOpenEditForm(${item.id})">Sửa</button>
            <button class="btn btn-delete" onclick="handleDeleteStudent(${item.id})">Xóa</button>
        </td>
        </tr>
    `
    )
    document.querySelector('tbody').innerHTML = html.join('')
}


// delete student

function handleDeleteStudent(id) {
    fetch(studentApi + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(dataStd => renderStudent(dataStd))
}

