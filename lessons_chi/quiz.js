/* 精簡、無相依性的測驗元件（繁體中文版）。
   標記約定：
     .quiz > .q > .options > button.option[data-correct="true"][data-feedback="..."]
     .quiz .score 用於顯示累計分數
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
              "<strong>" + (isCorrect ? "答對了。" : "答錯了。") + "</strong> " + hint;
          }

          if (scoreEl) {
            scoreEl.textContent = "目前 " + correct + " / " + answered + " 題答對";
          }
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.slice.call(document.querySelectorAll(".quiz")).forEach(initQuiz);
  });
})();
