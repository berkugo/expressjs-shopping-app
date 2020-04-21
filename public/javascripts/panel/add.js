const file_types = ['image/jpeg', 'image/png'];
const filesToUpload = [];
const available_file_size = 2 * 1024 * 1024;
const request = new XMLHttpRequest();

let elem = document.querySelector('#upload-file-real');

document.querySelector('#upload-file-fake').addEventListener('click', e => {
    elem.click();
});

request.addEventListener('load', function (e) {
    // console.log(request.response + request.responseText);
});

request.onreadystatechange = (request, response) => {
    // console.log(request.responseText);
}

document.querySelector('#upload-file-real').addEventListener('change', () => {
    if (filesToUpload.length === 5 || filesToUpload.length > 5 || document.querySelector('#upload-file-real').files.length > 5) {
        alert('En fazla 5 adet ürün görseli yüklenebilir.');
        return;
    }

    for (let i = 0; i < elem.files.length; i++) {
        if (file_types.includes(elem.files[i].type) == true) {
            if (elem.files[i].size > available_file_size) {
                alert("Görselin boyutu " + available_file_size / 1024 * 1024 + " MB'den büyük olamaz.")
                return;
            } else {
                const file_data = new FormData();
                filesToUpload.push(elem.files[i]);
                file_data.append('productimage', elem.files[i]);
                request.open('POST', '/panel/addimage');
                request.send(file_data);
            }
        } else {
            alert("Bu dosya tipi desteklenmiyor. Sadece jpeg ve png.");
        }
    }

    document.querySelector('#upinfo').innerHTML = filesToUpload.length + "/5";
});

document.querySelector("#addproduct").addEventListener("click", () => {
    const adminform = document.querySelector("#adminform");

    for (var i = 0; i < adminform.elements.length; i++) {
        if (adminform.elements[i].value === '' && adminform.elements[i].hasAttribute('required')) {
            alert('Ürün ekleme panelinde boş alan bırakamazsınız.');
            return;
        }
    }

    adminform.submit();
});
