<template>
  <v-col cols="4" sm="8" md="6">
    <v-card :loading="$fetchState.pending">
      <p v-if="$fetchState.pending" />
      <div v-else>
        <!-- タイトル -->
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <!-- ラジオボタン -->
            <v-radio-group v-model="selectedSeries" row>
              <v-radio label="総数" value="all"></v-radio>
              <v-radio label="内訳" value="break"></v-radio>
            </v-radio-group>

            <v-spacer />
            <!-- ラジオボタン -->
            <v-radio-group v-model="selectedChartType" row>
              <v-radio label="Column" value="column"></v-radio>
              <v-radio label="Line" value="line"></v-radio>
              <!-- <v-radio label="Area" value="area"></v-radio> -->
            </v-radio-group>
          </v-row>
          <!-- グラフ -->
          <!-- <HighchartsColumnChart :display-data="displayData" /> -->

          <component :is="chartComponent" :display-data="displayData" />
          <!-- 注釈 -->
          <hr class="my-3" />
          <p>地域経済分析システムRESASのAPIを利用して</p>
        </v-card-text>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      estatResponse: null,
      selectedSeries: 'all',
      selectedChartType: 'column',
      unit: '人',
    }
  },
  async fetch() {
    const params = this.estatParams
    const { data } = await this.$estat.get(null, { params })
    console.log(data)
    this.estatResponse = data
  },
  props: {
    selectedPref: {
      type: Object,
      required: true,
    },
  },
  computed: {
    prefCode() {
      return this.selectedPref.prefCode
    },
    prefName() {
      return this.selectedPref.prefName
    },
    estatParams() {
      return {
        statsDataId: '0000010101',
        cdArea: ['28000'],
        cdCat01: ['A1101', 'A110101', 'A110102'],
      }
    },
    series() {
      return {
        id: 'cat01',
        item: [
          {
            code: 'A1101',
            name: '総数',
          },
          {
            code: 'A110101',
            name: '男性',
          },
          {
            code: 'A110102',
            name: '女性',
          },
        ],
      }
    },
    title() {
      return `${this.prefName}の人口構成`
    },
    chartData() {
      const series = this.series
      const value =
        this.estatResponse.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
      return series.item.map((d) => {
        return {
          name: d.name,
          data: value
            .filter((f) => f[`@${series.id}`] === d.code)
            .map((d) => {
              return {
                x: parseInt(d['@time'].substr(0, 4)),
                y: parseFloat(d.$),
                unit: d['@unit'],
              }
            }),
        }
      })
    },
    displayData() {
      if (this.selectedSeries === 'all') {
        return this.chartData.filter((f) => f.name === '総数')
      } else {
        return this.chartData.filter((f) => f.name !== '総数')
      }
    },
    chartComponent() {
      switch (this.selectedChartType) {
        case 'column':
          return 'HighchartsColumnChart'
          break
        case 'line':
          return 'HighchartsColumnChart'
          break
      }
    },
  },
}
</script>
