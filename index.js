document.getElementById("start-quiz-btn").addEventListener("click", async function() {
    const amount = document.getElementById("question-amount").value;
    const questions = await fetchQuestions(amount);
    displayQuestions(questions);
  });

  
  async function fetchQuestions(amount) {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
      const data = await response.json();
      return data.results;
    } catch(err) {
      console.error("Error of fetching ", err);
    }
  }

 /* function displayQuestions(questions) {
    const quizQuestionsDiv = document.getElementById("quiz-questions");
    quizQuestionsDiv.innerHTML = '';
  
    questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `
        <p><strong>Question ${index +1}:</strong> ${question.question}</p>
        <ul>
          ${question.incorrect_answers.map(answer => `<li>${answer}</li>`).join('')}
          <li>${question.correct_answer}</li>
        </ul>
      `;
      quizQuestionsDiv.appendChild(questionDiv);
    });
  
    document.getElementById("start-quiz-btn").style.display = "none";
    document.getElementById("submit-answers-btn").style.display = "block";
  }*/

  function displayQuestions(questions) {
    const quizQuestionsDiv = document.getElementById("quiz-questions");
    quizQuestionsDiv.innerHTML = '';
  
    questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `
        <p><strong>Question ${index +1}:</strong> ${question.question}</p>
        <form id="question-${index}-form">
          ${question.incorrect_answers.map(answer => `
            <input type="radio" id="question ${index} answer ${answer}" name="question-${index} answers" value="${answer}">
            <label for="question-${index}-answer-${answer}">${answer}</label><br>
          `).join('')}
          <input type="radio" id="question ${index} answer ${question.correct_answer}" name="question ${index} answers" value="${question.correct_answer}">
          <label for="question ${index} answer ${question.correct_answer}">${question.correct_answer}</label><br>
        </form>
      `;
      quizQuestionsDiv.appendChild(questionDiv);
    });
  
    document.getElementById("start-quiz-btn").style.display = "none";
    document.getElementById("submit-answers-btn").style.display = "block";
  }
  
  document.getElementById("submit-answers-btn").addEventListener("click", function() {
    const questions = document.querySelectorAll("#quiz-questions > div");
    let score = 0;
    questions.forEach((question, index) => {
      const selectedAnswer = question.querySelector(`input[name="question-${index}-answers"]:checked`);
      const correctAnswer = question.querySelector(`input[value="${questions[index].correct_answer}"]`);
      if (selectedAnswer && selectedAnswer.value === correctAnswer.value) {
        score++;
      }
    });
    document.getElementById("score").textContent = `Your score: ${score}/${questions.length}`;
    document.getElementById("score").style.display = "block";
  
    if (score >= questions.length / 2) {
      alert("You scored a good mark");
    } else {
      alert("improve your score");
    }
  });
  
  