document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    selectable: true,
    locale: 'th',
    selectable: true,
     
    dateClick: function(info) {
        
        const token = localStorage.getItem('token');
        if (!token) {
            alert('กรุณาเข้าสู่ระบบก่อนทำการจองเวลา');
            return;
        }
        
    }
});
  calendar.render();
});
