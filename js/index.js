window.onscroll = function() {
    myFunction()
};
var header = document.getElementById("header");

var sticky = header.offsetTop;

function myFunction() {
    window.pageYOffset >= sticky ? header.classList.add("sticky") : header.classList.remove("sticky"),
        0 == window.pageYOffset && header.classList.remove("sticky")
}
$('.container__popup__close').click(function(e) {
    e.preventDefault();
    $('.popup__mortgage-application').removeClass('popup__active');
    $('body').removeClass('body__overflow');
    $('.wrapper__popup__thank').removeClass('wrapper__popup__thank__active');
});
if ($("body").data("title") === "index") {


    // $('a.yakor').on('click', function(event) {
    //     var $anchor = $(this)
    //     $(html, body)
    //         .stop()
    //         .animate({
    //             scrollTop: $($anchor.attr('href')).offset().top,
    //         }, {
    //             duration: 2000,
    //             specialEasing: {
    //                 width: 'linear',
    //                 height: 'easeInOutcubic'
    //             }
    //         })
    //     event.preventDefault()

    // });


    var rellax1 = new Rellax('.cb__img-hand__rellax');
    var rellax2 = new Rellax('.plots__img__rellax');
    var rellax3 = new Rellax('.plots__img__img');

    let bird1 = document.querySelector('.plots__birds-1');
    window.addEventListener('mousemove', function(e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        bird1.style.transform = 'translate(-' + x * 4 + 'px, -' + y * 4 + 'px)';
    });

    let bird2 = document.querySelector('.plots__birds-2');
    window.addEventListener('mousemove', function(e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        bird2.style.transform = 'translate(-' + x * 4 + 'px, +' + y * 4 + 'px)';
    });

    let bird3 = document.querySelector('.plots__birds-3');
    window.addEventListener('mousemove', function(e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        bird3.style.transform = 'translate(+' + x * 4 + 'px, +' + y * 4 + 'px)';
    });

    document.addEventListener("DOMContentLoaded", () => {

        const formFeedback = document.querySelector('.application__form');

        if (formFeedback) {
            let input = formFeedback.querySelectorAll('input');

            for (let i = 0; i < input.length; i++) {
                input[i].required = true;

                if (input[i].getAttribute('name') === 'tel') {
                    input[i].setAttribute("pattern", "([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})");
                }
            }

            formFeedback.addEventListener('submit', function(e) {
                e.preventDefault();
                const currentForm = this;
                const btn = formFeedback.querySelector('.application__btn');

                btn.disabled = true;

                let alert = currentForm.closest('.application').querySelector('.alert');

                if (alert) {
                    alert.remove();
                }

                fetch('mail-start-construction.php', {
                        method: 'POST',
                        body: new FormData(currentForm)
                    })
                    .then(status)
                    // .then(json)
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                        if (data === 'ok') {
                            $('.wrapper__popup__thank').addClass('wrapper__popup__thank__active');
                            currentForm.reset();
                        } else if (data == 'fields') {
                            text = 'Заполните все поля';
                            messageMail(currentForm, text, 'danger');
                        } else {
                            text = 'Произошла ошибка отправки, попробуйте ещё раз!';
                            messageMail(currentForm, text, 'danger');
                        }
                        btn.disabled = false;
                    })
                    .catch(function(error) {
                        alert('Произошла ошибка отправки, попробуйте ещё раз!');
                        btn.disabled = false;
                    });
            });
        }



        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function messageMail(form, text, className) {
            let div = document.createElement('div');
            div.className = "alert  alert-" + className;
            div.innerHTML = text;
            form.before(div);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {

        const formFeedback = document.querySelector('.application__form__popup');


        if (formFeedback) {
            let input = formFeedback.querySelectorAll('input');

            for (let i = 0; i < input.length; i++) {
                input[i].required = true;

                if (input[i].getAttribute('name') === 'tel') {
                    input[i].setAttribute("pattern", "([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})");
                }
            }

            formFeedback.addEventListener('submit', function(e) {
                e.preventDefault();
                const currentForm = this;
                const btn = formFeedback.querySelector('.application__btn__popup');

                btn.disabled = true;

                let alert = currentForm.closest('.application__popup').querySelector('.alert');

                if (alert) {
                    alert.remove();
                }

                fetch('mail-start-construction.php', {
                        method: 'POST',
                        body: new FormData(currentForm)
                    })
                    .then(status)
                    // .then(json)
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                        if (data === 'ok') {
                            $('.wrapper__popup__thank').addClass('wrapper__popup__thank__active');
                            $('.popup__mortgage-application').removeClass('popup__active');
                            currentForm.reset();
                        } else if (data == 'fields') {
                            text = 'Заполните все поля';
                            messageMail(currentForm, text, 'danger');
                        } else {
                            text = 'Произошла ошибка отправки, попробуйте ещё раз!';
                            messageMail(currentForm, text, 'danger');
                        }
                        btn.disabled = false;
                    })
                    .catch(function(error) {
                        alert('Произошла ошибка отправки, попробуйте ещё раз!');
                        btn.disabled = false;
                    });
            });
        }

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function messageMail(form, text, className) {
            let div = document.createElement('div');
            div.className = "alert  alert-" + className;
            div.innerHTML = text;
            form.before(div);
        }
    });
    window.onscroll = function() {
        myFunction2()
    };
    var headerr = document.getElementById("nav_bar");

    var stickyy = headerr.offsetTop;

    function myFunction2() {
        window.pageYOffset >= stickyy ? headerr.classList.add("sticky__nav-bar") : headerr.classList.remove("sticky__nav-bar"),
            0 == window.pageYOffset && headerr.classList.remove("sticky__nav-bar")
    }
    const swiper__upper = new Swiper('.swiper__upper', {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        on: {
            init() {
                this.el.addEventListener('mouseenter', () => {
                    this.autoplay.stop();
                });

                this.el.addEventListener('mouseleave', () => {
                    this.autoplay.start();
                });
            }
        },
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        speed: 10,
        slidesPerView: 'auto',
        grabCursor: true,
        autoplay: false,
    });
    $('.question-1').click(function(e) {
        e.preventDefault();
        $('.question-hidden-1').toggleClass('question-hidden-1__active');
        $('.question-main__img-1').toggleClass('question-main__img-1__active');
    });
    $('.question-2').click(function(e) {
        e.preventDefault();
        $('.question-hidden-2').toggleClass('question-hidden-2__active');
        $('.question-main__img-2').toggleClass('question-main__img-2__active');
    });
    $('.question-3').click(function(e) {
        e.preventDefault();
        $('.question-hidden-3').toggleClass('question-hidden-3__active');
        $('.question-main__img-3').toggleClass('question-main__img-3__active');
    });
    $('.question-4').click(function(e) {
        e.preventDefault();
        $('.question-hidden-4').toggleClass('question-hidden-4__active');
        $('.question-main__img-4').toggleClass('question-main__img-4__active');
    });
    $('.question-5').click(function(e) {
        e.preventDefault();
        $('.question-hidden-5').toggleClass('question-hidden-5__active');
        $('.question-main__img-5').toggleClass('question-main__img-5__active');
    });
    $('.question-6').click(function(e) {
        e.preventDefault();
        $('.question-hidden-6').toggleClass('question-hidden-6__active');
        $('.question-main__img-6').toggleClass('question-main__img-6__active');
    });
    $('.question-7').click(function(e) {
        e.preventDefault();
        $('.question-hidden-7').toggleClass('question-hidden-7__active');
        $('.question-main__img-7').toggleClass('question-main__img-7__active');
    });
    $('.question-8').click(function(e) {
        e.preventDefault();
        $('.question-hidden-8').toggleClass('question-hidden-8__active');
        $('.question-main__img-8').toggleClass('question-main__img-8__active');
    });
    $('.btn__popup__active').click(function(e) {
        e.preventDefault();
        $('.popup__mortgage-application').addClass('popup__active');
        $('body').addClass('body__overflow');
    });
    $('.container__popup__close').click(function(e) {
        e.preventDefault();
        $('.popup__mortgage-application').removeClass('popup__active');
        $('body').removeClass('body__overflow');
    });
}

