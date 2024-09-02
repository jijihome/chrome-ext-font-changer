console.log('字体设置器扩展已加载');

document.getElementById('save').addEventListener('click', () => {
  console.log('保存按钮已点击');
  
  const enableAllSites = document.getElementById('enable-all-sites').checked;
  console.log('启用所有网站:', enableAllSites);
  
  const allowedUrls = document.getElementById('allowed-urls').value.split('\n').map(url => url.trim()).filter(url => url);
  const excludedUrls = document.getElementById('excluded-urls').value.split('\n').map(url => url.trim()).filter(url => url);
  const font = document.getElementById('font').value.trim();
  
  console.log('允许的URL:', allowedUrls);
  console.log('排除的URL:', excludedUrls);
  console.log('字体设置:', font);

  chrome.storage.sync.set({ enableAllSites, allowedUrls, excludedUrls, font }, () => {
    console.log('设置已保存到存储:', { enableAllSites, allowedUrls, excludedUrls, font });
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '', // 留空，这里不需要图标
      title: '字体设置器',
      message: '设置已保存！'
    });
  });
});

// 加载保存的设置，预填表单
chrome.storage.sync.get(['enableAllSites', 'allowedUrls', 'excludedUrls', 'font'], (data) => {
  console.log('从存储加载的设置:', data);
  
  if (data.enableAllSites !== undefined) {
    document.getElementById('enable-all-sites').checked = data.enableAllSites;
    console.log('启用所有网站:', data.enableAllSites);
  }
  
  if (data.allowedUrls) {
    document.getElementById('allowed-urls').value = data.allowedUrls.join('\n');
    console.log('允许的URL:', data.allowedUrls);
  }
  
  if (data.excludedUrls) {
    document.getElementById('excluded-urls').value = data.excludedUrls.join('\n');
    console.log('排除的URL:', data.excludedUrls);
  }
  
  if (data.font) {
    document.getElementById('font').value = data.font;
    console.log('字体设置:', data.font);
  }
});
