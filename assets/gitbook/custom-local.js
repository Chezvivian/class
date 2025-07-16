document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('toggle-summary-btn');
  var summary = document.querySelector('.book-summary');
  var body = document.querySelector('.book-body');

  // 创建展开按钮
  var expandBtn = document.createElement('button');
  expandBtn.id = 'expand-summary-btn';
  expandBtn.textContent = '» 展开导航';
  expandBtn.style = 'position:fixed;top:16px;left:16px;z-index:9999;display:none;background:#e3e8ef;border:none;border-radius:6px;padding:8px 12px;font-size:1.2em;color:#2d3a4a;cursor:pointer;box-shadow:0 2px 8px #ccc;';
  document.body.appendChild(expandBtn);

  function hideSidebar() {
    if (summary) summary.style.display = 'none';
    if (body) body.style.left = '0';
    expandBtn.style.display = 'block';
  }
  function showSidebar() {
    if (summary) summary.style.display = '';
    if (body) body.style.left = '';
    expandBtn.style.display = 'none';
  }

  if (btn && summary && body) {
    btn.addEventListener('click', function() {
      hideSidebar();
    });
  }
  expandBtn.addEventListener('click', function() {
    showSidebar();
  });
});
