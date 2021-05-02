$(document).ready(function () {
    $("#find").click(() => {
        const eff = document.querySelector("#editFindForm");

        for (var i = 0; i < eff.elements.length; i++) {
            if (eff.elements[i].value === '' && eff.elements[i].hasAttribute('required')) {
                alert('Enter the ID number of the product you want to find');
                return;
            }
        }

        eff.submit();
    });

    $("#edit").click(() => {
        const eff = document.querySelector("#editform");

        for (var i = 0; i < eff.elements.length; i++) {
            if (eff.elements[i].value === '' && eff.elements[i].hasAttribute('required')) {
                alert('You cannot leave blank space in the product edit panel');
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
