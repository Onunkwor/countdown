const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2023, 10, 10, 13, 18, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

let month = futureDate.getMonth();
month = months[month];
let day = futureDate.getDay();
day = weekdays[day];

giveaway.textContent = `giveaway ends on ${day}, ${date} ${month} ${year} ${hours}:${minutes}pm`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const diff = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr
  // values in ms

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = Math.floor(diff / oneDay);
  let hours = Math.floor((diff % oneDay) / oneHour);
  let minutes = Math.floor((diff % oneHour) / oneMinute);
  let seconds = Math.floor((diff % oneMinute) / 1000);

  // set values array;
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    } else {
      return item;
    }
  }
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  if (diff < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this give away has expired</h4>`;
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
