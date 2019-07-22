var questions = [{
        Question: "The player character in the Legend of Zelda series is usually",
        Answer1: "Zelda",
        Answer2: "Tingle",
        Answer3: "Navi",
        CorrectAnswer: "Link"
    }, {
        Question: "Which of the following is not a class in World of warcraft",
        Answer1: "Druid",
        Answer2: "Mage",
        Answer3: "Paladin",
        CorrectAnswer: "Necromancer"
    }, {
        Question: "The halo series was originally developed by what studio?",
        Answer1: "Treyarch",
        Answer2: "Nintendo",
        Answer3: "Jummper",
        CorrectAnswer: "Bungie"
    }, {
        Question: "Call of Duty 4: Modern Warfare was developed by what studio?",
        Answer1: "Treyarch",
        Answer2: "Activision",
        Answer3: "Sledgehammer",
        CorrectAnswer: "Infinity Ward"
    }, {
        Question: "Nier: Automata was directed by who?",
        Answer1: "Hideo Kojima",
        Answer2: "Shigeru Miyamoto",
        Answer3: "Koji Igarashi",
        CorrectAnswer: "Yoko Taro"
    }, {
        Question: "Fortnite was developed by what studio?",
        Answer1: "Bethesda",
        Answer2: "id",
        Answer3: "Nintendo",
        CorrectAnswer: "Epic"
    }]
    //holds the questions in the current game
var gameQuestions = Array.from(questions);