if ($("body").data("title") === "project-house") {

    document.addEventListener("DOMContentLoaded", () => {

        const formFeedback = document.querySelector('.application__form');

        if (formFeedback) {
            let input = formFeedback.querySelectorAll('input');

            for (let i = 0; i < input.length; i++) {
                input[i].required = true;

                if (input[i].getAttribute('name') === 'tel') {
                    input[i].setAttribute("pattern", "([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})");
                }
            }

            formFeedback.addEventListener('submit', function(e) {
                e.preventDefault();
                const currentForm = this;
                const btn = formFeedback.querySelector('.application__btn');

                btn.disabled = true;

                let alert = currentForm.closest('.application').querySelector('.alert');

                if (alert) {
                    alert.remove();
                }

                fetch('mail-start-construction.php', {
                        method: 'POST',
                        body: new FormData(currentForm)
                    })
                    .then(status)
                    // .then(json)
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                        if (data === 'ok') {
                            $('.wrapper__popup__thank').addClass('wrapper__popup__thank__active');
                            currentForm.reset();
                        } else if (data == 'fields') {
                            text = 'Заполните все поля';
                            messageMail(currentForm, text, 'danger');
                        } else {
                            text = 'Произошла ошибка отправки, попробуйте ещё раз!';
                            messageMail(currentForm, text, 'danger');
                        }
                        btn.disabled = false;
                    })
                    .catch(function(error) {
                        alert('Произошла ошибка отправки, попробуйте ещё раз!');
                        btn.disabled = false;
                    });
            });
        }



        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function messageMail(form, text, className) {
            let div = document.createElement('div');
            div.className = "alert  alert-" + className;
            div.innerHTML = text;
            form.before(div);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {

        const formFeedback = document.querySelector('.application__form__popup');


        if (formFeedback) {
            let input = formFeedback.querySelectorAll('input');

            for (let i = 0; i < input.length; i++) {
                input[i].required = true;

                if (input[i].getAttribute('name') === 'tel') {
                    input[i].setAttribute("pattern", "([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})");
                }
            }

            formFeedback.addEventListener('submit', function(e) {
                e.preventDefault();
                const currentForm = this;
                const btn = formFeedback.querySelector('.application__btn__popup');

                btn.disabled = true;

                let alert = currentForm.closest('.application__popup').querySelector('.alert');

                if (alert) {
                    alert.remove();
                }

                fetch('mail-start-construction.php', {
                        method: 'POST',
                        body: new FormData(currentForm)
                    })
                    .then(status)
                    // .then(json)
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                        if (data === 'ok') {
                            $('.wrapper__popup__thank').addClass('wrapper__popup__thank__active');
                            $('.popup__mortgage-application').removeClass('popup__active');
                            currentForm.reset();
                        } else if (data == 'fields') {
                            text = 'Заполните все поля';
                            messageMail(currentForm, text, 'danger');
                        } else {
                            text = 'Произошла ошибка отправки, попробуйте ещё раз!';
                            messageMail(currentForm, text, 'danger');
                        }
                        btn.disabled = false;
                    })
                    .catch(function(error) {
                        alert('Произошла ошибка отправки, попробуйте ещё раз!');
                        btn.disabled = false;
                    });
            });
        }

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function messageMail(form, text, className) {
            let div = document.createElement('div');
            div.className = "alert  alert-" + className;
            div.innerHTML = text;
            form.before(div);
        }
    });
    document.addEventListener("DOMContentLoaded", () => {

        const formFeedback = document.querySelector('.application__form__popup-2');


        if (formFeedback) {
            // let input = formFeedback.querySelectorAll('input');

            // for (let i = 0; i < input.length; i++) {
            //     input[i].required = true;

            //     if (input[i].getAttribute('name') === 'tel') {
            //         input[i].setAttribute("pattern", "([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})");
            //     }
            // }

            formFeedback.addEventListener('submit', function(e) {
                e.preventDefault();
                const currentForm = this;
                const btn = formFeedback.querySelector('.application__btn__popup-2');

                btn.disabled = true;

                let alert = currentForm.closest('.application__popup-2').querySelector('.alert');

                if (alert) {
                    alert.remove();
                }

                fetch('mail-start-construction.php', {
                        method: 'POST',
                        body: new FormData(currentForm)
                    })
                    .then(status)
                    // .then(json)
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                        if (data === 'ok') {
                            $('.wrapper__popup__thank').addClass('wrapper__popup__thank__active');
                            $('.popup__recalcuation-application').removeClass('popup__active');
                            currentForm.reset();
                        }
                        // else if (data == 'fields') {
                        //     text = 'Заполните все поля';
                        //     messageMail(currentForm, text, 'danger');
                        // } else {
                        //     text = 'Произошла ошибка отправки, попробуйте ещё раз!';
                        //     messageMail(currentForm, text, 'danger');
                        // }
                        btn.disabled = false;
                    })
                    // .catch(function(error) {
                    //     alert('Произошла ошибка отправки, попробуйте ещё раз!');
                    //     btn.disabled = false;
                    // });
            });
        }

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function messageMail(form, text, className) {
            let div = document.createElement('div');
            div.className = "alert  alert-" + className;
            div.innerHTML = text;
            form.before(div);
        }
    });

    document.addEventListener("DOMContentLoaded", () => {

        const formFeedback = document.querySelector('.application__form__popup-3');


        if (formFeedback) {
            let input = formFeedback.querySelectorAll('input');

            for (let i = 0; i < input.length; i++) {
                input[i].required = true;

                if (input[i].getAttribute('name') === 'tel') {
                    input[i].setAttribute("pattern", "([\\+]*[7-8]{1}\\s?[\\(]*9[0-9]{2}[\\)]*\\s?\\d{3}[-]*\\d{2}[-]*\\d{2})");
                }
            }

            formFeedback.addEventListener('submit', function(e) {
                e.preventDefault();
                const currentForm = this;
                const btn = formFeedback.querySelector('.application__btn__popup-3');

                btn.disabled = true;

                let alert = currentForm.closest('.application__popup-3').querySelector('.alert');

                if (alert) {
                    alert.remove();
                }

                fetch('mail-start-construction.php', {
                        method: 'POST',
                        body: new FormData(currentForm)
                    })
                    .then(status)
                    // .then(json)
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data)
                        if (data === 'ok') {
                            $('.wrapper__popup__thank').addClass('wrapper__popup__thank__active');
                            $('.popup__start-construction').removeClass('popup__active');
                            currentForm.reset();
                        } else if (data == 'fields') {
                            text = 'Заполните все поля';
                            messageMail(currentForm, text, 'danger');
                        } else {
                            text = 'Произошла ошибка отправки, попробуйте ещё раз!';
                            messageMail(currentForm, text, 'danger');
                        }
                        btn.disabled = false;
                    })
                    .catch(function(error) {
                        alert('Произошла ошибка отправки, попробуйте ещё раз!');
                        btn.disabled = false;
                    });
            });
        }

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        }

        function messageMail(form, text, className) {
            let div = document.createElement('div');
            div.className = "alert  alert-" + className;
            div.innerHTML = text;
            form.before(div);
        }
    });

    $('.btn__g').click(function(e) {
        e.preventDefault();
        $('.popup__start-construction').addClass('popup__active');
        $('body').addClass('body__overflow');
    });
    $('.container__popup__close').click(function(e) {
        e.preventDefault();
        $('.popup__start-construction').removeClass('popup__active');
        $('body').removeClass('body__overflow');
    });
    $('.btn__popup__active').click(function(e) {
        e.preventDefault();
        $('.popup__mortgage-application').addClass('popup__active');
        $('body').addClass('body__overflow');
    });
    $('.container__popup__close').click(function(e) {
        e.preventDefault();
        $('.popup__mortgage-application').removeClass('popup__active');
        $('body').removeClass('body__overflow');
    });

    $('.btn__tr').click(function(e) {
        e.preventDefault();
        $('.popup__recalcuation-application').addClass('popup__active');
        $('body').addClass('body__overflow');
    });
    $('.container__popup__close').click(function(e) {
        e.preventDefault();
        $('.popup__recalcuation-application').removeClass('popup__active');
        $('body').removeClass('body__overflow');
    });
    lightGallery(document.getElementById('lightgallery'), {
        mode: 'lg-slide-skew-ver',
        thumbnail: true,
        plugins: [lgZoom, lgThumbnail],
        cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 1,
        licenseKey: 'your_license_key',
        allowMediaOverlap: true,
    });

    $('.tab-1').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-1').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-1').toggleClass('tab-hidden-1__active');
    });
    $('.tab-2').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-2').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-2').toggleClass('tab-hidden-2__active');
    });
    $('.tab-3').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-3').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-3').toggleClass('tab-hidden-3__active');
    });
    $('.tab-4').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-4').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-4').toggleClass('tab-hidden-4__active');
    });
    $('.tab-5').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-5').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-5').toggleClass('tab-hidden-5__active');
    });
    $('.tab-6').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-6').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-6').toggleClass('tab-hidden-6__active');
    });
    $('.tab-7').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-7').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-7').toggleClass('tab-hidden-7__active');
    });
    $('.tab-8').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-8').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-8').toggleClass('tab-hidden-8__active');
    });
    $('.tab-9').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-9').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-9').toggleClass('tab-hidden-9__active');
    });
    $('.tab-10').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-10').toggleClass('tab-main__img-1__active');
        $('.tab-hidden-10').toggleClass('tab-hidden-10__active');
    });

    $('.tab-11').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-11').toggleClass('tab-main__img-11__active');
        $('.tab-hidden-11').toggleClass('tab-hidden-11__active');
    });
    $('.tab-12').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-12').toggleClass('tab-main__img-12__active');
        $('.tab-hidden-12').toggleClass('tab-hidden-12__active');
    });
    $('.tab-13').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-13').toggleClass('tab-main__img-13__active');
        $('.tab-hidden-13').toggleClass('tab-hidden-13__active');
    });
    $('.tab-14').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-14').toggleClass('tab-main__img-14__active');
        $('.tab-hidden-14').toggleClass('tab-hidden-14__active');
    });
    $('.tab-15').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-15').toggleClass('tab-main__img-15__active');
        $('.tab-hidden-15').toggleClass('tab-hidden-15__active');
    });
    $('.tab-16').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-16').toggleClass('tab-main__img-16__active');
        $('.tab-hidden-16').toggleClass('tab-hidden-16__active');
    });
    $('.tab-17').click(function(e) {
        e.preventDefault();
        $('.tab-main__img-17').toggleClass('tab-main__img-17__active');
        $('.tab-hidden-17').toggleClass('tab-hidden-17__active');
    });
}