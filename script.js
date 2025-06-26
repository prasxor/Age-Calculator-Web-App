const main = document.createElement("div");
main.className = "maincontainer";


const style = document.createElement("style");

document.head.appendChild(style);

// === Settings Icon ===
// const settingsIcon = document.createElement("div");
// settingsIcon.className = "settings-icon";
// settingsIcon.innerHTML = "\u2699"; // gear icon ⚙
// document.body.appendChild(settingsIcon);

// const settingsBox = document.createElement("div");
// settingsBox.className = "settings-box";
// settingsBox.innerHTML = `
//   <p><b>Background</b></p>
//   <div id="bgOptions"></div>
//   <p><b>Theme</b></p>
//   <div id="themeOptions"></div>
// `;
// document.body.appendChild(settingsBox);

// settingsIcon.addEventListener("click", () => {
//   settingsBox.style.display =
//     settingsBox.style.display === "block" ? "none" : "block";
// });

// const bgOptions = [
//   { value: "#ffecd2", type: "color" },
//   { value: "#e0c3fc", type: "color" },
//   { value: "./assets/rain-drop.jpg", type: "image" },
//   { value: "./assets/wp10114525-anime-doodle-wallpapers.jpg", type: "image" },
//   { value: "./assets/wp13353969-doodle-anime-wallpapers.jpg", type: "image" },
//   {
//     value: "./assets/wp14199734-whatsapp-doodle-wallpapers.jpg",
//     type: "image",
//   },
//   {
//     value: "./assets/wp14199767-whatsapp-doodle-wallpapers.jpg",
//     type: "image",
//   },
//   { value: "./assets/wp15437317-flower-doodle-wallpapers.jpg", type: "image" },
// ];

// const themeOptions = [
//   { bg: "rgba(255,255,255,0.4)", text: "#000" },
//   { bg: "rgba(0,0,0,0.5)", text: "#fff" },
//   { bg: "#ffffff", text: "#000" },
//   { bg: "rgba(0, 0, 0, 0)", text: "clear" },
// ];

// bgOptions.forEach((bg) => {
//   const opt = document.createElement("div");
//   opt.className = "bg-option";

//   if (bg.type === "image") {
//     opt.style.background = `url(${bg.value}) center/cover no-repeat`;
//   } else {
//     opt.style.backgroundColor = bg.value;
//   }

//   opt.onclick = () => {
//     document.body.style.background =
//       bg.type === "image"
//         ? `url(${bg.value}) center/cover no-repeat`
//         : bg.value;
//   };

//   document.getElementById("bgOptions").appendChild(opt);
// });

// themeOptions.forEach((theme) => {
//   const opt = document.createElement("div");
//   opt.className = "color-option";
//   opt.style.backgroundColor = theme.bg;
//   opt.onclick = () => {
//     const container = document.querySelector(".maincontainer");
//     container.style.background = theme.bg;
//     container.style.color = theme.text;
//   };
//   settingsBox.querySelector("#themeOptions").appendChild(opt);
// });


const settingsIcon = document.createElement("div");
settingsIcon.className = "settings-icon";
settingsIcon.innerHTML = "\u2699"; // gear icon ⚙
document.body.appendChild(settingsIcon);

