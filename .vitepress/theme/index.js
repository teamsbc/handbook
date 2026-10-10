import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ExperimentalNotice from './ExperimentalNotice.vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-top': () => h(ExperimentalNotice)
  })
}
