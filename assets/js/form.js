const formAddStudent = document.getElementById('form-add__student')
const nameStd = document.getElementById('name-student')
const ageStd = document.getElementById('age-student')
const emailStd = document.getElementById('email-student')
const phoneStd = document.getElementById('phone-student')
const addressStd = document.getElementById('address-student')


formAddStudent.addEventListener('submit', function (event) {
    event.preventDefault()
    validateStudent()
})

// create student

function createStudent(data) {
    fetch(studentApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(dataStd => {
            const dataArr = [];
            dataArr.push(dataStd);
            renderStudent(dataArr)
        })
}

// validate form

function sendData(sRate, count, nameVal, ageVal, emailVal, phoneVal, addressVal) {
    let stdData = {
        name: nameVal,
        age: ageVal,
        email: emailVal,
        phone: phoneVal,
        address: addressVal
    }
    if (sRate === count) {
        createStudent(stdData)
    }
}

function successMsg(nameVal, ageVal, emailVal, phoneVal, addressVal) {
    let formCon = document.getElementsByClassName("form-control");
    var count = formCon.length - 1;
    for (let i = 0; i < formCon.length; i++) {
        if (formCon[i].className === "form-control success") {
            var sRate = 0 + i;
            sendData(sRate, count, nameVal, ageVal, emailVal, phoneVal, addressVal);
        } else {
            return false;
        }
    }
}


function validateStudent() {
    const nameVal = nameStd.value.trim()
    const ageVal = ageStd.value.trim()
    const emailVal = emailStd.value.trim()
    const phoneVal = phoneStd.value.trim()
    const addressVal = addressStd.value.trim()

    // validate name
    if (nameVal === "") {
        setErrorMsg(nameStd, "Phần này không được để trống");
    } else {
        setSuccessMsg(nameStd);
    }

    // validate ageStd
    if (ageVal === "") {
        setErrorMsg(ageStd, "Phần này không được để trống");
    } else {
        setSuccessMsg(ageStd);
    }

    //   valdate email
    if (emailVal === "") {
        setErrorMsg(emailStd, "Phần này không được để trống");
    } else if (!isEmail(emailVal)) {
        setErrorMsg(emailStd, "Email không hợp lệ");
    } else {
        setSuccessMsg(emailStd);
    }

    // validate phoneStd
    if (phoneVal === "") {
        setErrorMsg(phoneStd, "Phần này không được để trống");
    } else {
        setSuccessMsg(phoneStd);
    }

    // validate province 

    if (addressVal === "") {
        setErrorMsg(addressStd, "Phần này không được để trống");
    } else {
        setSuccessMsg(addressStd);
    }

    successMsg(nameVal, ageVal, emailVal, phoneVal, addressVal);
}

function isEmail(emailVal) {
    var emailPattern =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailVal.match(emailPattern)) return true;
    return false;
}


function setErrorMsg(input, errormsg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.textContent = errormsg;
}

function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

