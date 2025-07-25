fetch('snacks.json')
  .then(response => response.json())
  .then(data => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const snack = data[today];

    if (!snack) return;

    document.getElementById("title").innerText = snack.title;
    document.getElementById("situation").innerText = snack.situation;

    const optionsDiv = document.getElementById("options");
    const allAnswers = [...snack.correct_answers, ...snack.incorrect_answers];
    window.correctAnswers = snack.correct_answers;

    allAnswers.forEach((option, index) => {
      const label = document.createElement("label");
      const letter = String.fromCharCode(97 + index);
      label.innerHTML = `<input type="checkbox" name="answer" value="${option}" /> ${letter}. ${option}`;
      optionsDiv.appendChild(label);
    });

    const res = snack.recommended_resources[0];
    document.getElementById("resource-link").href = res.url;
    document.getElementById("resource-link").innerText = res.title;
  });

function checkAnswers() {
  const checkboxes = document.querySelectorAll("input[name='answer']");
  checkboxes.forEach((checkbox) => {
    const label = checkbox.parentElement;
    const answerText = label.textContent.slice(3).trim();

    if (checkbox.checked) {
      if (correctAnswers.includes(answerText)) {
        label.style.backgroundColor = "#d4edda"; // green
      } else {
        label.style.backgroundColor = "#f8d7da"; // red
      }
    }

    checkbox.disabled = true;
    label.style.borderRadius = "6px";
  });

  document.querySelector(".explanation").style.display = "block";
}
