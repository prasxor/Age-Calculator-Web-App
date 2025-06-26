const main = document.createElement("div");
main.className = "maincontainer";
document.body.appendChild(main);

const style = document.createElement("style");

document.head.appendChild(style);

const settingsIcon = document.createElement("div");
settingsIcon.className = "settings-icon";
const img = document.createElement("img");
img.src = "/assets/gear-solid.svg";
img.alt = "Settings";
img.className = "settings-icon-img";

settingsIcon.appendChild(img);
document.body.appendChild(settingsIcon);

const settingsBox = document.createElement("div");
settingsBox.className = "settings-box";
settingsBox.innerHTML = `
  <p><b>Background</b></p>
  <div id="bgOptions"></div>
  <input type="file" id="bgUpload" accept="image/*">
  <p><b>Theme</b></p>
  <div id="themeOptions"></div>
  <p class="authorname"><a href="https://prasxor.me">author - Prasxor </a></p>
`;
document.body.appendChild(settingsBox);

settingsIcon.addEventListener("click", () => {
  settingsBox.style.display =
    settingsBox.style.display === "block" ? "none" : "block";
});

const bgOptions = [
  { value: "#ffecd2", type: "color", tooltip: "Soft peach" },
  { value: "#e0c3fc", type: "color", tooltip: "Purple haze" },
  { value: "./assets/rain-drop.jpg", type: "image", tooltip: "Rain drop" },
  {
    value: "/assets/wp10114525-anime-doodle-wallpapers.jpg",
    type: "image",
    tooltip: "Anime Doodle 1",
  },
  {
    value: "/assets/wp13353969-doodle-anime-wallpapers.jpg",
    type: "image",
    tooltip: "Anime Doodle 2",
  },
  {
    value: "/assets/wp14199734-whatsapp-doodle-wallpapers.jpg",
    type: "image",
    tooltip: "WhatsApp Doodle 1",
  },
  {
    value: "/assets/wp14199767-whatsapp-doodle-wallpapers.jpg",
    type: "image",
    tooltip: "WhatsApp Doodle 2",
  },
  {
    value: "/assets/wp15437317-flower-doodle-wallpapers.jpg",
    type: "image",
    tooltip: "Flower Doodle",
  },
];

const themeOptions = [
  { bg: "rgba(255,255,255,0.4)", text: "#000", tooltip: "Light Transparent" },
  { bg: "rgba(0,0,0,0.5)", text: "#fff", tooltip: "Dark Transparent" },
  { bg: "#ffffff", text: "#000", tooltip: "White Solid" },
  { bg: "rgba(0, 0, 0, 0)", text: "#000", tooltip: "Clear" },
];

function applyBackground(bg) {
  document.body.style.background =
    bg.type === "image" ? `url(${bg.value}) center/cover no-repeat` : bg.value;
  localStorage.setItem("userBackground", JSON.stringify(bg));
}

function loadSavedBackground() {
  const saved = localStorage.getItem("userBackground");
  if (saved) {
    const bg = JSON.parse(saved);
    applyBackground(bg);
  }
}

loadSavedBackground();

bgOptions.forEach((bg) => {
  const opt = document.createElement("div");
  opt.className = "bg-option";
  opt.setAttribute("data-tooltip", bg.tooltip || bg.value);

  if (bg.type === "image") {
    opt.style.background = `url(${bg.value}) center/cover no-repeat`;
  } else {
    opt.style.backgroundColor = bg.value;
  }

  opt.onclick = () => applyBackground(bg);

  document.getElementById("bgOptions").appendChild(opt);
});

const uploadInput = document.getElementById("bgUpload");
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const bg = {
        value: event.target.result,
        type: "image",
        tooltip: file.name,
      };
      applyBackground(bg);
    };
    reader.readAsDataURL(file);
  }
});

themeOptions.forEach((theme) => {
  const opt = document.createElement("div");
  opt.className = "color-option";
  opt.setAttribute("data-tooltip", theme.tooltip);
  opt.style.backgroundColor = theme.bg;
  opt.onclick = () => {
    const container = document.querySelector(".maincontainer");
    container.style.background = theme.bg;
    container.style.color = theme.text;
  };
  settingsBox.querySelector("#themeOptions").appendChild(opt);
});

["dayInput", "monthInput", "yearInput"].forEach((id) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateAge();
    }
  });
});

function displayAgeMessage(ageYears, ageMonths, ageDays) {
  const messageBox =
    document.getElementById("ageMessage") || document.createElement("div");
  messageBox.id = "ageMessage";

  let msg = "";

  if (ageMonths === 0 && ageDays === 0) {
    msg = `🎉 Happy ${ageYears}ᵗʰ Birthday! 🎂🎈`;
  } else if (ageYears < 13) {
    msg = "You're a cool kid! 🎈";
  } else if (ageYears < 20) {
    msg = "Teen energy activated! 🔥";
  } else if (ageYears < 30) {
    msg = "Time to hustle! 💼";
  } else if (ageYears < 50) {
    msg = "You're rocking adulthood! 🚀";
  } else {
    msg = "Full of wisdom and stories! 📚";
  }

  messageBox.textContent = msg;
  messageBox.style.marginTop = "10px";
  messageBox.style.fontSize = "16px";
  messageBox.style.textAlign = "center";

  document.querySelector(".maincontainer").appendChild(messageBox);
}

