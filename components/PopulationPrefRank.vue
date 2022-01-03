<template>
  <v-col cols="4" sm="8" md="6">
    <v-card :loading="$fetchState.pending">
      <p v-if="$fetchState.pending" />
      <div v-else>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>

          <!-- <component :is="chartComponent" :display-data="displayData" /> -->

          <hr class="my-3" />
          <p>地域経済分析システムRESASのAPIを利用して</p>
        </v-card-text>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      estatResponse: null,
      selectedSeries: 'all',
      selectedChartType: 'column',
      unit: '人'
    }
  },
  async fetch() {
    const params = this.estatParams
    // console.log(params)
    const { data } = await this.$estat.get(null, { params })
    this.estatResponse = data
  },
  computed: {
    ...mapGetters('prefList', ['getPrefList']),
    prefList() {
      return this.getPrefList
    },
    estatParams() {
      return {
        statsDataId: '0000010101',
        cdArea: this.prefList.map(
          d => ('0000000000' + d.prefCode).slice(-2) + '000'
        ),
        cdCat01: ['A1101', 'A110101', 'A110102']
      }
    },
    series() {
      return {
        id: 'cat01',
        item: [
          {
            code: 'A1101',
            name: '総数'
          },
          {
            code: 'A110101',
            name: '男性'
          },
          {
            code: 'A110102',
            name: '女性'
          }
        ]
      }
    },
    title() {
      return `${this.prefName}の人口構成`
    },
    chartData() {
      console.log(this.estatResponse)
      const series = this.series
      const value = this.estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF
        .VALUE
      return series.item.map(d => {
        return {
          name: d.name,
          data: value
            .filter(f => f[`@${series.id}`] === d.code)
            .map(d => {
              return {
                x: parseInt(d['@time'].substr(0, 4)),
                y: parseFloat(d.$),
                unit: d['@unit']
              }
            })
        }
      })
    },
    displayData() {
      if (this.selectedSeries === 'all') {
        return this.chartData.filter(f => f.name === '総数')
      } else {
        return this.chartData.filter(f => f.name !== '総数')
      }
    },
    chartComponent() {
      return 'HighchartsMapChartPref'
    //   let chartComponent
    //   switch (this.selectedChartType) {
    //     case 'line':
    //       chartComponent = 'HighchartsLineChart'
    //       break
    //     case 'column':
    //       chartComponent = 'HighchartsColumnChart'
    //       break
    //   }
    //   return chartComponent
    }
  }
}
</script>
