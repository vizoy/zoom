
;(function (win) {
  win.onload = function() {
    let style = document.createElement('style')
    style.innerHTML = `
    #ztps-page-zoom-monitor {
      width: 450px;
      height: 280px;
      background: #fafafa;
      padding: 20px 20px;
      border-radius: 3px;
      overflow: hidden;
      border: 1px solid #ddd;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 100px;
      left: 0;
      margin: auto;
      z-index: 999999;
      display: none;
    }
    #ztps-page-zoom-monitor.on {
      display: block !important;
    }
    #ztps-page-zoom-monitor.on.sns .no-longer-btn {
      display: block !important;
    }
    #ztps-page-zoom-monitor h1,
    #ztps-page-zoom-monitor h2 {
      font-weight: normal;
      line-height: 1.5;
      margin-bottom: 10px;
      text-align: center;
      color: #555;
    }
    #ztps-page-zoom-monitor h1 {
      font-weight: bold;
      font-size: 20px;
    }
    #ztps-page-zoom-monitor h2 {
      font-size: 16px;
    }
    #ztps-page-zoom-monitor p {
      text-align: left;
      line-height: 1.5;
      margin-bottom: 10px;
      font-size: 14px;
      color: #666;
    }
    #ztps-page-zoom-monitor .close-btn {
      width: 100px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
      color: #555;
      font-size: 12px;
      border: 1px solid #ddd;
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    #ztps-page-zoom-monitor .no-longer-btn {
      font-size: 12px;
      color: #c7c7c7;
      cursor: pointer;
      position: absolute;
      right: 20px;
      bottom: 25px;
      display: none;
    }
    
    `
    
    document.head.appendChild(style)
    
    let div = document.createElement('div')
    div.id = 'ztps-page-zoom-monitor'
    div.innerHTML = `
      <h1>页面缩放比例不正确</h3>
      <h2>可能会影响某些功能的正常使用</h4>
      <p>1.请尝试调整浏览器缩放比例为100%(快捷键ctrl+0)</p>
      <p>2.请尝试调整系统显示比例为100%(控制面板-显示-设置)</p>
      <div class="close-btn">关闭</div>
      <div class="no-longer-btn">不再显示</div>
    `
    document.body.appendChild(div)
    
    
    let ztp = document.querySelector('#ztps-page-zoom-monitor')
    let cBtn = ztp.querySelector('.close-btn')
    let nBtn = ztp.querySelector('.no-longer-btn')
    
    const isShowLayer = () => {
      return !+localStorage.getItem('ztps_never_show') && window.outerWidth > 800
    }
    
    const sMonitor = (fk, isShow) => {
      let ztp = document.querySelector('#ztps-page-zoom-monitor')
      if (fk) {
        // 1/3概率出现"不在显示按钮"
        if ( !(Date.now() % 3) ) {
          ztp.classList.add('on', 'sns')
        } else {
          ztp.classList.add('on')
          ztp.classList.remove('sns')
        }
      } else {
        ztp.classList.remove('on')
        isShow && localStorage.setItem('ztps_never_show', 1)
      }
    }
    
    if (isShowLayer() && window.devicePixelRatio !== 1) {
      sMonitor(1)
    }
    
    window.onresize = () => {
      if (window.devicePixelRatio !== 1) {
        isShowLayer() && sMonitor(1)
      } else {
        sMonitor(0)
      }
    }
    
    cBtn.onclick = () => {
      sMonitor(0)
    }
    
    nBtn.onclick = () => {
      sMonitor(0, true)
    }
  }

})(window)