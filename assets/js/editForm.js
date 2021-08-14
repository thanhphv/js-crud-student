const formEditStudent = document.getElementById('form-edit__student')
const activeEditForm = document.querySelector('.edit-form')

function showForm() {
    activeEditForm.classList.add('form-active')
}

function handleCloseEditForm() {
    activeEditForm.classList.remove('form-active')
}


function handleOpenEditForm(id) {
    showForm()
    getData(id)
}

function getData(id) {
    fetch(studentApi)
        .then(res => res.json())
        .then(function (data) {
            const newData = data.filter(item => item.id === Number(id))
            renderEditForm(...newData)
        })
}

function handleEditStudent(id) {
    const editNameValue = document.querySelector('#edit-name__student').value;
    const editAgeValue = document.querySelector('#edit-age__student').value;
    const editEmailValue = document.querySelector('#edit-email__student').value;
    const editPhoneValue = document.querySelector('#edit-phone__student').value;
    const editAddressValue = document.querySelector('#edit-address__student').value;
    let data = {
        name: editNameValue,
        age: editAgeValue,
        email: editEmailValue,
        phone: editPhoneValue,
        address: editAddressValue
    }
    fetch(studentApi + '/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

        .then(res => res.json())
        .then(() => location.reload())
}

function renderEditForm(item) {
    const html = `
    <div class="form-control ">
    <label for="">Tên sinh viên</label>
    <input type="text" id="edit-name__student" autocomplete="off" value="${item.name}">
    <small>Error Msg</small>
</div>
<div class="form-control">
    <label for="">Tuổi</label>
    <input type="number" id="edit-age__student" autocomplete="off" value="${item.age}">
    <small>Error Msg</small>
</div>
<div class="form-control">
    <label for="">Email</label>
    <input type="text" id="edit-email__student" autocomplete="off" value="${item.email}">
    <small>Error Msg</small>
</div>

<div class="form-control">
    <label for="">Số điện thoại</label>
    <input type="number" id="edit-phone__student" autocomplete="off" value="${item.phone}">
    <small>Error Msg</small>
</div>
<div class="form-control">
    <label for="">Địa chỉ</label>
    <input type="text" id="edit-address__student" autocomplete="off" value="${item.address}">
    <small>Error Msg</small>
</div>
<div class="form-btn">
<input type="button" value="Cập nhật" class="btn" onclick="handleEditStudent(${item.id})">
<input type="button" value="Đóng" class="btn" onclick="handleCloseEditForm()">
</div>
    `

    document.querySelector('.form-edit__student').innerHTML = html;
}

