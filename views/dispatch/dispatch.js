let location = window.location.href;

export class DispatchContainer {
    create(callback) {
        console.log('creating dispatch');
        let container = $(document).find('.swiper-wrapper');

        if ($(document).find('.swiper-slide #dispatch-container').length === 0) {
            let loader = $(document).find('.main-app-loader');
            loader.fadeIn(300);
            $.get(location + 'views/dispatch/dispatch.html', async function (content) {
                $(container).append(content);
                await eventListeners();
                await reorderDispatchPanels();
                await callback();
                loader.fadeOut(300);
            }, 'html');
        }
    }
}

function eventListeners() {
    let containerWidth = $(document).find('#swiper-slide-dispatch').width();

    $('#dispatch-main-panel-container')
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
        reorderDispatchPanels();
    });

    $(document).on('click', '.panel-close-btn', function () {
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
                reorderDispatchPanels();
            }
        });
    });

    $(document).on('click', '#dispatch-bill-to-company-info-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        $.get(location + 'views/panels/company-info/bill-to.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-company-info-bill-to') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#dispatch-shipper-company-info-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        $.get(location + 'views/panels/company-info/shipper.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-company-info-shipper') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#dispatch-consignee-company-info-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        $.get(location + 'views/panels/company-info/consignee.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-company-info-consignee') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#panel-routing-carrier-info-btn', function () {
        $('#dispatch-carrier-info-btn').click();
    });

    $(document).on('click', '#dispatch-carrier-info-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        $.get(location + 'views/panels/carrier-info/carrier-info.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-dispatch-carrier-info') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#dispatch-carrier-adjust-rate-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        let loader = $(document).find('.main-app-loader');
        loader.fadeIn();
        $.get(location + 'views/panels/adjust-rate/adjust-rate.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-adjust-rate') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

            loader.hide();

        }, 'html');
    });

    $(document).on('click', '#dispatch-documents-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        $.get(location + 'views/panels/documents/documents.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-carrier-docs') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#dispatch-load-board-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        console.log(mainContainer);
        console.log(panelContainer);

        $.get(location + 'views/panels/load-board/load-board.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-load-board') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#dispatch-bill-to-rate-load-btn', function () {
        let rateLoadBtn = $('#dispatch-rating-screen-btn');
        rateLoadBtn.click();
    });

    $(document).on('click', '#dispatch-rating-screen-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        console.log(mainContainer);
        console.log(panelContainer);

        $.get(location + 'views/panels/rating-screen/rating-screen.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-rating-screen') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#dispatch-routing-btn', function () {
        let btn = $(this);
        let mainContainer = btn.closest('.swiper-slide').find('.main-panel-container');
        let panelContainer = mainContainer.find('.panel-container');

        $.get(location + 'views/panels/routing/routing.html', async function (content) {
            if (panelContainer.find('.panel').length === 0) {

                mainContainer.css('left', ($(window).width() - mainContainer.width()) + 'px');
                panelContainer.append(content);
                reorderDispatchPanels();
            } else {
                let exist = false;

                for (let i = 0; i < panelContainer.find('.panel').length; i++) {
                    let panel = panelContainer.find('.panel').eq(i);

                    if (panel.attr('id') === 'panel-routing') {
                        panel.appendTo(panelContainer);
                        reorderDispatchPanels();
                        exist = true;
                        break;
                    }
                }

                if (!exist) {
                    panelContainer.append(content);
                    reorderDispatchPanels();
                }
            }

        }, 'html');
    });

    $(document).on('click', '#dispatch-shipper-switch-page-btn', function () {
        let btn = $(this);
        let btnLabel = btn.find('.mochi-button-base');
        let form = btn.closest('.form-section');
        let pagesWrapper = form.find('.pages-wrapper');

        if (btn.hasClass('1page')) {
            pagesWrapper.css('transform', 'translateX(-50%)');
            btnLabel.text('1st Page');
            btn.removeClass('1page');
        } else {
            pagesWrapper.css('transform', 'translateX(0)');
            btnLabel.text('2nd Page');
            btn.addClass('1page');
        }
    });

    $(document).on('click', '#dispatch-consignee-switch-page-btn', function () {
        let btn = $(this);
        let btnLabel = btn.find('.mochi-button-base');
        let form = btn.closest('.form-section');
        let pagesWrapper = form.find('.pages-wrapper');

        if (btn.hasClass('1page')) {
            pagesWrapper.css('transform', 'translateX(-50%) ');
            btnLabel.text('1st Page');
            btn.removeClass('1page');
        } else {
            pagesWrapper.css('transform', 'translateX(0)');
            btnLabel.text('2nd Page');
            btn.addClass('1page');
        }
    });

    $(document).on('click', '#dispatch-print-bol-btn', function () {
        let btn = $(this);
        let urlTemplate = 'views/templates/bol/bol.html';

        window.open(urlTemplate, 'BOL');
    });

    $(document).on('click', '.input-box-container.shows-popup input', function (e) {
        // e.stopPropagation();
        // let input = $(this);
        // let popupContainer = input.closest('.dispatch-wrapper').find('.mochi-contextual-container');
        // let popup = popupContainer.find('.mochi-contextual-popup');
        // let pos = getPopupPosition(input, popupContainer);

        // popup.attr('class',
        //     'mochi-contextual-popup ' +
        //     pos.isAboveBelow +
        //     pos.isCorner +
        //     pos.isLeftRight +
        //     pos.isVerticalHorizontal +
        //     pos.isLowHigh);

        // popup.html(`
        //     <div class="mochi-contextual-popup-content">
        //         <div class="mochi-contextual-popup-wrapper">

        //         </div>
        //     </div>
        // `);

        // popupContainer.fadeIn('fast');
    });

    $(document).on('click', '.input-box-container.drop-down input', function (e) {
        e.stopPropagation();
        let input = $(this);
        let popupContainer = input.closest('.dispatch-wrapper').find('.mochi-contextual-container');
        let popup = popupContainer.find('.mochi-contextual-popup');

        switch (input.attr('id')) {
            case 'cbo-dispatch-carrier-division':
                popup.html(`
                        <div class="mochi-contextual-popup-content">
                            <div class="mochi-contextual-popup-wrapper">
                                <p class="mochi-contextual-popup-item">Division 1</p>
                                <p class="mochi-contextual-popup-item">Division 2</p>
                                <p class="mochi-contextual-popup-item">Division 3</p>
                            </div>
                        </div>
                `);
                break;
            case 'cbo-dispatch-carrier-load-type':
                popup.html(`
                        <div class="mochi-contextual-popup-content">
                            <div class="mochi-contextual-popup-wrapper">
                                <p class="mochi-contextual-popup-item">Load Type 1</p>
                                <p class="mochi-contextual-popup-item">Load Type 2</p>
                                <p class="mochi-contextual-popup-item">Load Type 3</p>
                            </div>
                        </div>
                `);
                break;
            case 'cbo-dispatch-carrier-templates':
                popup.html(`
                        <div class="mochi-contextual-popup-content">
                            <div class="mochi-contextual-popup-wrapper">
                                <p class="mochi-contextual-popup-item">Template 1</p>
                                <p class="mochi-contextual-popup-item">Template 2</p>
                                <p class="mochi-contextual-popup-item">Template 3</p>
                            </div>
                        </div>
                `);
                break;
            case 'cbo-dispatch-carrier-equipment':
                popup.html(`
                        <div class="mochi-contextual-popup-content">
                            <div class="mochi-contextual-popup-wrapper">
                                <p class="mochi-contextual-popup-item">Equip. 1</p>
                                <p class="mochi-contextual-popup-item">Equip. 2</p>
                                <p class="mochi-contextual-popup-item">Equip. 3</p>
                            </div>
                        </div>
                `);
                break;
            case 'cbo-dispatch-carrier-events':
                popup.html(`
                        <div class="mochi-contextual-popup-content">
                            <div class="mochi-contextual-popup-wrapper">
                                <p class="mochi-contextual-popup-item">Event 1</p>
                                <p class="mochi-contextual-popup-item">Event 2</p>
                                <p class="mochi-contextual-popup-item">Event 3</p>
                            </div>
                        </div>
                `);
                break;
            default:
                break;
        }

        let pos = getPopupPosition(input, popupContainer);

        popup.attr('data-ctrl-id', input.attr('id'));

        popup.attr('class',
            'mochi-contextual-popup is-dropdown ' +
            pos.isAboveBelow +
            pos.isCorner +
            pos.isLeftRight +
            pos.isVerticalHorizontal +
            pos.isLowHigh);

        popup.find('.mochi-contextual-popup-item').eq(input.attr('data-selected-index')).css('background-color', 'rgba(0,0,0,0.1)');

        popupContainer.fadeIn('fast');
    });

    $(document).on('focusin', '.input-box-container.drop-down input', function (e) {
        $(this).prop('readonly', true);
    });
    $(document).on('focusout', '.input-box-container.drop-down input', function (e) {
        $(this).prop('readonly', false);
    });

    $(document).on('click', '.mochi-contextual-popup-item', function () {
        let item = $(this);
        let popup = item.closest('.mochi-contextual-popup');

        if (popup.hasClass('is-dropdown')) {
            let input = $(document).find('#' + popup.attr('data-ctrl-id'));
            input.val(item.text());
            input.attr('data-selected-index', item.index());
            popup.closest('.mochi-contextual-container').hide();
        }
    });
}

