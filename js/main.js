/**
 * Created by aliaksei on 01.02.16.
 */


// Subst

/**
 * Query related methods
 */
var query = {

    getRawParam: function(url, name){
        var regex = new RegExp(name+"=([^&]+)");
        var found = regex.exec(url);
        return (found !== null ? found[1] : null);
    },

    getParam: function(url, name){
        var found = query.getRawParam(url, name);
        return (found !== null ? decodeURIComponent(found) : null);
    }
};

var variations = {

    calltracking: [
        {select: '#header h1', html:'Коллтрекинг'},
        {select: '#header h2', html:'Отслеживание звонков в Google Analytics'}
    ],

    crm: [
        {select: '#header h1', html:'Коллтрекинг'},
        {select: '#header h2', html:'Интеграция с amoCRM и Google Analytics'}
    ],

    dyn: [
        {select: '#header h1', html:'Динамический коллтрекинг'},
        {select: '#header h2', html:'Бесплатное подключение и консультация.'}
    ],

    pro: [
        {select: '#header h1', html:'Коллтрекинг'},
        {select: '#header h2', html:'Для глубокого анализа звонков'}
    ],

    pro2: [
        {select: '#header h1', html:'Коллтрекинг'},
        {select: '#header h2', html:'Профессиональная аналитика звонков'}
    ],

    pro3: [
        {select: '#header h1', html:'Коллтрекинг'},
        {select: '#header h2', html:'Профессиональная оптимизация рекламных кампаний'}
    ],

    call: [
        {select: '#header h1', html:'Коллтрекинг'},
        {select: '#header h2', html:'Анализ звонков до ключевого слова'}
    ]
	

};

function applyVariation(variations, name){
    if(!variations.hasOwnProperty(name))
        return;
    var v = variations[name];
    for(var i=0; i< v.length; i++){
        $(v[i]['select']).html(v[i]['html']);
    }
}

$(document).ready(function(){

    // subst content
    applyVariation(
        variations,
        query.getParam(window.location.href, 'v')
    );

    // hide watermark on the gallery
    $('a[href="http://amazingcarousel.com"]').hide();

    // track buttons
    $('.but').on('click', function(){
        var pos = $(this).data('pos');
        ga('send', 'event', 'Calltracking Landing', 'Button', 'Position '+pos);
    });

    $('.top_menu_partner').on('click', function(){
        ga('send', 'event', 'Calltracking Landing', 'Menu click');
    });



});

// End Subst

// Calltracking

(function(){
    window.ct_cid = '203';
    window.ct_url = '//track.sipuni.com/echo';
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
    s.src = '//track.sipuni.com/static/calltracking/js/client.js'; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}
)();

// End Calltracking

$(document).ready(function(){

    // Order Form
    $('#userForm').on('submit', function (event){
        event.preventDefault();

        var btn = $('#btn_submit');
        btn.html(btn.data('loading-text'));
        btn.attr('disabled', 'disabled');

        $.jsonp({
            url: 'http://sipuni.com/api/calltracking/invite',
            callbackParameter: "callback",
            data: {
                name: $('#person_name').val(),
                email: $('#email').val(),
                site: $('#website').val(),
                phone: $('#phone').val(),
                visits: '0',
                position: ''
            },
            success: function(result) {
                if (result.hasOwnProperty('success') && result.success) {
                    btn.html(btn.data('success-text'));
                    reach_goal('Form Submit');
                } else {
                    btn.removeAttr('disabled');
                    btn.html(btn.data('error-text'));
                }
            },
            error: function(d,msg) {
                btn.removeAttr('disabled');
                btn.html(btn.data('error-text'));
            }
        });

        return false;
    });
});


// Call me button

var $callMeButton = $('#btn-call');

window.timeOutId = undefined;

function scaleCallMeButton() {

    if (timeOutId !== undefined) {
        clearTimeout(timeOutId);
        timeOutId = undefined;
    }

    var animateDuration = 200,
        topMargin = 16,
        edgeOffset = 20;

    $callMeButton.css({
        '-webkit-transform': 'scale(0)',
        'transform': 'scale(0)'
    });
    $callMeButton.animate({opacity: 'hide'}, 0);

    window.timeOutId = window.setTimeout(function () {

        var coef = isIOS()
                ? Math.round(100 * window.innerWidth / (
                isLandscape() ? screen.height : screen.width
                )) / 100
                : Math.round(100 * window.innerWidth / screen.width) / 100,
            topCoef = Math.round(100 * window.innerHeight / screen.height) / 100,
            windowInnerWidth = window.innerWidth,
            windowInnerHeight = window.innerHeight,
            scrollLeft = $(window).scrollLeft(),
            scrollTop = $(window).scrollTop();

        $callMeButton.css({
            '-webkit-transform': 'scale(' + coef + ')',
            'transform': 'scale(' + coef + ')'
        });

        var buttonOuterWidth = $callMeButton.outerWidth(),
            buttonOuterHeight = $callMeButton.outerHeight(),
            left = Math.round(
                windowInnerWidth - 0.5 * buttonOuterWidth * (
                    coef + 1
                    ) - edgeOffset * coef
            ),
            top = Math.round(
                windowInnerHeight - topMargin + 0.5 * buttonOuterHeight * (
                    coef - 1
                    ) - buttonOuterHeight * coef - edgeOffset * coef
            );

        $callMeButton.css({
            top: top + scrollTop,
            left: left + scrollLeft
        });

        $callMeButton.animate({opacity: 'show'}, animateDuration);
    }, 2000);
}

