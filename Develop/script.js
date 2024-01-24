$(function () {
  var currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);
});

// Function to create a time block element
function createTimeBlock(id, hour, status, storedEvent) {
  var timeBlock = $('<div>').attr('id', id).addClass('row time-block ' + status);
  var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hour);
  var textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3).val(storedEvent);
  var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save')
      .append($('<i>').addClass('fas fa-save').attr('aria-hidden', 'true'));

  // Add click event to save button
  saveBtn.on('click', function () {
    var eventText = textarea.val();
    var storedEvents = getStoredEvents();
    storedEvents[id] = eventText;
    setStoredEvents(storedEvents);
});

return timeBlock.append(hourDiv, textarea, saveBtn);
}

// Function to get the current hour in 24-hour format
function getCurrentHour() {
  var now = new Date();
  return now.getHours();
}

// Function to determine the status (past, present, or future) based on the current hour
function getStatus(hour) {
  var currentHour = dayjs().hour();
  if (hour < currentHour) {
      return 'past';
  } else if (hour === currentHour) {
      return 'present';
  } else {
      return 'future';
  }
}

// Function to initialize the time blocks
function initializeTimeBlocks() {
  var container = $('.container-fluid');
  var storedEvents = getStoredEvents();
  container.empty(); 

  for (var i = 9; i <= 17; i++) {
      var id = 'hour-' + i;
      var hour = (i > 12) ? (i - 12) + 'PM' : i + 'AM';
      var status = getStatus(i);

      var timeBlock = createTimeBlock(id, hour, status, storedEvents[id]);
      container.append(timeBlock);
  }
}

function getStoredEvents() {
  var storedEvents = JSON.parse(localStorage.getItem('events')) || {};
  return storedEvents;
}

// Function to set stored events in session storage
function setStoredEvents(events) {
  localStorage.setItem('events', JSON.stringify(events));
}

// Function to transfer events from session storage to local storage
function transferEventsToLocalStorage() {
  var storedEvents = getStoredEvents();
  setStoredEvents(storedEvents);
}

// Initialize time blocks on page load
initializeTimeBlocks();

// Call the function to initialize time blocks when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeTimeBlocks);