function getPopupPosition(input, popupContainer) {
    let offset = input.offset();
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();

    let isAboveBelow = '';
    let isLeftRight = '';
    let isVerticalHorizontal = '';
    let isCorner = '';
    let isLowHigh = '';

    if ((windowHeight - 170 - 30) > offset.top) {
        isAboveBelow = ' below';
        isVerticalHorizontal = ' vertical';
        popupContainer.css('top', offset.top + 10);
    } else {
        isAboveBelow = ' above';
        isVerticalHorizontal = ' vertical';
        popupContainer.css('top', offset.top - 170 - input.height());
    }

    let screenWSection = windowWidth / 3;

    if (offset.left <= (screenWSection * 1)) {

        isLeftRight = ' right';
        popupContainer.css('left', offset.left);

        if (input.width() < 70) {
            popupContainer.css('left', offset.left - 60 + (input.width() / 2));

            if (offset.left < 30) {
                isCorner = ' corner';
                popupContainer.css('left', offset.left + (input.width() / 2));
            }
        }

    } else if (offset.left <= (screenWSection * 2)) {

        popupContainer.css('left', offset.left - 100);
    } else {

        popupContainer.css('left', offset.left - 200);
        isLeftRight = ' left';

        if ((windowWidth - offset.left) < 100) {
            popupContainer.css('left', (offset.left) - (300 - (input.width() / 2)));
            isCorner = ' corner';
        }
    }

    return {
        isAboveBelow: isAboveBelow,
        isCorner: isCorner,
        isLeftRight: isLeftRight,
        isVerticalHorizontal: isVerticalHorizontal,
        isLowHigh: isLowHigh
    }
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
                    reorderDispatchPanels();
                } else if (u.position.left > 100) {
                    $(this).animate({
                        left: '100%'
                    }, 100, async function () {
                        await $(this).remove();
                        if (panelContainer.find('.panel').length === 0) {
                            mainPanelContainer.css('left', '100%');
                        } else {
                            reorderDispatchPanels();
                        }
                    });
                } else {
                    reorderDispatchPanels();
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
                                reorderDispatchPanels();
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
                                reorderDispatchPanels();
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

function reorderDispatchPanels() {
    let mainContainer = $(document).find('#dispatch-main-panel-container');
    let panelContainerWidth = mainContainer.find('.panel-container').width();
    let panelCount = mainContainer.find('.panel-container .panel').length;
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

        panel.animate({
            top: '0'
        }, 100);

        if (i === (panelCount - 1)) {
            panel.find('.panel-not-focused').fadeOut(100);
        } else {
            panel.find('.panel-not-focused').fadeIn(100);
        }
        panel.find('.panel-selection-handler').hide();
    }

    setPanelDraggable();
}