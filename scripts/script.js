'use strict';

new WOW().init();


document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove("open");
    }
});


const showTab = (elTabBtn) => {
    const elTab = elTabBtn.closest('.tab');
    if (elTabBtn.classList.contains('tab-btn-active')) {
        return;
    }
    const targetId = elTabBtn.dataset.targetId;
    const elTabPane = elTab.querySelector(`.tab-pane[data-id="${targetId}"]`);
    if (elTabPane) {
        const elTabBtnActive = elTab.querySelector('.tab-btn-active');
        elTabBtnActive.classList.remove('tab-btn-active');
        const elTabPaneShow = elTab.querySelector('.tab-pane-show');
        elTabPaneShow.classList.remove('tab-pane-show');
        elTabBtn.classList.add('tab-btn-active');
        elTabPane.classList.add('tab-pane-show');
    }
}
document.querySelectorAll('.slick-dots *').forEach((item) => {
    item.remove();
});

document.addEventListener('click', (e) => {
    if (e.target && !e.target.closest('.tab-btn')) {
        return;
    }
    const elTabBtn = e.target.closest('.tab-btn');
    showTab(elTabBtn);
});




$(".lazy").slick({
    lazyLoad: "progressive",
    slidesToShow: 4,
    infinite: true,
    speed: 2500,
    autoplaySpeed: 150,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
                rows: 2,
                slidesPerRow: 2,
            }
        }
    ]
});

const swiper = new Swiper(".mySwiper", {
    loop: true,
    loopFillGroupWithBlank: true,
    slidesPerView: 3,
    slidesPerGroup: 1,
    autoplay: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        800: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3,
        }
    },

    navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next',
    },
});

$(document).ready(function () {
    $('#inputTel').on('input', function () {
        const rawValue = $(this).val().replace(/\D/g, '');
        let formattedValue = '+7';

        if (rawValue.length > 1) {
            formattedValue += `(${rawValue.substring(1, 4)}`;
        }
        if (rawValue.length > 4) {
            formattedValue += `)${rawValue.substring(4, 7)}`;
        }
        if (rawValue.length > 7) {
            formattedValue += `-${rawValue.substring(7, 9)}`;
        }
        if (rawValue.length > 9) {
            formattedValue += `-${rawValue.substring(9, 11)}`;
        }

        $(this).val(formattedValue.slice(0, 16));
    });


    $('.validate').validate({
        rules: {
            inputName: {
                required: true,
                minlength: 2
            },
            inputTel: {
                required: true,
                minlength: 16
            }
        },
        messages: {
            inputName: "Введите ваше имя.",
            inputTel: "Введите корректный телефон."
        },
        submitHandler: function (form, event) {
            event.preventDefault();

            const name = $('#inputName').val();
            const phone = $('#inputTel').val();


            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {
                    name: name,
                    phone: phone
                }
            })
                .done(function (response) {
                    if (response.success) {
                        $('#message')
                            .html(`
                                <div class="message">
                                    <div class="message-info">
                                        <a id="message-close""><img class="message-close" src="/images/close.png" alt="крестик"></a> 
                                         <h2 class="form-title">Спасибо, что выбрали наш ресторан!</h2>
                                         <p class="form-text">В течение 15 минут наши менеджеры свяжутся с вами для подтверждения брони.</p>
                                         <img src="/images/sps-za-zakaz.png" alt="Спасибо зазаказ">
                                    </div>
                                </div> `)
                            .fadeIn(1000);
                        $('.book-table-form').trigger('reset');
                        $(document).on('click', '#message-close', function (e) {
                            e.preventDefault();
                            $('#message').fadeOut(500, function () {
                                $(this).empty();
                            });
                        });

                        $('#reservationForm').hide();
                    } else {
                        alert('Возникла ошибка при оформлении брони. Пожалуйста, позвоните нам.');
                        $('.book-table-form').trigger('reset');
                    }
                });
        }
    });
});







