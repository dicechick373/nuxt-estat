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
            <v-switch
              v-model="switch1"
              :label="`Switch 1: ${switch1.toString()}`"
            ></v-switch>

            <v-spacer />
            <!-- ラジオボタン -->
            <v-radio-group v-model="series" row>
              <v-radio label="Column" value="column"></v-radio>
              <v-radio label="Line" value="line"></v-radio>
              <v-radio label="Area" value="area"></v-radio>
            </v-radio-group>
          </v-row>
          <!-- グラフ -->
          <!-- <HighchartsColumnChart :display-data="displayData" /> -->

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
      resasResponse: null,
      series: 'all',
      switch1: true,
      unit: '人'
    }
  },
  async fetch() {
    const params = this.estatParams
    const { data } = await this.$estat.get(null, { params })
    console.log(data)
    this.resasResponse = data.GET_STATS_DATA
  },
  props: {
    selectedPref: {
      type: Object,
      required: true
    }
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
        // appId: '724e5b90772a3e9289f41a253e4e7e32438f4fff',
        statsDataId: '0000010101',
        cdArea: ['28000'],
        cdCat01: ['A1101', 'A110101']
      }
    },
    title() {
      return `${this.prefName}の人口構成`
    },
    chartData() {
      return this.resasResponse.map(d => {
        return {
          name: d.label,
          data: d.data.map(d => {
            return {
              x: d.year,
              y: d.value,
              unit: this.unit
            }
          })
        }
      })
    },
    displayData() {
      if (this.series === 'all') {
        return this.chartData.filter(f => f.name === '総人口')
      } else {
        return this.chartData.filter(f => f.name !== '総人口')
      }
    }
  },
  created() {}
}
</script>
