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
                calendarHtml += '<td class="date-of-today days today">' + '<span>' + dayCount + '</span>' + '</td>'
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


// const allDays = document.querySelectorAll('.days');


// allDays.forEach(day, () => {
//     day.addEventListener('click', () => {
//         day.classList.add('date-of-today');
        
//     })
// })