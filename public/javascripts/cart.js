$(document).ready(function () {
    let cartQty = Number.parseInt($('#cartQty')[0].innerHTML);

    $('.button-rm').click((event) => {
        const item = event.target.parentElement.parentElement.parentElement;
        const size = event.target.parentElement.children[4].innerText.substr(7);
        const color = event.target.parentElement.children[5].innerText.substr(6);
        $.ajax({
                method: 'POST',
                url: `/cart/remove`,
                data: {
                    id: item.id,
                    ref: 'rm',
                    color,
                    size
                }
            })
            .done(() => {
                $('#cartQty')[0].innerText -= Number.parseInt(event.target.parentElement.children[7].children[1].innerText);
                item.remove();
                if ($('.button-rm').length < 1) {
                    $('.cart').remove();
                    $('.container.cartwrapper').append('<h6><b>Alışveriş sepetiniz boş!</b></h6><p style="padding-bottom: 2em;">Alışveriş sepetinize ürün kaydetmek veya daha önce kaydedilmiş ürünlere erişmek için oturum açın.</p>');
                }
            });
    });

    $('.qtyMinus').click((event) => {
        const item = event.target.parentElement.parentElement.parentElement.parentElement;
        const itemQty = event.target.parentElement.children[1];
        const size = event.target.parentElement.parentElement.children[4].innerText.substr(7);
        const color = event.target.parentElement.parentElement.children[5].innerText.substr(6);
        if (Number.parseInt(itemQty.innerText) - 1 > 0) {
            $.ajax({
                    method: 'POST',
                    url: `/cart/remove`,
                    data: {
                        id: item.id,
                        color,
                        size
                    }
                })
                .done((product) => {
                    $('#cartQty')[0].innerText = --cartQty;
                    itemQty.innerText = Number.parseInt(itemQty.innerText) - 1;
                    itemQty.parentElement.parentElement.children[6].innerText = `Toplam: ${product.totalPrice.toFixed(2)} ₺`;
                });
        }
    });

    $('.qtyPlus').click((event) => {
        const item = event.target.parentElement.parentElement.parentElement.parentElement;
        const size = event.target.parentElement.parentElement.children[4].innerText.substr(7);
        const color = event.target.parentElement.parentElement.children[5].innerText.substr(6);
        const itemQty = event.target.parentElement.children[1];
        $.ajax({
                method: 'POST',
                url: `/cart/add`,
                data: {
                    id: item.id,
                    color,
                    size
                }
            })
            .done((product) => {
                $('#cartQty')[0].innerText = ++cartQty;
                itemQty.innerText = Number.parseInt(itemQty.innerText) + 1;
                itemQty.parentElement.parentElement.children[6].innerText = `Toplam: ${product.totalPrice.toFixed(2)} ₺`;
            });
    });
});
