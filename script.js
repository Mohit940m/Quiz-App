const questions =[
    {
        question: "1+1?",
        answars: [
            { text: "5", correct: false},
            { text: "2", correct: true},
            { text: "3", correct: false},
            { text: "1", correct: false},
        ]
    },
    {
        question: "5+1?",
        answars: [
            { text: "5", correct: false},
            { text: "6", correct: true},
            { text: "3", correct: false},
            { text: "1", correct: false},
        ]
    },
    {
        question: "1+4?",
        answars: [
            { text: "5", correct: true},
            { text: "2", correct: false},
            { text: "3", correct: false},
            { text: "1", correct: false},
        ]
    },
    {
        question: "1+3?",
        answars: [
            { text: "4", correct: true},
            { text: "2", correct: false},
            { text: "3", correct: false},
            { text: "1", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answarsButtons = document.getElementById("answar-button");
const nextButton = document.getElementById("next-btn");

let currentQustionIndex = 0;
let score = 0;

function startQuize(){
    currentQustionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQustion();
}

function showQustion(){
    resetState();
    let currentQustion = questions[currentQustionIndex];
    let questionNo = currentQustionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQustion.question;

    currentQustion.answars.forEach(answar => {
        const button = document.createElement("button");
        button.innerHTML = answar.text;
        button.classList.add("btn");
        answarsButtons.appendChild(button);
        if(answar.correct){
            button.dataset.correct = answar.correct
        }
        button.addEventListener("click", selectAnswar);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answarsButtons.firstChild){
        answarsButtons.removeChild(answarsButtons.firstChild);
    }
}
function selectAnswar(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answarsButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQustionIndex++;
    if(currentQustionIndex < questions.length){
        showQustion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQustionIndex < questions.length){
        handleNextButton();
    }else{
        startQuize();
    }
})

startQuize();