//モーダルを開く・閉じる
const container = document.querySelector('.m-container');
const button = document.querySelector('.header__button');
const closeButton = document.querySelector('.modal__close__button');

button.addEventListener('click', () => {
    container.classList.toggle('openModal');
})
closeButton.addEventListener('click', () => {
    container.classList.toggle('openModal');
})

//カレンダーを表示する
const calendarShow = document.querySelector('.calendar__show');

calendarShow.addEventListener('click', () => {
    container.classList.toggle('openModal');
    container.classList.toggle('openCalendar');
})



//カレンダーの中身


const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
//現在日時を取得
const date = new Date()
//年を取得
const year = date.getFullYear()
//月を取得
const month = date.getMonth() + 1
//月の1日を取得
const startDate = new Date(year, month - 1, 1)
//月の末日を取得
const endDate = new Date(year, month, 0)
//月の末日が何日かを取得
const endDayCount = endDate.getDate()
//月の1日の曜日を取得
const startDay = startDate.getDay()
//日にちをカウント
let dayCount = 1
//HTMLを組み立てる変数
let calendarHtml = ''
//今日の日にちを取得
const today = date.getDate()

calendarHtml += '<h2>' + year + '年' + month + '月' + '</h2>'
calendarHtml += '<table>'
//曜日の行を作成
calendarHtml += '<tr>'
for(let i = 0; i <weeks.length; i++) {
    calendarHtml += '<td class="weekdays">' + weeks[i] + '</td>'
}
calendarHtml += '</tr>'
for(let w = 0; w < 6; w++) {
    calendarHtml += '<tr>'
    for(d = 0; d < 7; d++) {
        if(w == 0 && d < startDay) {
            calendarHtml += '<td></td>'
        } else if(dayCount > endDayCount) {
            calendarHtml += '<td></td>'
        } else {
            if(dayCount < today) {
                calendarHtml += '<td class="days-until-today days">' + dayCount +'</td>'
            } else if(dayCount == today) {
                calendarHtml += '<td class="date-of-today days" id="today">' + '<span>' + dayCount + '</span>' + '</td>'
            } else {
                calendarHtml += '<td class="days">' + dayCount +'</td>'
            }
            dayCount += 1
        }
    }
    calendarHtml += '</tr>'
}
calendarHtml += '</table>'

calendarHtml += '<div class="date__button">' + '<span>' + '決定' + '</span>' + '</div>'

document.querySelector('#calendar').innerHTML = calendarHtml


//カレンダーを閉じる


const dateButton = document.querySelector('.date__button')


dateButton.addEventListener('click', () => {
    container.classList.toggle('openCalendar');
    container.classList.toggle('openModal');
})

//カレンダーの日付をテキストボックスに反映
const dateOfToday = year + '年' + month + '月' + today + '日'
const thisMonth = year + '年' + month + '月'
const TextBoxToday = document.querySelector('.calendar__show__text__box');
const monthShow = document.querySelector('.month__show');


TextBoxToday.innerHTML = dateOfToday
monthShow.innerHTML = thisMonth

//カレンダーの中で選ぶ日を変える


const allDays = document.querySelectorAll('.days');
const thisDay = document.getElementById('today');

allDays.forEach(day => {
    day.addEventListener('click', () => {
        //クリックされたら、青いマークがついている今日の日付から、クラス名date-of-todayを削除
        if(thisDay.classList.contains('date-of-today')) {
            thisDay.classList.remove('date-of-today');
        }
        //クラス名is-chosenが含まれている日付があれば、is-chosenを削除、
        allDays.forEach(aDay => {
            if(aDay.classList.contains('is-chosen')) {
                aDay.classList.remove('is-chosen');
                let dateNumber = Number(aDay.innerText);
                // console.log(dateNumber);
                if(dateNumber < today) {
                    aDay.classList.add('days-until-today');
                }
            }
        })
        
        if(day.classList.contains('days-until-today')) {
            day.classList.remove('days-until-today');
        }
        day.classList.add('is-chosen');
        let dateEntered = day.innerText
        const dateForText = year + '年' + month + '月' + dateEntered + '日'
        TextBoxToday.innerHTML = dateForText
    })
})

