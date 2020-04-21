$(document).ready(function () {
    let cartQty = Number.parseInt($('#cartQty')[0].innerHTML);
    let elems = document.querySelectorAll('.sidenav');

    M.Sidenav.getInstance(elems[1]).destroy();
    M.Sidenav.init(document.querySelectorAll('#sg-slide-out'), {
        edge: 'right',
        draggable: false,
    });
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $(".button-buy").click(() => {
        const loc = window.location.href.split('/');
        const selects = document.querySelectorAll('select');
        const size = M.FormSelect.getInstance(selects[0]).$selectOptions.filter(opt => opt.selected)[0].innerText;
        $.ajax({
                method: 'POST',
                url: `/cart/add`,
                data: {
                    id: loc[loc.length - 1],
                    size
                }
            })
            .done(() => {
                $('#cartQty')[0].innerText = ++cartQty;
                M.toast({
                    html: `'${$('.productName')[0].innerText}' alışveriş sepetinize eklendi!`,
                    classes: 'rounded'
                });
            });
    });

});
