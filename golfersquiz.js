const questionAndAnswer = [{
	question: 'Who won the 2006 Masters Tournament?',
	options: ['Phil Mickelson', 'Tiger Woods', 'Arnold Palmer', 'Luke Donald'],
	answer: 'Phil Mickelson'
}, {
	question: 'Which is not a Major?',
	options: ['Masters', 'US Open', 'The Open Championship', 'Honda Classic'],
	answer: 'Honda Classic'
}, {
	question: 'Who has won the most majors?',
	options: ['Arnold Palmer', 'Tiger Woods', 'Jack Nicklaus', 'Phil Mickelson'],
	answer: 'Jack Nicklaus'
}, {
	question: 'How many majors did Jack Nicklaus win?',
	options: ['12', '9', '19', '18'],
	answer: '18'
}
];

//move nothingChecked inside createQuestionBlock 

let correctAnswers = 0;
let i = 0;

function createQuestionBlock(){
const questionBlock = `
	<div id='q_and_a_block'>
		<h3>${questionAndAnswer[i].question}</h3>
		<form class="form">
			<label class='answer'>
				<input type="radio" name='answerOption' value='${questionAndAnswer[i].options[0]}'>
				<span>${questionAndAnswer[i].options[0]}</span>
			</label>

			<br>

			<label class='answer'>
				<input type="radio" name='answerOption' value='${questionAndAnswer[i].options[1]}'>
				<span>${questionAndAnswer[i].options[1]}</span>
			</label>

			<br>

			<label class='answer'>
				<input type="radio" name='answerOption' value='${questionAndAnswer[i].options[2]}'>
				<span>${questionAndAnswer[i].options[2]}</span>
			</label>

			<br>

			<label class='answer'>
				<input type="radio" name='answerOption' value='${questionAndAnswer[i].options[3]}'>
				<span>${questionAndAnswer[i].options[3]}</span>
			</label>
		</form>
		<button type="submit" class="tab answer-button" id="js-answer-submit">Submit Answer</button>
		<button type="submit" class="tab next-button" id="js-next-question">Next Question</button>
	</div>
	`


		$('.mainBlock').append(questionBlock);
		let nothingChecked = !$('input[name=answerOption]:radio:checked').val()
		$('#js-answer-submit').one("click", checkAnswer);
		$('#js-next-question').one("click", function(){
		$('#q_and_a_block').remove();
		$('.rightOrWrong').remove();
			if(i < questionAndAnswer.length){
				createQuestionBlock();
				createQuestionNumberBlock();
			}else{
				createTallyBlock();
				$('#js-restart').click(function(){
					location.reload();
				})
			}
		})
}

function createQuestionNumberBlock(){
	const questionNumberBlock = `
		<div class='change-question-number'>
			<p class='question-number-text'>Question</p>
			<br>
			<p class='question-number-number'>${i + 1}</p>
		</div>
	`
	$('#q_and_a_block').prepend(questionNumberBlock);
}

function createTallyBlock (){
	const tallyBlock = `
	<div>
		<h3 class='end-quiz congrat-text'>Congratulations!!!</h3> 
		<br> 
		<p class='end-quiz num-right'>You got ${correctAnswers} out of ${i} correct.</p>
	</div>
	<button class='tab end-quiz-button' id='js-restart'>Restart Quiz</button>
	`
	$('.mainBlock').append(tallyBlock);
}
//working...hides the intro text and adds the first question.
$('#js-intro-submit').click(function(){
	let nothingChecked = !$('input[name=answerOption]:radio:checked').val()
	$('#js-intro').addClass('hidden')
	createQuestionBlock();
	createQuestionNumberBlock();
})

// $('#js-next-question').click(function(){
// 	$('#q_and_a_block').remove();
// 	createQuestionBlock();
// })

function checkAnswer(){
	
	let userAnswer = $('input[name=answerOption]:radio:checked').val()
	const correctBlock = 
	`<div class='rightOrWrong'>
		<h4 class="rightOrWrong-text">Correct!</h4>
	</div>`

	const incorrectBlock = `
	<div class='rightOrWrong'>
		<h4 class="rightOrWrong-text">
		Incorrect! <br> The correct answer was ${questionAndAnswer[i].answer}
		</h4>
	</div>
	`
	
	if(userAnswer === questionAndAnswer[i].answer){
		$('.correct_or_not').append(correctBlock);
		correctAnswers++;
	}else{
		$('.correct_or_not').append(incorrectBlock);
	}
	i++;

}