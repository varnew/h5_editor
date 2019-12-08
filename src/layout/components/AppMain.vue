<template>
  <section class="app-main" :style="'height:' + (client.height - 84) + 'px'">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data: () => {
    return {
      client: {
        width: '',
        height: ''
      }
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  mounted() {
    this.getClient()
  },
  methods: {
    /**
     * @desc: 获取屏幕宽高
     */
    getClient() {
      this.client.width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
      this.client.height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow-y: auto;
  background: #2c3541;
  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
    background-color: #232a34;
  }
  &::-webkit-scrollbar:horizontal {
    /*border-radius: 0 0 .5rem .5rem*/
  }
  &::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #343f4d;
    box-shadow: inset 0 0 0 1px #343f4d;
    border: .25rem solid #232a34;
  }
  &::-webkit-scrollbar-thumb:hover{
    background-color: #465267
  }
}

.fixed-header+.app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
