var winRes = $(window).width();
export class TaskBar {
    create(swiper, email, dispatch, customer, carrier, loadBoard, invoice, callback) {
        $.get('views/task-bar/task-bar.html', function (content) {
            $('body').append(content);
            eventListeners(swiper, email, dispatch, customer, carrier, loadBoard, invoice);
            callback();
        }, 'html');
    }
}

function eventListeners(swiper, email, dispatch, customer, carrier, loadBoard, invoice) {
    $(window).on('click', function () {
        $(document).find('.mochi-contextual-container').hide();
    });

    $(document).on('click', '.mochi-contextual-container', function (e) {
        e.stopPropagation();
    });

    // $(document).on('click', 'input', function (e) {
    //     e.stopPropagation();
    //     let input = $(this);
    //     let inputWidth = input.width();
    //     let inputHeight = input.height();
    //     let id = input.attr('id');
    //     let popup = $('.mochi-contextual-container');
    //     let popupId = popup.attr('data-ctrl-id');

    //     console.log('w: ' + inputWidth + ' h: ' + inputHeight);

    //     popup.hide();
        
    //     popup.css('top', input.offset().top);
    //     popup.css('left', input.offset().left);
    //     popup.show();

    //     if (id === popupId) {


    //     } else {
            
    //     }
    // });



    $(document).on('change', '#cbox-search', function () {
        let btn = $(this);
        let taskBar = btn.closest('.task-bar');
        let searchContainer = taskBar.find('.search-container');

        if (btn.is(':checked')) {
            searchContainer.slideDown();
        } else {
            searchContainer.slideUp();
        }

    })

    // Going to Home
    $(document).on('click', '#btn-home', () => {
        if (typeof swiper === 'undefined') {
            $(document).find('.swiper-wrapper').css('transition', 'transform linear 0.3s');
            $(document).find('.swiper-wrapper').css('transform', 'translateX(0)');
        }
    });

    // Adding or Updating a Favorites Container
    $(document).on('click', '#btn-email', () => {
        if (typeof swiper === 'undefined') {
            let exist = false;
            let appCount = $(document).find('.swiper-wrapper .swiper-slide').length;

            for (let i = 0; i < appCount; i++) {
                let app = $(document).find('.swiper-wrapper .swiper-slide').eq(i);
                let id = app.attr('id');
                if (id === 'swiper-slide-email') {
                    $(document).find('.swiper-wrapper').css('transition', 'transform linear 0.3s');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * i) + 'px)');
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                email.create(function () {
                    let count = $(document).find('.swiper-wrapper .swiper-slide').length - 1;
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * count) + 'px)');
                });
            }
        }
    });

    $(document).on('click', '#btn-dispatch', () => {
        if (typeof swiper === 'undefined') {
            let exist = false;
            let appCount = $(document).find('.swiper-wrapper .swiper-slide').length;

            for (let i = 0; i < appCount; i++) {
                let app = $(document).find('.swiper-wrapper .swiper-slide').eq(i);
                let id = app.attr('id');
                if (id === 'swiper-slide-dispatch') {
                    $(document).find('.swiper-wrapper').css('transition', 'transform linear 0.3s');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * i) + 'px)');
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                dispatch.create(function () {
                    let count = $(document).find('.swiper-wrapper .swiper-slide').length - 1;
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * count) + 'px)');
                });
            }
        }
    });

    $(document).on('click', '#btn-customers', () => {
        if (typeof swiper === 'undefined') {
            let exist = false;
            let appCount = $(document).find('.swiper-wrapper .swiper-slide').length;

            for (let i = 0; i < appCount; i++) {
                let app = $(document).find('.swiper-wrapper .swiper-slide').eq(i);
                let id = app.attr('id');
                if (id === 'swiper-slide-customer') {
                    $(document).find('.swiper-wrapper').css('transition', 'transform linear 0.3s');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * i) + 'px)');
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                customer.create(function () {
                    let count = $(document).find('.swiper-wrapper .swiper-slide').length - 1;
                    console.log('translateX(-' + (winRes * count) + 'px)');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * count) + 'px)');
                });
            }
        }
    });
    $(document).on('click', '#btn-carriers', () => {
        if (typeof swiper === 'undefined') {
            let exist = false;
            let appCount = $(document).find('.swiper-wrapper .swiper-slide').length;

            for (let i = 0; i < appCount; i++) {
                let app = $(document).find('.swiper-wrapper .swiper-slide').eq(i);
                let id = app.attr('id');
                if (id === 'swiper-slide-carrier') {
                    $(document).find('.swiper-wrapper').css('transition', 'transform linear 0.3s');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * i) + 'px)');
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                carrier.create(function () {
                    let count = $(document).find('.swiper-wrapper .swiper-slide').length - 1;
                    console.log('translateX(-' + (winRes * count) + 'px)');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * count) + 'px)');
                });
            }
        }
    });
    $(document).on('click', '#btn-load-board', () => {
        if (typeof swiper === 'undefined') {
            let exist = false;
            let appCount = $(document).find('.swiper-wrapper .swiper-slide').length;

            for (let i = 0; i < appCount; i++) {
                let app = $(document).find('.swiper-wrapper .swiper-slide').eq(i);
                let id = app.attr('id');
                if (id === 'swiper-slide-load-board') {
                    $(document).find('.swiper-wrapper').css('transition', 'transform linear 0.3s');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * i) + 'px)');
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                loadBoard.create(function () {
                    let count = $(document).find('.swiper-wrapper .swiper-slide').length - 1;
                    console.log('translateX(-' + (winRes * count) + 'px)');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * count) + 'px)');
                });
            }
        }
    });
    $(document).on('click', '#btn-invoice', () => {
        if (typeof swiper === 'undefined') {
            let exist = false;
            let appCount = $(document).find('.swiper-wrapper .swiper-slide').length;

            for (let i = 0; i < appCount; i++) {
                let app = $(document).find('.swiper-wrapper .swiper-slide').eq(i);
                let id = app.attr('id');
                if (id === 'swiper-slide-invoice') {
                    $(document).find('.swiper-wrapper').css('transition', 'transform linear 0.3s');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * i) + 'px)');
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                invoice.create(function () {
                    let count = $(document).find('.swiper-wrapper .swiper-slide').length - 1;
                    console.log('translateX(-' + (winRes * count) + 'px)');
                    $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * count) + 'px)');
                });
            }
        }
    });

    $(document).on('click', '#btn-new-app', function (e) {
        if (typeof swiper === 'undefined') {
            let index = $(document).find('.swiper-wrapper .swiper-slide').length;

            $(document).find('.swiper-wrapper').append(
                `<div class="swiper-slide" id="swiper-slide-` + index + `" style="background-color: #eeeeee;">
                    <div class="title">
                        App index `+ index + `
                    </div>
                    <div class="swiper-slide-selectable">
                        <div class="swiper-slide-close-btn">Close</div>
                    </div>                 
                </div>
                `
            );

            let count = $(document).find('.swiper-wrapper .swiper-slide').length - 1;
            $(document).find('.swiper-wrapper').css('transform', 'translateX(-' + (winRes * count) + 'px)');
        }
    });

    $(document).on('click', '#btn-switch-app', (e) => {
        if ($(document).find('.swiper-wrapper .swiper-slide').length > 1) {
            $(document).find('.swiper-slide-selectable').show();
            $(document).find('.swiper-wrapper .swiper-slide').css('transform', 'scale(0.7)');
            $(document).find('.swiper-wrapper .swiper-slide').css('border-radius', '15px');

            if (typeof swiper === 'undefined') {
                swiper = new Swiper('.main-container', {
                    on: {
                        init: function () {
                            console.log('swiper initialized');
                        },
                        beforeDestroy: function () {
                            console.log("destroying");
                        },
                        slideChange: function () {
                            console.log(swiper.activeIndex);
                        }
                    }
                });
            }
        }
    });

    $(document).on('click', '.swiper-slide-selectable', function (e) {
        let slide = $(document).find('.swiper-wrapper .swiper-slide');
        slide.css('transform', 'scale(1)');
        slide.css('border-radius', '0');

        if (typeof swiper !== 'undefined') {
            swiper.destroy(true, false);
            swiper = undefined;
        }

        $(e.target).hide();
    });

    $(document).on('click', '.swiper-slide-close-btn', function (e) {
        e.stopPropagation();
        // swiper.removeSlide(swiper.activeIndex);
        // let btn = $(e.target);
        // let slide = btn.closest('.swiper-slide');
        // let id = slide.attr('id');
        // let index = 0;
        // let count = $(document).find('.swiper-wrapper .swiper-slide').length;

        // for(let i = 0; i < count; i++){
        //     let curSlide = $(document).find('.swiper-wrapper .swiper-slide').eq(i);

        //     if(curSlide.attr('id') === id){
        //         index = i;
        //         break;
        //     }
        // }

        // if (index > 0){
        //     // handle slide removing
        // }
    });
}