const errorBox = document.createElement("div");
errorBox.id = "errorMessage";
function calculateAge() {
  const dayInput = document.getElementById("dayInput");
  const monthInput = document.getElementById("monthInput");
  const yearInput = document.getElementById("yearInput");
  const errorBox = document.getElementById("errorMessage");

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value) - 1;
  const year = parseInt(yearInput.value);
  const today = new Date();
  const birthDate = new Date(year, month, day);

  const setError = (msg, input) => {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
    if (input) input.classList.add("input-error");
  };

  const clearError = () => {
    errorBox.textContent = "";
    errorBox.style.display = "none";
    [dayInput, monthInput, yearInput].forEach((input) =>
      input.classList.remove("input-error")
    );
  };

  clearError();

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return setError("⚠️ Please fill out all the fields.");
  }

  if (year > today.getFullYear()) {
    return setError("Birth year can't be in the future.", yearInput);
  }
  if (year < 1900) {
    return setError("That's too old to be real! Try again.", yearInput);
  }
  if (day < 1 || day > 31)
    return setError("Day should be between 1–31.", dayInput);
  if (month < 0 || month > 11)
    return setError("Month should be between 1–12.", monthInput);
  if (birthDate > today)
    return setError("Future date? That's not possible!", yearInput);

  const maxDays = new Date(year, month + 1, 0).getDate();
  if (day > maxDays) {
    return setError(
      `⚠️ ${day}/${month + 1}/${year} is not a valid date.`,
      dayInput
    );
  }

  let ageYears = today.getFullYear() - year;
  let ageMonths = today.getMonth() - month;
  let ageDays = today.getDate() - day;

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  animateCounter("years", ageYears);
  animateCounter("months", ageMonths);
  animateCounter("days", ageDays);

  displayAgeMessage(ageYears, ageMonths, ageDays);
}

function animateCounter(id, endVal) {
  const el = document.getElementById(id);
  let start = 0;
  const duration = 800;
  const step = Math.max(1, Math.floor(endVal / (duration / 50)));

  const interval = setInterval(() => {
    start += step;
    if (start >= endVal) {
      start = endVal;
      clearInterval(interval);
    }
    el.textContent = start.toString().padStart(2, "0");
  }, 50);
}

const upper = document.createElement("div");
upper.id = "Upperside";

const ranges = {
  DAY: [1, 31],
  MONTH: [1, 12],
  YEAR: [1000, 9999],
};

["DAY", "MONTH", "YEAR"].forEach((label) => {
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "uppersidefirstinput";

  const heading = document.createElement("h3");
  heading.textContent = label;

  const input = document.createElement("input");
  input.type = "number";
  input.inputMode = "numeric";
  input.maxLength = 4;
  input.pattern = "[0-9]*";
  input.placeholder = label === "YEAR" ? "0000" : "00";
  input.maxLength = label === "YEAR" ? 4 : 2;
  input.id = `${label.toLowerCase()}Input`;

  input.addEventListener("input", () => {
    if (input.value.length > input.maxLength) {
      input.value = input.value.slice(0, input.maxLength);
    }
  });

  input.addEventListener("input", () => {
    const value = parseInt(input.value);
    const [min, max] = ranges[label];

    if (value < min || value > max || isNaN(value)) {
      input.classList.add("input-error");
    } else {
      input.classList.remove("input-error");
    }
  });

  inputWrapper.appendChild(heading);
  inputWrapper.appendChild(input);
  upper.appendChild(inputWrapper);
});

main.appendChild(upper);
errorBox.className = "error-message";
errorBox.style.display = "none";
main.appendChild(errorBox);

const middle = document.createElement("div");
middle.className = "middleside";

const button = document.createElement("button");
button.type = "button";
button.id = "submitBtn";
button.textContent = "Submit";

middle.appendChild(button);
main.appendChild(middle);

const bottom = document.createElement("div");
bottom.id = "Bottomside";

const bottomLabels = ["years", "months", "days"];
bottomLabels.forEach((label) => {
  const container = document.createElement("div");
  container.className = "bottomsidefirst";

  const h2 = document.createElement("h2");
  h2.innerHTML = `<span class="purpleColor" id="${label}">00</span> ${label}`;

  container.appendChild(h2);
  bottom.appendChild(container);
});

main.appendChild(bottom);

document.body.appendChild(main);

document.getElementById("submitBtn").addEventListener("click", calculateAge);