// ApexCharts.jsを用いて、学習時間の棒グラフを表示
// グラフを表示
var options = {
        series: [{
            name: 'Time',
            data: [3,4,5,3,0,0,4,2,2,8,8,2,2,1,7,4,4,3,3,3,2,2,6,2,2,1,1,1,7,8]
        }],
    chart: {
        type: 'bar',
        height: 350,
        // ハンバーガーメニューを非表示
        toolbar: {
            show: false
        }
        // ハンバーガーメニューを非表示(ここまで)
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + "h"
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector(".container__hours__graph"), options);
chart.render();

// 円グラフ(学習言語)
var options = {
    series: [30, 20, 10, 5, 5, 20, 20, 10],
    labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'SQL', 'SHELL', '情報システム基礎(その他)'],
    colors: ['#0345EC','#2272BE','#4EBEDF','#54CEF6','#B29EF3','#6D46EC','#5045F0','#3635C0'],
    chart: {
        type: 'donut',
    },
    stroke: {
        width: 0
    },
    dataLabels: {
        style: {
            fontSize: '6px',
            fontWeight: '300'
        },
        dropShadow: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            customScale: 2.4,
            offsetY: 100,
            donut: {
                size: '50%'
            },
            dataLabels: {
                minAngleToShowLabel: 20
            }
        }
    },
    legend: {
        show: true,
        position: 'bottom',
        offsetY: 100,
        fontSize: '14px',
        horizontalAlign: 'left'
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + "h"
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector(".container__content__language__chart"), options);
chart.render();

// 円グラフ(学習コンテンツ)
var options = {
    series: [40, 20, 40],
    labels: ['N予備校', 'ドットインストール', '課題'],
    colors: ['#0345EC','#2272BE','#4EBEDF'],
    chart: {
        type: 'donut',
    },
    stroke: {
        width: 0
    },
    dataLabels: {
        style: {
            fontSize: '6px',
            fontWeight: '300'
        },
        dropShadow: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            customScale: 1.9,
            offsetY: 90,
            donut: {
                size: '50%'
            },
            dataLabels: {
                minAngleToShowLabel: 20
            }
        }
    },
    legend: {
        show: true,
        position: 'bottom',
        offsetY: 100,
        fontSize: '14px',
        horizontalAlign: 'left'
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + "h"
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector(".container__content__material__chart"), options);
chart.render();

// 記録・投稿ボタンを取得
const postButton = document.querySelector('.modal__record__button')

// .c-box-itemをclickしたら、.c-box-itemのcheckboxとbackgroundのcolorを変える
const contentsItems = document.querySelectorAll('.c-box-item');
const contentsItemsCheckbox = document.querySelectorAll('.c-box-item i');

contentsItems.forEach(contentsItem => {
    contentsItem.addEventListener('click', () => {
        contentsItem.classList.toggle('checked');
    })
})
// .l-box-itemをclickしたら、.l-box-itemのcheckboxとbackgroundのcolorを変える
const languageItems = document.querySelectorAll('.l-box-item');
const languageItemsCheckbox = document.querySelectorAll('.l-box-item i');

languageItems.forEach(languageItem => {
    languageItem.addEventListener('click', () => {
        languageItem.classList.toggle('checked');
    })
})


// .share__buttonをclickして、記録・投稿ボタンを押したら、twitter画面を表示し、テキスト内容を反映する関数を作成
const tweetText = () => {
    if(shareButtonCheckbox.classList.contains('checked')) {
        const commentForTwitter = document.getElementById('comment__for__twitter');
        const textContent = commentForTwitter.value;
        let url = document.location.href;
    
        // 投稿日時を表示
        const dateForTweet = new Date();
        const yearForTweet = dateForTweet.getFullYear();
        const monthForTweet = dateForTweet.getMonth() + 1;
        const todayForTweet = dateForTweet.getDate();
        // 修正(時間) 
        const hourForTweet = dateForTweet.getHours();
        // 修正(分)
        const minutesForTweet = dateForTweet.getMinutes();
    
        url = "http://twitter.com/share?url=" + yearForTweet + '/' + monthForTweet + '/' + todayForTweet + '/' + hourForTweet + ':' + minutesForTweet + "&text=" + textContent;
        window.open(url,"_blank");
    }
}

// .share__buttonをclickしたら、.share__button iのcolorが変わる
const shareButton = document.querySelector('.share__button');
const shareButtonCheckbox = document.querySelector('.share__button i');

shareButton.addEventListener('click', () => {
    shareButtonCheckbox.classList.toggle('checked');
    postButton.addEventListener('click', () => {
        tweetText();
        shareButtonCheckbox.classList.remove('checked');
    })
})

// ３秒間ローディング画面を表示した後、
// 記録・投稿完了画面を表示する
let isClicked = false;

postButton.addEventListener('click', () => {
    if(isClicked) {
        return;
    }
    isClicked = true;
    if(isClicked) {
        container.classList.remove('openModal');
        container.classList.add('openLoading');
        
        setTimeout(() => {
            container.classList.remove('openLoading');
            container.classList.add('openCompleted');
        }, 3000);
    }
})

// 記録・投稿画面を非表示
const closeButtonCompleted = document.querySelector('.post__completed__content .modal__close__button');

closeButtonCompleted.addEventListener('click', () => {
    container.classList.remove('openCompleted');
})