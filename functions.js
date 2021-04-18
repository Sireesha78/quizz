var score = 0;
var pos = 0, wrong = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
var questions = null;
var ourRequest = new XMLHttpRequest();
var testing = localStorage.getItem("mv");
ourRequest.open('GET', testing);
ourRequest.onload = function () {
    questions = JSON.parse(ourRequest.responseText);
    console.log(questions[0]);
};
ourRequest.send();
function get(x) {
    return document.getElementById(x);
}
var count = 60;
var interval = setInterval(function () {
    document.getElementById('count').innerHTML = 'Remaining Time (Secs) :' + count;
    count--;
    if (count === 0) {
        clearInterval(interval);
        document.getElementById('count').innerHTML = 'Done';
        alert("You're out of time!");
        pos = questions.length;
        renderQuestion();
    }
}, 1000);

function renderQuestion() {

    test = get("test");
    if (pos >= questions.length) {
        score = correct
        register();
        clearInterval(interval);
        document.getElementById('count').innerHTML = 'Done';
        get("test_status").innerHTML = "Test completed";
        test.innerHTML = '<center><a class="button" href="result.html" role="button"><b>Click here for Results</b></a></center>';
        pos = 0;
        correct = 0;
        return false;
    }
    get("test_status").innerHTML = "Question " + (pos + 1) + " of " + questions.length;

    question = questions[pos].question;
    chA = questions[pos].a;
    chB = questions[pos].b;
    chC = questions[pos].c;
    test.innerHTML = "<h3>" + question + "</h3>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='A'> " + chA + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='B'> " + chB + "</label><br>";
    test.innerHTML += "<label> <input type='radio' name='choices' value='C'> " + chC + "</label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
function checkAnswer() {
    var getSelectedValue = document.querySelector('input[name="choices"]:checked');
    if (getSelectedValue != null) {
        choices = document.getElementsByName("choices");
        for (var i = 0; i < choices.length; i++) {
            if (choices[i].checked) {
                choice = choices[i].value;
            }
        }
        if (choice == questions[pos].answer) {
            correct++;
        }
        else {
            wrong++;
        }
        if (localStorage) {
            localStorage.setItem(pos, choice);
        }
        pos++;
        renderQuestion();
    }
    else {
        alert("Please select an option to continue");
    }

}
window.addEventListener("load", renderQuestion);
function register() {
    if (localStorage) {
        localStorage.setItem("score", score);
        localStorage.setItem("totalques", questions.length);
        localStorage.setItem("wrong", wrong);
    }
}
