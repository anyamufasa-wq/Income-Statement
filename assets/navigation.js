(() => {
  'use strict';
  const header = document.querySelector('header');
  const sidebar = document.querySelector('aside');
  if (!header || !sidebar) return;
  const logo = header.querySelector('.original-logo').outerHTML;
  const reports = [
    ['媒体政策', 'media-policy.html'], ['项目利润表', 'profit-project.html'],
    ['部门利润报表', 'profit-department.html'], ['客户利润报表', 'profit-customer.html'],
    ['业务利润报表', 'profit-business.html'], ['媒体利润报表', 'profit-media.html']
  ];
  const file = decodeURIComponent(location.pathname.split('/').pop());
  const centerNames = ['首页','合作方中心','业务中心','结算中心','商务中心','统计中心','工具中心','系统管理'];
  const paths = {
    chart: 'M2 13V3h2v8h11v2H2zm4-3V6h2v4H6zm4 0V3h2v7h-2z',
    project: 'M4 2h8l2 3H2l2-3zm-2 4h12v8H2V6zm5 2v2h2V8H7z',
    user: 'M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3 9l-2 6h14l-2-6-3-1-2 4-2-4-3 1z',
    supplier: 'M3 1h10l2 4v2h-1v8H2V7H1V5l2-4zm3 8v6h4V9H6z',
    diamond: 'M4 3h8l3 4-7 8L1 7l3-4zm1 3 3 4 3-4H5z',
    feed: 'M2 2h12v5H2V2zm0 7h4v5H2V9zm6 0h6v1H8V9zm0 3h6v2H8v-2z',
    home: 'M1 7 8 1l7 6-2 1v6H9v-4H7v4H3V8L1 7z',
    image: 'M3 2h12v10h-2V4H3V2zM1 5h11v10H1V5zm2 8h7L8 9l-2 2-1-1-2 3zm2-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
    person: 'M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM2 15v-2a6 6 0 0 1 12 0v2H2z',
    megaphone: 'M2 6h4l7-4v12l-7-4H5l1 5H3l-1-5H1V6h1z',
    grid: 'M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 0h5v5H9V9z',
    policy: 'M2 2h9v12H2V2zm2 3h5V4H4v1zm0 3h4V7H4v1zm8-3h2v7h-2V5zm-5 5 1 4 3-2-1-3-3 1z',
    opportunity: 'M8 1a5 5 0 0 1 3 9v3H5v-3A5 5 0 0 1 8 1zm-2 14h4v1H6v-1z'
  };
  const icon = name => `<span class="shell-side-icon"><svg viewBox="0 0 16 18" aria-hidden="true"><path d="${paths[name] || paths.grid}" stroke-width=".2" fill-rule="evenodd"/></svg></span>`;
  const item = (title, glyph, children = [], opts = {}) => ({ title, glyph, children, ...opts });
  const centers = {
    '首页': [],
    '合作方中心': [
      item('客户管理','user',['客户主体','客户名称']),
      item('供应商管理','supplier',['供应商主体','供应商名称','媒体管理'],{open:true}),
      item('MCN管理','user')
    ],
    '业务中心': [
      item('项目','project',['进入项目']),
      item('达人广告','user',['下单充值','执行','效果账户','达人库'],{open:true,current:true,active:'达人库'}),
      item('品牌广告','diamond',['下单充值','执行','效果账户']),
      item('信息流广告','feed',['下单充值','效果账户']),
      item('物业社群/零售','home',['销售下单','采购']),
      item('自营素材','image',['销售下单','采购']),
      item('自营账号','person',['销售下单','采购']),
      item('内广','megaphone',['效果账户']), item('其他','grid',['销售下单','采购']),
      item('客户政策','policy',['客户政策']), item('商机报备','opportunity',['商机报备'],{fresh:true})
    ],
    '结算中心': [item('客户结算','policy',['结算单','客户钱包']),item('收付款管理','project',['收付款记录'])],
    '商务中心': [item('发票','policy',['发票列表','申请开票']),item('合同','project',['合同列表','合同申请'])],
    '统计中心': [
      item('经营分析','chart',['业务管理报表','应收统计报表','应付统计报表','欠款统计报表','回款健康统计','逾期报表统计','业绩报表统计']),
      item('业务统计','chart',['业务统计']),
      item('利润统计','chart',reports,{open:true,current:true}),
      item('消耗分析看板','chart',['消耗分析看板'])
    ],
    '工具中心': [item('运营工具','grid',['运营日历']),item('资金工具','policy',['资金分配'])],
    '系统管理': [item('组织管理','user',['部门管理','用户管理']),item('角色管理','grid',['角色管理'])]
  };
  const svg = (body, cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">${body}</svg>`;
  const avatar = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#a8dbf8"/><path d="M8 40v-8c0-7 24-7 24 0v8" fill="#b9d879"/><path d="m16 28 4 7 4-7" fill="white"/><ellipse cx="20" cy="17" rx="9" ry="11" fill="#ffe6c7"/><path d="M11 17C10 1 31 4 29 18l-6-8c-2 5-7 6-12 7" fill="#f4c564"/></svg>';
  header.className = 'app-header';
  header.innerHTML = logo + `<nav class="shell-topnav" aria-label="顶部导航">${centerNames.map(name => `<div class="shell-topitem" data-center="${name}"><button class="shell-topbutton" data-center-button="${name}" type="button">${name}${name==='首页'?'':'<i class="shell-caret" aria-hidden="true"></i>'}</button>${centers[name].length?`<div class="shell-topdropdown">${centers[name].map((group,i)=>`<button type="button" data-center-group="${name}" data-group="${i}">${group.title}</button>`).join('')}</div>`:''}</div>`).join('')}</nav><div class="shell-header-tools"><span class="shell-panorama">${svg('<path d="M3 4h18v12H3zM9 20l3-4 3 4M7 11l3-3 3 3 4-4"/>')}客户全周期全景</span><span class="shell-tool help" aria-label="帮助">${svg('<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none"/><path d="M9.7 9a2.5 2.5 0 0 1 4.6 1.2c0 1.7-2.3 1.7-2.3 3.4M12 16.5v.5" stroke="white"/>')}</span><span class="shell-tool" aria-label="待办消息14条">${svg('<circle cx="12" cy="7" r="4" fill="currentColor" stroke="none"/><path d="M4 20v-3c0-5 16-5 16 0v3" fill="currentColor" stroke="none"/><path d="M2 22h20"/>')}<span class="shell-notification-count">14</span></span><span class="shell-profile" aria-label="当前用户">${avatar}<i class="shell-caret" aria-hidden="true"></i></span></div>`;
  sidebar.className = 'app-sidebar';
  let activeCenter = '统计中心';
  const leaf = (child, active) => {
    if (Array.isArray(child)) return `<a class="nav report-nav${child[1]===file?' active':''}" href="${child[1]}"${child[1]===file?' aria-current="page"':''}>${child[0]}</a>`;
    return `<button type="button" class="nav${child===active?' active':''}" data-leaf="${child}">${child}</button>`;
  };
  function renderSidebar(center, forcedGroup) {
    activeCenter = center;
    header.querySelectorAll('[data-center]').forEach(el => {
      const selected = el.dataset.center === center;
      el.classList.toggle('selected',selected);
      const button = el.querySelector('[data-center-button]');
      if(selected) button.setAttribute('aria-current','true'); else button.removeAttribute('aria-current');
    });
    sidebar.setAttribute('aria-label', center+'菜单');
    sidebar.innerHTML = `<div class="sidebar-context"><span>${center}</span><button type="button" class="shell-collapse" aria-label="收起左侧菜单" aria-expanded="${!document.body.classList.contains('shell-collapsed')}">${svg('<path d="M3 4h18M3 20h18M11 8h10M11 16h10M7 8l-4 4 4 4"/>')}</button></div><div class="shell-side-list">${centers[center].map((group,i) => group.children.length ? `<details class="sidegroup${group.current?' current':''}" data-side-group="${i}"${(forcedGroup===undefined?group.open:forcedGroup===i)?' open':''}><summary>${icon(group.glyph)}<span class="side-label">${group.title}</span>${group.fresh?'<span class="shell-new">New</span>':''}</summary>${group.children.map(child=>leaf(child,group.active)).join('')}</details>` : `<button type="button" class="shell-side-single" data-leaf="${group.title}">${icon(group.glyph)}<span class="side-label">${group.title}</span></button>`).join('')}</div>`;
    sidebar.querySelector('.shell-collapse').onclick = () => {
      const collapsed = document.body.classList.toggle('shell-collapsed');
      const button = sidebar.querySelector('.shell-collapse');
      button.setAttribute('aria-expanded',String(!collapsed));
      button.setAttribute('aria-label',collapsed?'展开左侧菜单':'收起左侧菜单');
    };
    sidebar.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',()=>{
      if(details.open) sidebar.querySelectorAll('details').forEach(other=>{if(other!==details)other.open=false;});
    }));
    sidebar.querySelectorAll('[data-leaf]').forEach(button=>button.onclick=()=>{
      sidebar.querySelectorAll('[data-leaf]').forEach(other=>other.classList.toggle('active',other===button));
      sidebar.querySelectorAll('.sidegroup').forEach(group=>group.classList.toggle('current',group.contains(button)));
    });
  }
  header.querySelectorAll('[data-center-button]').forEach(button=>button.onclick=()=>renderSidebar(button.dataset.centerButton));
  header.querySelectorAll('[data-center-group]').forEach(button=>button.onclick=()=>{
    renderSidebar(button.dataset.centerGroup,Number(button.dataset.group));
    button.blur();
  });
  renderSidebar(activeCenter);
})();
