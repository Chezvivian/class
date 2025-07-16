document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('toggle-summary-btn');
  var summary = document.querySelector('.book-summary');
  var body = document.querySelector('.book-body');
  if (btn && summary && body) {
    btn.addEventListener('click', function() {
      if (summary.style.display === 'none') {
        summary.style.display = '';
        body.style.left = '';
      } else {
        summary.style.display = 'none';
        body.style.left = '0';
      }
    });
  }
});
