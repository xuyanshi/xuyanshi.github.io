/**
 * Client-side i18n: swaps text content based on data-i18n attributes.
 * Translations are inlined to avoid chunk-loading issues with View Transitions.
 */

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.posts": "Posts",
    "nav.tags": "Tags",
    "nav.about": "About",
    "nav.archives": "Archives",
    "nav.search": "Search",
    "post.publishedAt": "Published at",
    "post.updatedAt": "Updated",
    "post.sharePostIntro": "Share this post:",
    "post.editPage": "Edit page",
    "post.goBack": "Go back",
    "post.backToTop": "Back to top",
    "post.previousPost": "Previous Post",
    "post.nextPost": "Next Post",
    "pagination.prev": "Prev",
    "pagination.next": "Next",
    "home.socialLinks": "Social Links",
    "home.featured": "Featured",
    "home.recentPosts": "Recent Posts",
    "home.allPosts": "All Posts",
    "footer.copyright": "Copyright",
    "footer.allRightsReserved": "All rights reserved.",
  },
  zh: {
    "nav.posts": "文章",
    "nav.tags": "标签",
    "nav.about": "关于",
    "nav.archives": "归档",
    "nav.search": "搜索",
    "post.publishedAt": "发布于",
    "post.updatedAt": "更新于",
    "post.sharePostIntro": "分享这篇文章：",
    "post.editPage": "编辑页面",
    "post.goBack": "返回",
    "post.backToTop": "回到顶部",
    "post.previousPost": "上一篇",
    "post.nextPost": "下一篇",
    "pagination.prev": "上一页",
    "pagination.next": "下一页",
    "home.socialLinks": "社交链接",
    "home.featured": "精选",
    "home.recentPosts": "最新文章",
    "home.allPosts": "全部文章",
    "footer.copyright": "版权",
    "footer.allRightsReserved": "保留所有权利。",
  },
  ja: {
    "nav.posts": "記事",
    "nav.tags": "タグ",
    "nav.about": "概要",
    "nav.archives": "アーカイブ",
    "nav.search": "検索",
    "post.publishedAt": "公開日",
    "post.updatedAt": "更新日",
    "post.sharePostIntro": "この記事を共有：",
    "post.editPage": "ページを編集",
    "post.goBack": "戻る",
    "post.backToTop": "トップに戻る",
    "post.previousPost": "前の記事",
    "post.nextPost": "次の記事",
    "pagination.prev": "前へ",
    "pagination.next": "次へ",
    "home.socialLinks": "ソーシャルリンク",
    "home.featured": "注目",
    "home.recentPosts": "最新の記事",
    "home.allPosts": "全記事",
    "footer.copyright": "著作権",
    "footer.allRightsReserved": "全著作権所有。",
  },
};

export function applyTranslations() {
  const locale = localStorage.getItem("locale") || "en";
  const t = translations[locale] ?? translations["en"];

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key && t[key]) el.textContent = t[key];
  });

  const langBtn = document.querySelector<HTMLButtonElement>("#lang-btn");
  if (langBtn) {
    const labels: Record<string, string> = { en: "Eng", zh: "中", ja: "日" };
    langBtn.dataset.lang = locale;
    const labelEl = langBtn.querySelector("[data-i18n-label]");
    if (labelEl) labelEl.textContent = labels[locale] ?? locale.toUpperCase();
  }
}

applyTranslations();
document.addEventListener("astro:after-swap", applyTranslations);
