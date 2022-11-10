
var currentDate = dayjs().format('dddd, MMM D, YYYY');
$('#currentDay').html(currentDate);

var currentTime = dayjs().format('hh:mm:ss a')
$('#currentTime').html(currentTime);
