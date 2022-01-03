<template>
  <div>
    <!-- タブ -->
    <v-tabs hide-slider>
      <v-tab v-for="(item, i) in tabs" :key="i" :to="item.link">
        {{ item.label }}
      </v-tab>
    </v-tabs>

    <!-- 選択した都道府県のコンポーネント読込 -->
    <v-row>
      <component :is="component" />
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      component: 'PopulationPrefRank'
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '都道府県の統計',
          link: `/population/prefecture/`
        },
        {
          label: '市区町村の統計',
          link: `/population/city/`
        },
        {
          label: '都道府県ランキング',
          link: `/population/prefectureRank/`
        },
        {
          label: '市区町村ランキング',
          link: `/population/cityRank/`
        }
      ]
    }
  }
}
</script>
