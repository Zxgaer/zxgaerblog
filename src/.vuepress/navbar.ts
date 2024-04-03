import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "所有文章",
    icon: "blog",
    link: "/article/",
  },
  {
    text: "时间轴",
    icon: "time",
    link: "/timeline/",
  },
  {
    text: "关于",
    icon: "profile",
    link: "/intro/",
  },
  {
    text: "友情链接",
    icon: "link",
    link: "/friendship-link/",
  },
  {
    text: "联系方式",
    icon: "proxy",
    children: [
      { text: 'Github', link: 'https://github.com/Zxgaer' },
      { text: 'Gitee', link: 'https://gitee.com/zxgear' },
      { text: 'Bilibili', link: 'https://space.bilibili.com/651930576' },
      { text: 'X/Twitter', link: 'https://twitter.com/zxgaer16971' },
      { text: 'Discord：Reagxz', link: 'https://discord.com' },
      { text: '@zxgaer:matrix.org', link: 'https://matrix.org' },
      { text: 'Telegram', link: 'https://t.me/zxgaer16971' }
  ]
  },
]);
