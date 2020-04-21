$(document).ready(function () {
    $(".dropdown-trigger").dropdown({
        hover: true,
        coverTrigger: false
    });
    $('select').formSelect();
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();

    $('.lang img').click((e) => {
        $.ajax({
            method: 'POST',
            url: `/lang/${e.target.id}`,
        })
        .done(res => {
            location.reload(true);
        });
    })
});
