function removeAllAds() {
  // 统一选择器
  const knownAdSelectors = [
    '.picture-ad',
    // 其他已知广告类
    '#csdn-toolbar', '.advertisement', '#kp_box_561', '.csdn-side-toolbar',
    '.recommend-box', '#recommendAdBox', '.mediav_ad', '#passportbox',
    '.pulllog-box', '.login-mark', '.csdn-common-logo-advert',
    '.csdn-bottom-strip-ad', '.meau_ad', '.comment-box + div',
    '.fourth_column', '#tool-bar-box', '#asideProfile', '#asideFooter',
    '#dmp_ad_58', '.leftPop', '.rightPop', '.login-box-slide',
    '.recommend-right', '.operate-box', '#treeSkill', '.csdn-tracking-statistics',
    '.csdn-recommend', '.recommend-ad-box', '.mask-content', '.ad-box',
    '.ad-article-right', '.blog-content-box > div[style*="position:fixed"]',
    '.side-ad', '#sidebar_ad', '.sidebar-ad', '.right-ad', '.aside_ad',
    '.sidebar-recommend', '.aside-ad-wrap'
  ];

  knownAdSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  // 删除广告图片的父容器
  document.querySelectorAll('img[src*="ad_pic"], img[src*="operation.csdnimg.cn"]').forEach(img => {
    const container = img.closest('div');
    if (container) container.remove();
  });

  // 删除 iframe 和链接广告
  document.querySelectorAll('iframe[src*="ad"], a[href*="ad"]').forEach(el => {
    const container = el.closest('div');
    if (container) container.remove();
  });

  // 解锁文章
  const article = document.querySelector('.article_content');
  if (article) {
    article.style.height = 'auto';
    article.style.maxHeight = 'none';
    article.style.overflow = 'auto';
  }

  // 删除遮罩和弹窗
  ['.hide-article-box', '.bottom_pop', '#bottomPop'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });
}

// 注入 CSS 强制隐藏（防止删掉后又出现）
const style = document.createElement('style');
style.innerHTML = `
.picture-ad, .picture-ad * {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  pointer-events: none !important;
}
`;
document.head.appendChild(style);

// 首次运行
removeAllAds();
fixLayoutAfterAdRemoval();

// 观察 DOM 动态变化
const observer = new MutationObserver(() => {
  removeAllAds();
  fixLayoutAfterAdRemoval();

  // 防御性：重复注入强制隐藏样式
  if (!document.head.querySelector('style[data-csdn-ad-block]')) {
    const style = document.createElement('style');
    style.setAttribute('data-csdn-ad-block', 'true');
    style.innerHTML = `
      .picture-ad, .picture-ad * {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
  }
});
observer.observe(document.body, { childList: true, subtree: true });

function fixLayoutAfterAdRemoval() {
  // 移除底部可能的 margin / padding 占位符
  const body = document.body;
  body.style.paddingBottom = '0px';
  body.style.marginBottom = '0px';

  // 恢复文章区域底部裁剪
  const article = document.querySelector('.article_content, .blog-content-box');
  if (article) {
    article.style.paddingBottom = '20px';
    article.style.marginBottom = '0';
    article.style.overflow = 'auto';
    article.style.maxHeight = 'none';
  }

  // 如果有 main 容器，确保它也没被限制高度
  const main = document.querySelector('main');
  if (main) {
    main.style.maxHeight = 'none';
    main.style.overflow = 'auto';
  }

  // 清理可能的固定元素占位
  document.querySelectorAll('*').forEach(el => {
    const style = getComputedStyle(el);
    if (style.position === 'fixed' && parseInt(style.bottom) === 0 && el.offsetHeight < 200) {
      el.remove(); // 可疑底部广告
    }
  });
}
