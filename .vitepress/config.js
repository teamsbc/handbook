import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  title: 'TeamSBC Handbook',
  description: 'A guide to using, administering, and developing TeamSBC.',
  lang: 'en',
  srcDir: './src',
  base,
  // Keep the .html chapter URLs used by the mdBook site.
  cleanUrls: false,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}favicon.png` }],
    ['script', { async: '', src: 'https://scripts.simpleanalyticscdn.com/latest.js' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: 'https://teamsbc.org' },
      { text: 'Handbook', link: '/', activeMatch: '/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/teamsbc/handbook' }
    ],
    search: { provider: 'local' },
    sidebar: [
      { text: 'Handbook', link: '/' },
      {
        text: 'Preface',
        items: [
          { text: 'Intended Audience', link: '/preface/intended-audience' },
          { text: 'Community', link: '/preface/community' }
        ]
      },
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started/introduction' },
          { text: 'Variants', link: '/getting-started/variants' },
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Provisioning', link: '/getting-started/provisioning' }
        ]
      },
      {
        text: 'Maintenance',
        items: [
          {
            text: 'Lhotse',
            collapsed: false,
            items: [
              { text: 'Basics', link: '/maintenance/lhotse/basics' },
              { text: 'Updating', link: '/maintenance/lhotse/updating' },
              { text: 'Installing Applications', link: '/maintenance/lhotse/installing-applications' },
              { text: 'Users', link: '/maintenance/lhotse/users' },
              { text: 'Networking', link: '/maintenance/lhotse/networking' }
            ]
          },
          {
            text: 'Makalu',
            collapsed: false,
            items: [
              { text: 'Basics', link: '/maintenance/makalu/basics' },
              { text: 'Updating', link: '/maintenance/makalu/updating' },
              { text: 'Installing Applications', link: '/maintenance/makalu/installing-applications' },
              { text: 'Users', link: '/maintenance/makalu/users' },
              { text: 'Networking', link: '/maintenance/makalu/networking' }
            ]
          }
        ]
      },
      {
        text: 'Customization',
        items: [
          { text: 'Build Your Own', link: '/customization/build-your-own' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Packages', link: '/development/packages' },
          { text: 'Artifacts', link: '/development/artifacts' },
          { text: 'Infrastructure', link: '/development/infrastructure' },
          { text: 'Build System', link: '/development/build-system' },
          { text: 'Testing', link: '/development/testing' }
        ]
      }
    ]
  }
})
