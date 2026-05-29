import type { UIStrings } from "../types";

export default {
  nav: {
    home: "ホーム",
    posts: "記事",
    tags: "タグ",
    about: "概要",
    archives: "アーカイブ",
    search: "検索",
  },
  post: {
    publishedAt: "公開日",
    updatedAt: "更新日",
    sharePostIntro: "この記事を共有：",
    sharePostOn: "{{platform}}で共有",
    sharePostViaEmail: "メールで共有",
    tagLabel: "タグ",
    backToTop: "トップに戻る",
    goBack: "戻る",
    editPage: "ページを編集",
    previousPost: "前の記事",
    nextPost: "次の記事",
  },
  pagination: {
    prev: "前へ",
    next: "次へ",
    page: "ページ",
  },
  home: {
    socialLinks: "ソーシャルリンク",
    featured: "注目",
    recentPosts: "最新の記事",
    allPosts: "全記事",
  },
  footer: {
    copyright: "著作権",
    allRightsReserved: "全著作権所有。",
  },
  pages: {
    tagTitle: "タグ",
    tagDesc: "このタグの全記事",

    tagsTitle: "タグ",
    tagsDesc: "記事で使用されている全タグ。",

    postsTitle: "記事",
    postsDesc: "公開した全記事。",

    archivesTitle: "アーカイブ",
    archivesDesc: "アーカイブした全記事。",

    searchTitle: "検索",
    searchDesc: "記事を検索...",
  },
  a11y: {
    skipToContent: "コンテンツへスキップ",
    openMenu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    toggleTheme: "テーマ切替",
    searchPlaceholder: "記事を検索...",
    noResults: "結果なし",
    goToPreviousPage: "前のページへ",
    goToNextPage: "次のページへ",
  },
  notFound: {
    title: "404 未找到",
    message: "ページが見つかりません",
    goHome: "ホームに戻る",
  },
} satisfies UIStrings;