const settingsBox = document.createElement("div");
settingsBox.className = "settings-box";
settingsBox.innerHTML = `
  <p><b>Background</b></p>
  <div id="bgOptions"></div>
  <input type="file" id="bgUpload" accept="image/*">
  <p><b>Theme</b></p>
  <div id="themeOptions"></div>
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
  { value: "./assets/wp10114525-anime-doodle-wallpapers.jpg", type: "image", tooltip: "Anime Doodle 1" },
  { value: "./assets/wp13353969-doodle-anime-wallpapers.jpg", type: "image", tooltip: "Anime Doodle 2" },
  { value: "./assets/wp14199734-whatsapp-doodle-wallpapers.jpg", type: "image", tooltip: "WhatsApp Doodle 1" },
  { value: "./assets/wp14199767-whatsapp-doodle-wallpapers.jpg", type: "image", tooltip: "WhatsApp Doodle 2" },
  { value: "./assets/wp15437317-flower-doodle-wallpapers.jpg", type: "image", tooltip: "Flower Doodle" },
];

const themeOptions = [
  { bg: "rgba(255,255,255,0.4)", text: "#000", tooltip: "Light Transparent" },
  { bg: "rgba(0,0,0,0.5)", text: "#fff", tooltip: "Dark Transparent" },
  { bg: "#ffffff", text: "#000", tooltip: "White Solid" },
  { bg: "rgba(0, 0, 0, 0)", text: "#000", tooltip: "Clear" },
];

function applyBackground(bg) {
  document.body.style.background =
    bg.type === "image"
      ? `url(${bg.value}) center/cover no-repeat`
      : bg.value;
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
      const bg = { value: event.target.result, type: "image", tooltip: file.name };
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


// === Add Enter Key Submission ===
["dayInput", "monthInput", "yearInput"].forEach((id) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateAge();
    }
  });
});

// === Add Personalized Age Message ===
function displayAgeMessage(ageYears) {
  const messageBox =
    document.getElementById("ageMessage") || document.createElement("div");
  messageBox.id = "ageMessage";
  let msg = "";
  if (ageYears < 13) msg = "You're a cool kid! 🎈";
  else if (ageYears < 20) msg = "Teen energy activated! 🔥";
  else if (ageYears < 30) msg = "Time to hustle! 💼";
  else if (ageYears < 50) msg = "You're rocking adulthood! 🚀";
  else msg = "Full of wisdom and stories! 📚";

  messageBox.textContent = msg;
  messageBox.style.marginTop = "10px";
  messageBox.style.fontSize = "16px";
  messageBox.style.textAlign = "center";

  document.querySelector(".maincontainer").appendChild(messageBox);
}

// === Modify calculateAge to call displayAgeMessage ===
function calculateAge() {
  const day = parseInt(document.getElementById("dayInput").value);
  const month = parseInt(document.getElementById("monthInput").value) - 1;
  const year = parseInt(document.getElementById("yearInput").value);

  const today = new Date();
  const birthDate = new Date(year, month, day);

  if (isNaN(day) || isNaN(month) || isNaN(year))
    return alert("Please fill all fields.");
  if (day < 1 || day > 31) return alert("Day must be between 1-31.");
  if (month < 0 || month > 11) return alert("Month must be between 1-12.");
  if (birthDate > today) return alert("Date cannot be in the future.");

  const maxDays = new Date(year, month + 1, 0).getDate();
  if (day > maxDays) return alert(`Invalid date: ${day}/${month + 1}/${year}`);

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
  displayAgeMessage(ageYears);
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

// === Your Original DOM Setup Continues Here ===
// (Add the original code from the maincontainer generation if not already included.)

// === Upper Side ===
const upper = document.createElement("div");
upper.id = "Upperside";

["DAY", "MONTH", "YEAR"].forEach((label, i) => {
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "uppersidefirstinput";

  const heading = document.createElement("h3");
  heading.textContent = label;

  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "00";
  input.id = `${label.toLowerCase()}Input`;

  if (label === "YEAR") input.placeholder = "0000";

  inputWrapper.appendChild(heading);
  inputWrapper.appendChild(input);
  upper.appendChild(inputWrapper);
});
main.appendChild(upper);

// === Middle Side ===
const middle = document.createElement("div");
middle.className = "middleside";

const button = document.createElement("button");
button.type = "button";
button.id = "submitBtn";
button.textContent = "Submit";

middle.appendChild(button);
main.appendChild(middle);

// === Bottom Side ===
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

// === Append everything to body ===
document.body.appendChild(main);

// === Your calculateAge() logic here ===
document.getElementById("submitBtn").addEventListener("click", calculateAge);
