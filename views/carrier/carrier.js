let location = window.location.href;

export class CarrierContainer {
    create(callback) {
        console.log('creating carrier');
        let container = $(document).find('.swiper-wrapper');

        if ($(document).find('.swiper-slide #carrier-container').length === 0) {

            let loader = $(document).find('.main-app-loader');
            loader.fadeIn(300);

            $.get(location + 'views/carrier/carrier.html', async function (content) {
                $(container).append(content);
                await eventListeners();
                await callback();
                loader.fadeOut(300);
            }, 'html');
        }
    }
}

function eventListeners() {
    let containerWidth = $(document).find('#swiper-slide-carrier').width();

    $('#carrier-main-panel-container')
        .resizable({
            handles: "w",
            containment: "parent",
            maxWidth: containerWidth * 0.9,
            minWidth: containerWidth * 0.1
        });


    $(document).on('click', '.gutter', function () {
        let panelContainer = $(this).closest('.panel-container');
        let count = panelContainer.find('.panel').length;

        for (let i = 0; i < count; i++) {
            let panel = panelContainer.find('.panel').eq(i);

            panel.find('.panel-not-focused').fadeOut(100);
            panel.find('.panel-selection-handler').show();
            panel.animate({
                left: ((100 / count) * i) + '%'
            }, 100);
        }
        setPanelDraggableVertical();
    });

    $(document).on('click', '.panel-selection-handler', function () {
        let panel = $(this).closest('.panel');
        let panelContainer = panel.closest('.panel-container');

        panel.appendTo(panelContainer);
        reorderCarrierPanels();
    });

    $(document).on('click', '.panel-close-btn', function(){
        let btn = $(this);
        let panelContainer = btn.closest('.panel-container');
        let mainPanelContainer = btn.closest('.main-panel-container');
        let panel = btn.closest('.panel');
        
        panel.animate({
            left: '100%'
        }, 100, function () {
            $(this).remove();
            if (panelContainer.find('.panel').length === 0) {
                mainPanelContainer.css('left', '100%');
            } else {
                reorderCarrierPanels();
            }
        });
    });

    $(document).on('click', '#carrier-mailing-address-revenue-info-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');     

        $.get(location + 'views/panels/revenue-info/revenue-information.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderCarrierPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-carrier-revenue-information') {
                        panel.appendTo(panelContainer);
                        reorderCarrierPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderCarrierPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#carrier-mailing-address-documents-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');     

        $.get(location + 'views/panels/documents/documents.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderCarrierPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-carrier-docs') {
                        panel.appendTo(panelContainer);
                        reorderCarrierPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderCarrierPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#carriers-contacts-add-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');     

        $.get(location + 'views/panels/contacts/contacts.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderCarrierPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-contacts') {
                        panel.appendTo(panelContainer);
                        reorderCarrierPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderCarrierPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#carrier-mailing-address-order-history-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        $.get(location + 'views/panels/order-history/order-history.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderCarrierPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-carrier-order-history') {
                        panel.appendTo(panelContainer);
                        reorderCarrierPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderCarrierPanels();
                }
            }

        }, 'html');
    });

    $('.star-rating-btn').mouseover(function(){
        let btn = $(this);        
        let id = btn.attr('id');
        let rateSelected = true;
        let ratingBox = btn.closest('rating-box-container');
        let starCount = ratingBox.find('star-rating-btn').length;

        for(let i = 0; i < starCount; i++){
            let curBtn = ratingBox.find('.star-rating-btn').eq(i);
            let curId = curBtn.attr('id');

            if (rateSelected){
                curBtn.removeClass('far');
                curBtn.addClass('fas');
            }else{
                curBtn.removeClass('fas');
                curBtn.addClass('far');
            }

            if(curId === id){
                rateSelected = false;
            }
        }
    });
    $('.star-rating-btn').mouseleave(function(){
        let btn = $(this);        
        let ratingBox = btn.closest('rating-box-container');
        let starBtn = ratingBox.find('star-rating-btn');

        starBtn.removeClass('fas');
        starBtn.addClass('far');
        rateSelected = true;
    })
}


