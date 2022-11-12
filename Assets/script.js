
// QUERY SELECTORS---------------------------------------------------------------
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


var allSpanHours = document.getElementsByTagName('span');
var allTextareas = document.getElementsByTagName('textarea');


// GLOBALS---------------------------------------------------------------
var arraySpanHours = [];
var arrayHourIds = [nineAm, tenAm, elevenAm, twelvePm, 
                    onePm, twoPm, threePm, fourPm, fivePm];
var myHour = dayjs().hour();
var userInput;
var userHour;


// FUNCTIONS---------------------------------------------------------------

// ColorCode() determines whether each timeblock is in the past, present or 
// future and updates the color of each timeblock accordingly to bring visual
// awareness of the time to the user
function colorCode() {
  // **can use for loop instead, but this is more modular in case more
  // time blocks are added. Reduces lines of code and potential error
  // for each item in .form-control class...
  // parse through the items by their #id
  $(".form-control").each(function() {
    var timeBlock = parseInt($(this).attr("id"));
    // console.log(timeBlock);

    // compares the current time to the each time in the given scheduler
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


// Call this function to initialize the page
// all items that the user saved in any timeblock will be retrieved from
// localStorage and displayed in the correct timeblock
function init() {
  // Create an array to hold the text displayed in all <span> elements
  for (var i = 0; i < allSpanHours.length; i++) {
    arraySpanHours.push(allSpanHours[i].innerHTML);
  }
  
  // For every key in localStorage
  // loop through all the items in the arraySpanHours
  // if a key and an element in arraySpanHours match
  // retrieve the value of that key and save into loadUserInput.
  // At the index in arraySpanHours of a match, display the value of 
  // localStorage into the <textarea> element which is given at the
  // matching index of arrayHourIds
  var loadUserInput;
  for (var key in localStorage){
    console.log("key: " + key);
    for (var i = 0; i < arraySpanHours.length; i++) {
      if (key == arraySpanHours[i]) {
        loadUserInput = JSON.parse(localStorage.getItem(key));
        arrayHourIds[i].val(loadUserInput);
        console.log("gottem");
      }
    }
  }
}

// Update the clock every second to display the time and date dynamically
function updateClock() {
  var currentDate = dayjs().format('dddd, MMM D, YYYY');
  $('#currentDay').html(currentDate);

  var currentTime = dayjs().format('hh:mm:ss a')
  $('#currentTime').html(currentTime);
  // call this function again in 1000ms
  setTimeout(updateClock, 1000);
}

// EVENT HANDLERS---------------------------------------------------------------

// When the user clicks on the save button, set the user input into
// localStorage with a key = the hour corresponding to the entry
$(".saveBtn").on("click", function() {
  // assign the value of the .saveBtn's sibling with class .form-control (textarea)
  // this will be used as the localStorage "value"
  userInput = $(this).siblings(".form-control").val();
   // assign the value of the .saveBtn's sibling with class .hour (span)
   // this will be used as the localStorage "key"
  userHour = $(this).siblings(".hour").text();

  localStorage.setItem(userHour, JSON.stringify(userInput));
})

// RUN CODE---------------------------------------------------------------

init();
colorCode();
updateClock();

