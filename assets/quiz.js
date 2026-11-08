/* Minimal, dependency-free quiz component.
   Markup contract:
     .quiz > .q > .options > button.option[data-correct="true"][data-feedback="..."]
     .quiz .score for the running score
*/
(function () {
  "use strict";

  function initQuiz(quiz) {
    var questions = Array.prototype.slice.call(quiz.querySelectorAll(".q"));
    var scoreEl = quiz.querySelector(".score");
    var answered = 0;
    var correct = 0;

    questions.forEach(function (q) {
      var options = Array.prototype.slice.call(q.querySelectorAll(".option"));
      var feedback = q.querySelector(".feedback");

      options.forEach(function (option) {
        option.addEventListener("click", function () {
          if (q.getAttribute("data-answered") === "1") return;
          q.setAttribute("data-answered", "1");
          answered += 1;

          var isCorrect = option.getAttribute("data-correct") === "true";
          if (isCorrect) {
            correct += 1;
            option.classList.add("correct");
          } else {
            option.classList.add("wrong");
            options.forEach(function (other) {
              if (other.getAttribute("data-correct") === "true") {
                other.classList.add("correct");
              }
            });
          }

          options.forEach(function (other) {
            other.disabled = true;
          });

          if (feedback) {
            var hint = option.getAttribute("data-feedback") || "";
            feedback.innerHTML =
              "<strong>" + (isCorrect ? "Correct." : "Not quite.") + "</strong> " + hint;
          }

          if (scoreEl) {
            scoreEl.textContent = correct + " of " + answered + " correct so far";
          }
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.slice.call(document.querySelectorAll(".quiz")).forEach(initQuiz);
  });
})();
