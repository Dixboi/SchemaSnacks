fetch('snacks.json')
  .then(response => response.json())
  .then(data => {
    const today = 0 // new Date().getDay();
    const snack = data[today];

    if (!snack) return;

    document.getElementById("title").innerText = snack.title;
    document.getElementById("situation").innerText = snack.situation;
    document.getElementById("explanation-text").innerText = snack.explanation;

    const optionsDiv = document.getElementById("options");
    const allAnswers = [...snack.correct_answers, ...snack.incorrect_answers];
    window.correctAnswers = snack.correct_answers;

    allAnswers.forEach((option, index) => {
      const label = document.createElement("label");
      const letter = String.fromCharCode(97 + index);
      label.innerHTML = `<input type="checkbox" name="answer" value="${option}" /> ${letter}. ${option}`;
      optionsDiv.appendChild(label);
    });

    const resourceContainer = document.getElementById("resource-links");
    resourceContainer.innerHTML = "";

    snack.recommended_resources.forEach(res => {
      const link = document.createElement("a");
      link.href = res.url;
      link.innerText = res.title;
      link.target = "_blank";
      link.style.display = "block";
      link.style.marginTop = "0.3rem";
      resourceContainer.appendChild(link);
    });
  });

function checkAnswers() {
  const checkboxes = document.querySelectorAll("input[name='answer']");
  checkboxes.forEach((checkbox) => {
    const label = checkbox.parentElement;
    const answerText = label.textContent.slice(3).trim();

    if (correctAnswers.includes(answerText)) {
      label.style.backgroundColor = "#d4edda"; // green
    } else if (checkbox.checked) {
      label.style.backgroundColor = "#f8d7da"; // red
    }

    checkbox.disabled = true;
    label.style.borderRadius = "6px";
  });

  document.querySelector(".explanation").style.display = "block";
}