function reorderCarrierPanels() {
    let mainContainer = $(document).find('#carrier-main-panel-container');
    let panelContainer = mainContainer.find('.panel-container');
    let panelCount = panelContainer.find('.panel').length;
    let gutter = mainContainer.find('.gutter');

    if (panelCount > 0) {
        gutter.css('width', ((panelCount - 1) * 10) + 'px');
    }

    for (let i = 0; i < panelCount; i++) {
        let panel = mainContainer.find('.panel-container .panel').eq(i);
        let offset = i * 10;

        panel.css('padding-right', offset + 'px');
        panel.animate({
            left: offset + 'px'
        }, 100);

        if (i === (panelCount - 1)) {
            panel.find('.panel-not-focused').fadeOut(100);
        } else {
            panel.find('.panel-not-focused').fadeIn(100);
        }
    }

    setPanelDraggable();
}

function setPanelDraggable() {
    $('.panel')
        .draggable({
            axis: 'x',
            handle: '.drag-handler',
            stop: function (e, u) {
                let mainPanelContainer = $(this).closest('.main-panel-container');
                let panelContainer = $(this).closest('.panel-container');
                let winSize = $(window).width();

                if (u.position.left < 0) {
                    reorderCarrierPanels();
                } else if (u.position.left > 100) {
                    $(this).animate({
                        left: '100%'
                    }, 100, function () {
                        $(this).remove();
                        if (panelContainer.find('.panel').length === 0) {
                            mainPanelContainer.css('left', '100%');
                        } else {
                            reorderCarrierPanels();
                        }
                    });
                } else {
                    reorderCarrierPanels();
                }
            }
        });
}

function setPanelDraggableVertical() {
    $('.panel')
        .draggable({
            axis: 'y',
            handle: '.panel-selection-handler',
            stop: function (e, u) {
                let mainPanelContainer = $(this).closest('.main-panel-container');
                let panelContainer = $(this).closest('.panel-container');
                let winSize = $(window).width();

                if (u.position.top < -100) {

                    $(this).animate({
                        top: '-100%'
                    }, 100, async function () {
                        await $(this).remove();
                        if (panelContainer.find('.panel').length === 0) {
                            mainPanelContainer.css('left', '100%');
                        } else {
                            let count = panelContainer.find('.panel').length;

                            if (count > 1) {
                                for (let i = 0; i < count; i++) {
                                    let panel = panelContainer.find('.panel').eq(i);

                                    panel.find('.panel-not-focused').fadeOut(100);
                                    panel.find('.panel-selection-handler').show();
                                    panel.animate({
                                        left: ((100 / count) * i) + '%'
                                    }, 100);
                                }

                            } else {
                                reorderCarrierPanels();
                            }
                        }
                    });

                } else if (u.position.top > 100) {

                    $(this).animate({
                        top: '100%'
                    }, 100, async function () {
                        await $(this).remove();
                        if (panelContainer.find('.panel').length === 0) {
                            mainPanelContainer.css('left', '100%');
                        } else {
                            let count = panelContainer.find('.panel').length;

                            if (count > 1) {
                                for (let i = 0; i < count; i++) {
                                    let panel = panelContainer.find('.panel').eq(i);

                                    panel.find('.panel-not-focused').fadeOut(100);
                                    panel.find('.panel-selection-handler').show();
                                    panel.animate({
                                        left: ((100 / count) * i) + '%'
                                    }, 100);
                                }

                            } else {
                                reorderCarrierPanels();
                            }
                        }
                    });
                } else {
                    let count = panelContainer.find('.panel').length;

                    for (let i = 0; i < count; i++) {
                        let panel = panelContainer.find('.panel').eq(i);
                        
                        panel.animate({
                            top: '0'
                        }, 100);
                    }
                }
            }
        });
}