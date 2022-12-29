//クイズの問題と回答
const ALL_QUIZ = [
    {
        id: 1,
        question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
        answers: ['約28万人','約79万人','約183万人'],
        correctNumber: 1,
        note: '経済産業省 2019年3月 － IT 人材需給に関する調査'
    },
    {
        id: 2,
        question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
        answers: ['INTECH','BIZZTECH','X-TECH'],
        correctNumber: 2
    },
    {
        id: 3,
        question: 'IoTとは何の略でしょう？',
        answers: ['Internet of Things','Integrate into Technology','Information on Tool'],
        correctNumber: 0
    },
    {
        id: 4,
        question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
        answers: ['Society 5.0','CyPhy','SDGs'],
        correctNumber: 0,
        note: 'Society5.0 - 科学技術政策 - 内閣府'
    },
    {
        id: 5,
        question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
        answers: ['Web3.0','NFT','メタバース'],
        correctNumber: 0,
    },
    {
        id: 6,
        question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
        answers: ['約2倍','約5倍','約11倍'],
        correctNumber: 1,
        note: 'Accenture Technology Vision 2021'
    },
]

//クイズコンテナーの取得
const quizContainer = document.getElementById('js-quizContainer');

//クイズ1つ1つのHTMLを生成するための関数
const createQuizHtml = (quizItem, questionNumber) => {
    //回答の生成
    const answersHtml = quizItem.answers.map((answer, answerIndex) => 
        `<li class="p-quiz-box__answer__item">
            <button class="p-quiz-box__answer__button js-answer" data-answer="${answerIndex}">
                ${answer}
                <img src="../img/icon/icon-arrow.svg" alt="" class="u-icon__arrow">
            </button>
        </li>`
        ).join('');

    //引用テキストの生成
    const noteHtml = quizItem.note ? `<cite class="p-quiz-box__note">
        <img src="../img/icon/icon-note.svg" alt="" class="u-icon__note">
        ${quizItem.note}
    </cite>` : '';

    return `<section class="p-quiz-box js-quiz" data-quiz="${questionNumber}">
        <div class="p-quiz-box__question">
            <h2 class="p-quiz-box__question__title">
                <span class="p-quiz-box__label">
                    Q${questionNumber + 1}
                </span>
                <span class="p-quiz-box__question__title__text">
                ${quizItem.question}
                </span>
            </h2>
            <figure class="p-quiz-box__question__image">
                <img src="../img/quiz/img-quiz0${quizItem.id}.png" alt="">
            </figure>
        </div>
        <div class="p-quiz-box__answer">
            <span class="p-quiz-box__label  p-quiz-box__label--accent">
                A
            </span>
            <ul class="p-quiz-box__answer__list">
                ${answersHtml}
            </ul>
            <div class="p-quiz-box__answer__correct js-answerBox">
                <p class="p-quiz-box__answer__correct__title js-answerTitle"></p>
                <p class="p-quiz-box__answer__correct__content">
                    <span class="p-quiz-box__answer__correct__content__label">A</span>
                    <span class="js-answerText"></span>
                </p>
            </div>
        </div>
        ${noteHtml}
    </section>`
}

//配列の並び替え
const shuffle = arrays => {
    for(let i = arrays.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random()*(i + 1));
        [arrays[i], arrays[randomIndex]] = [arrays[randomIndex], arrays[i]];
    }
    return arrays
}

const quizArray = shuffle(ALL_QUIZ)

//生成したクイズのHTMLを＃js-quizContainerに挿入
quizContainer.innerHTML = quizArray.map((quizItem, index) => {
    return createQuizHtml(quizItem, index)
}).join('');

//すべての問題を取得
const allQuiz = document.querySelectorAll('.js-quiz');

//buttonタグにdisabledを付与
const setDisabled = answers => {
    answers.forEach(answer => {
        answer.disabled = true;
    })
};

//trueかfalseで出力する文字列を出し分ける
const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
};
const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
};

//各問題の中での処理
allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');

    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            answer.classList.add('is-selected');
            const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

            //全てのボタン非活性化
            setDisabled(answers);

            //正解ならtrue、不正解ならfalse
            const correctNumber = quizArray[selectedQuiz].correctNumber
            const isCorrect = correctNumber === selectedAnswerNumber;

            //回答欄にテキストやclass名を付与
            answerText.innerText = quizArray[selectedQuiz].answers[correctNumber];
            setTitle(answerTitle,isCorrect);
            setClassName(answerBox,isCorrect);
        })
    })
});
