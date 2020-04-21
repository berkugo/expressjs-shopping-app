$(document).ready(function () {
    $("#find").click(() => {
        const eff = document.querySelector("#editFindForm");

        for (var i = 0; i < eff.elements.length; i++) {
            if (eff.elements[i].value === '' && eff.elements[i].hasAttribute('required')) {
                alert('Bulmak istediğiniz ürünün ID numarasını girin');
                return;
            }
        }

        eff.submit();
    });

    $("#edit").click(() => {
        const eff = document.querySelector("#editform");

        for (var i = 0; i < eff.elements.length; i++) {
            if (eff.elements[i].value === '' && eff.elements[i].hasAttribute('required')) {
                alert('Ürün düzenleme panelinde boş alan bırakamazsınız');
                return;
            }
        }

        eff.submit();
    });

    $("#delete").click(() => {
        const form = document.querySelector("#editform");
        const id = form.attributes['action'].value.split('/')[3];

        alert('work in progress');
    });
});