scaleCallMeButton();

$(window).on('resize', scaleCallMeButton);
$(window).on('orientationchange', scaleCallMeButton);
$(window).on('touchmove', scaleCallMeButton);
$(window).on('scroll', scaleCallMeButton);

function isIOS() {
    return /(ipod|iphone|ipad)/i.test(navigator.userAgent) && !/CriOS|OPiOS/i.test(navigator.userAgent);
}

function isLandscape() {
    return Math.abs(window.orientation) === 90;
}

// End Call me button

//<!-- Google Analytics -->

if (!document.cookie.match(/_su_staff/)) {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-3786987-10', 'auto');
    ga('send', 'pageview');

    // no bounce
    var scrollCount = 0;

    function NoBounceScrollHandler() {
        scrollCount++;
        if (scrollCount == 2) {
            ga('send', 'event', 'NoBounce', 'Scroll');
        }
    }

    window.addEventListener ?
        window.addEventListener('scroll', NoBounceScrollHandler, false) :
        window.attachEvent('onScroll', NoBounceScrollHandler)
    // end no bounce

}
//<!-- /Google Analytics -->


//<!-- BEGIN JIVOSITE CODE {literal} -->

(function () {
    var widget_id = 'IB0Wj3N1K7';
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//code.jivosite.com/script/widget/' + widget_id;
    var ss = document.getElementsByTagName('script')[0];
    ss.parentNode.insertBefore(s, ss);
})();


function reach_goal(name){
    if(document.cookie.match(/_su_staff/))
        return;
    for(var k in window){
        if(window.hasOwnProperty(k) && k.match(/yaCounter/))
            window[k].reachGoal(name);
    }
    ga('send', 'event', 'Calltracking Landing', name);
}

/* Tariff calculator */

var calc = {

    cost_per_call: 5,

    tarifs: [
        {from:30, to:49, title:'30 звонков в день', price:3600, discount:20},
        {from:50, to:99, title:'50 звонков в день', price:4875, discount:35},
        {from:100, to:249, title:'100 звонков в день', price:7500, discount:50},
        {from:250, to:999, title:'250 звонков в день', price:18000, discount:52}
    ],

    find_tarif: function(calls, payment_period){
        var tarif=null;
        for(var i=0; i<this.tarifs.length; i++){
            var t=this.tarifs[i];
            if(calls>=t['from'] && calls<=t['to']){
                tarif = t;
                break;
            }
        }
        return {
            tarif: tarif,
            total: tarif ? tarif['price'] * payment_period : 0,
            discount: tarif ? tarif['discount'] : 0
        };
    },

    subscribtion: function(payment_period, is_customer){
        var pbx = is_customer ? 0 : (payment_period == 1 ? 2500: 990);
        var calltracking = 1500;
        return {
            pbx_month: pbx,
            pbx_total: pbx * payment_period,
            calltracking_month: calltracking,
            calltracking_total: calltracking * payment_period,
            total: (pbx+calltracking) * payment_period
        }
    },

    pay_per_call: function(calls, payment_period){
        return {
            month: calls * this.cost_per_call,
            total: calls * this.cost_per_call * payment_period
        };
    },

    calculate: function(calls, payment_period, is_customer){
        var tarif = this.find_tarif(calls, payment_period);
        var subscription = this.subscribtion(payment_period, is_customer);
        var per_call = this.pay_per_call(calls, payment_period);
        return {
            pack: tarif,
            per_call: per_call,
            subscription: subscription,
            total:  subscription['total'] + (tarif['tarif'] ? tarif['total'] : per_call['total']),
            discount: tarif['discount']
        }
    }
};

var calc_form = {

    run: function(form_id){
        var $form = $(form_id);
        var result = calc.calculate(
            this.safe_int( $form.find('input[name=calc_calls_day]').val() ),
            this.safe_int( $form.find('input[name=calc_payment_period]:checked').val() ),
            $form.find('input[name=calc_is_customer]:checked').val()=="1"
        );
        console.log(result);
        this.show_result(result);
    },

    safe_int: function(v){
        var res = parseInt(v);
        if (isNaN(res))
            return 0;
        return res;
    },

    comment: function(result){
        var text = [];
        text.push('Абонентская оплата: за облачную АТС ' + result['subscription']['pbx_total'] +
            ' руб. и за коллтрекинг ' + result['subscription']['calltracking_total'] + ' руб.');

        if(result['pack']['tarif']){
            text.push('Тариф '+ result['pack']['tarif']['title'] + ': ' + result['pack']['tarif']['price'] + ' руб. в месяц, скидка ' +
                result['pack']['discount'] + '%. При превышении дневного лимита оплата по '+calc.cost_per_call+' руб. за звонок.');
        }else{
            text.push('За звонки: по '+calc.cost_per_call+' руб. за отслеженный звонок.');
        }

        text.push('За номера платить ненужно, они выделяются автоматически в необходимом количестве.');

        return text.join('<br>');
    },

    show_result: function(result){
        $('#calc_result').show();
        $('#result_comment').html(this.comment(result));
        $('#result_total').html(result['total']);
    }

};

$(document).ready(function(){
   $('#calc_form').on('submit', function(e){
       e.preventDefault();
       calc_form.run('#calc_form');
       return false;
   });
});