//object
var game = {

    //bool that tracks if the timer is going
    timerRunning: false,


    //value to star timer at
    timerDefault: 10,
    //holds the timer
    timer: 10,
    //holds correct answers
    correct: 0,
    //holds incorrect answers
    wrong: 0,
    //current correct answer
    currentCorrectAnswer: " ",
    //length of game
    length: 5,
    //questions asked
    questionsAsked: 0,
    //sets everything up for each questions
    startQuestion: function() {

        //randomly picks question from array
        var randomQuestion = Math.floor(Math.random() * gameQuestions.length);

        var currentQuestionObject = gameQuestions[randomQuestion];
        //removes question picked from array
        gameQuestions.splice(randomQuestion, 1);


        //grab questions and answers from questions array
        var currentQuestion = currentQuestionObject.Question;
        var answerArray = [currentQuestionObject.Answer1, currentQuestionObject.Answer2, currentQuestionObject.Answer3, currentQuestionObject.CorrectAnswer]
        game.currentCorrectAnswer = currentQuestionObject.CorrectAnswer;

        // timer = game.timerDefault;

        //resets everything in main
        game.clear();
        changing = $("main");
        $(".scoreAreaContainer").show();

        //creates the timer
        timerArea = $("<div>");
        timerArea.attr("id", "timer");
        timerArea.text(game.timer);
        changing.append(timerArea);

        //creates the question
        questionArea = $("<h1>");
        questionArea.text(currentQuestionObject.Question);
        questionArea.attr("id", "question");
        changing.append(questionArea);

        //creates the answer buttons
        for (var i = 0; i < 4; i++) {
            answerButtonCreator = $("<h2>");
            answerButtonCreator.attr("id", i);
            answerButtonCreator.attr("class", "answerButton");
            answerButtonCreator.text("answwer here");
            changing.append(answerButtonCreator);
        }


        //array that holds possible positions to place each answer
        var answerArrayNumbers = [0, 1, 2, 3];
        // looks and palces text into elements
        for (var j = 0; j < 4; j++) {
            //random number from array length
            var randomAnswer = Math.floor(Math.random() * answerArrayNumbers.length);
            // removing picked number from array
            arrayObject = answerArrayNumbers[randomAnswer];

            answerArrayNumbers.splice(randomAnswer, 1);

            //setting text of each button
            $("#" + arrayObject).text(answerArray[j]);

        }
        game.questionsAsked++;
        //starts the timer
        game.startTimer();
        $(".answerButton").on("click", game.answer);
    },

    answer: function() {
        contents = $(this).text();

        if (contents === game.currentCorrectAnswer) {
            game.correct++;
            game.CorrectAnswer();
            $("#correct").text(game.correct);

        } else {
            game.wrong++;
            game.wrongAnswer();
            $("#wrong").text(game.wrong);

        }

    },

    //starts the timer
    startTimer: function() {
        this.timer = this.timerDefault;
        //starts timer
        timer = setInterval(game.count, 1000);
        //sets timer running variable true     
        game.timerRunning = true;
    },

    //called every second to update timer
    count: function() {
        game.timer--;
        $("#timer").text(game.timer);
        if (game.timer <= 0) {
            game.outOfTime();
        }
    },

    endTimer: function() {

        game.timerRunning = false;
        clearInterval(timer);
        game.timer = game.timerDefault;
        $("#timer").text(game.timer);

    },

    endGame: function() {
        game.clear();

        //telling you how many uestion yuo got right and wrong
        var main = $("main");
        var winArea = $("<h1>");
        main.append(winArea);
        winArea.text("you got: " + game.correct + " Correct")

        var loseArea = $("<h1>");
        loseArea.text("you got: " + game.wrong + " Wrong")
        main.append(loseArea);

        //button to start the game again
        var nextButton = $("<div>");
        main.append(nextButton);
        nextButton.attr("id", "startButton");
        nextButton.text("Click here to restart");

        //reseting variables
        game.correct = 0;
        game.wrong = 0;
        gameQuestions = Array.from(questions);
        game.questionsAsked = 0;
        $(".scoreAreaContainer").hide();
        $("#startButton").on("click", game.startQuestion);
        $("#correct").text(game.correct);
        $("#wrong").text(game.wrong);
    },

    clear: function() {
        $("main").html("");
    },

    wrongAnswer: function() {
        game.endTimer();
        game.clear();
        //anounces that you missed the question and gives you the correct answer
        var main = $("main");
        var anounceArea = $("<h1>");
        main.append(anounceArea);
        anounceArea.html("sorry wrong answer the correct answer was '<b>" + game.currentCorrectAnswer + "'</b>");

        //createes button to move to the next question
        var nextButton = $("<div>");
        main.append(nextButton);
        nextButton.attr("id", "nextQuestionButton");
        nextButton.text("Click here for the next question");

        //checks if the lenght of the game has been hit and ends if it has
        if (game.questionsAsked >= game.length) {
            nextButton.text("click here to see your results");
            $("#nextQuestionButton").on("click", game.endGame);

        } else {

            $("#nextQuestionButton").on("click", game.startQuestion);
        }
    },

    CorrectAnswer: function() {
        game.endTimer();
        game.clear();

        //anounces that you missed the question and gives you the correct answer
        var main = $("main");
        var anounceArea = $("<h1>");
        main.append(anounceArea);
        anounceArea.text("Nice you got it right");

        //createes button to move to the next question
        var nextButton = $("<div>");
        main.append(nextButton);
        nextButton.attr("id", "nextQuestionButton");
        nextButton.text("Click here for the next question");

        if (game.questionsAsked >= game.length) {
            nextButton.text("click here to see your results");
            $("#nextQuestionButton").on("click", game.endGame);

        } else {

            $("#nextQuestionButton").on("click", game.startQuestion);
        }
    },

    outOfTime: function() {
        game.wrong++;
        $("#wrong").text(game.wrong);
        game.endTimer();
        game.clear();
        var main = $("main");
        var anounceArea = $("<h1>");
        main.append(anounceArea);
        anounceArea.html("sorry you ran out of time, the correct answer was '<b>" + game.currentCorrectAnswer + "'</b>");

        //createes button to move to the next question
        var nextButton = $("<div>");
        main.append(nextButton);
        nextButton.attr("id", "nextQuestionButton");
        nextButton.text("Click here for the next question");

        if (game.questionsAsked >= game.length) {
            nextButton.text("click here to see your results");
            $("#nextQuestionButton").on("click", game.endGame);

        } else {

            $("#nextQuestionButton").on("click", game.startQuestion);
        }
    }


}

$(".scoreAreaContainer").hide();
$("#startButton").on("click", game.startQuestion);