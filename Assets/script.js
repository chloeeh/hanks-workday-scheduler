

// Use jQuery to getElementId
// Set #ID to correspond to 24-hr clock to get colorCode to work
var nineAm = $("#09am");
var tenAm = $("#10am");
var elevenAm = $("#11am");
var twelvePm = $("#12pm");
var onePm = $("#13pm");
var twoPm = $("#14pm");
var threePm = $("#15pm");
var fourPm = $("#16pm");
var fivePm = $("#17pm");

var myHour = dayjs().hour();
var userInput;
var userHour;

function colorCode() {
  // for each item in .form-control class
  // can use for loop instead, but this is more modular in case more
  // time blocks are added. Reduces lines of code and potential error
  $(".form-control").each(function() {

    // parse through the items by their #id
    var timeBlock = parseInt($(this).attr("id"));
    // parse the current hour to convert the string into an integer
    // myHour = parseInt(myHour);
    console.log("my hour is: " + myHour);
    // console.log(timeBlock);

    // compares the current time to the times in the given schedule's timeblocks
    if(myHour > timeBlock) {
      // add a class to the ID items that are past the current time
      $(this).addClass("past");
    } else if (myHour < timeBlock) {
      // add a class to the ID items that are after the current time
      $(this).addClass("future");
    } else {
      // add a class to the ID items that indicates the current time
      $(this).addClass("present");
    }
  });
}


// TODO:
function init() {
  // console.log("Current Hour " + myHour);
  var storeInputNine = JSON.parse(localStorage.getItem("09:00 am"));
  nineAm.val(storeInputNine);

  var storeInputTen = JSON.parse(localStorage.getItem("10:00 am"));
  tenAm.val(storeInputTen);

  var storeInputEleven = JSON.parse(localStorage.getItem("11:00 am"));
  elevenAm.val(storeInputEleven);

  var storeInputTwelve = JSON.parse(localStorage.getItem("12:00 pm"));
  twelvePm.val(storeInputTwelve);

  var storeInputOne = JSON.parse(localStorage.getItem("01:00 pm"));
  onePm.val(storeInputOne);

  var storeInputTwo = JSON.parse(localStorage.getItem("02:00 pm"));
  twoPm.val(storeInputTwo);

  var storeInputThree = JSON.parse(localStorage.getItem("03:00 pm"));
  threePm.val(storeInputThree);

  var storeInputFour = JSON.parse(localStorage.getItem("04:00 pm"));
  fourPm.val(storeInputFour);

  var storeInputFive = JSON.parse(localStorage.getItem("05:00 pm"));
  fivePm.val(storeInputFive);

}


function updateClock() {
  var currentDate = dayjs().format('dddd, MMM D, YYYY');
  $('#currentDay').html(currentDate);

  var currentTime = dayjs().format('hh:mm:ss a')
  $('#currentTime').html(currentTime);
  // call this function again in 1000ms
  setTimeout(updateClock, 1000);
}

init();
colorCode();
updateClock();

$(".saveBtn").on("click", function() {
  userInput = $(this).siblings(".form-control").val();
  // console.log("my input: " + userInput);

  userHour = $(this).siblings(".input-group-text").text();
  console.log("my hour: " + userHour);
  localStorage.setItem(userHour, JSON.stringify(userInput));
  // localStorage.setItem("userHour", JSON.stringify(userHour));
})

