import { TaskBar } from '../views/task-bar/task-bar.js';
import { MainContainer } from '../views/main-container/main-container.js';
import { EmailContainer } from '../views/email/email.js';
import { DispatchContainer } from '../views/dispatch/dispatch.js';
import { CustomerContainer } from '../views/customer/customer.js';
import { CarrierContainer } from '../views/carrier/carrier.js';
import { LoadBoardContainer } from '../views/load-board/load-board.js';
import { InvoiceContainer } from '../views/invoicing/invoicing.js';

var taskBar = new TaskBar();
var mainContainer = new MainContainer();
var email = new EmailContainer();
var dispatch = new DispatchContainer();
var customer = new CustomerContainer();
var carrier = new CarrierContainer();
var loadBoard = new LoadBoardContainer();
var invoice = new InvoiceContainer();
var winRes = $(this).width();
var swiper;

$(document).ready(function () {
    // Adding dynamically the task bar and the main container
    taskBar.create(swiper, email, dispatch, customer, carrier, loadBoard, invoice, function () {
        mainContainer.create();
    });

    $(window).on('resize', function () {
        winRes = $(this).width();
    });    
});

async function countApp(callback) {
    let len = $(document).find('.swiper-wrapper .swiper-slide').length;
    if (len > 1) {
        await $(document).find('.app-counter').text(len - 1).removeClass('hidden');
    } else {
        await $(document).find('.app-counter').text(0).addClass('hidden');
    }
    callback();
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