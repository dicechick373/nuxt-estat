<template>
  <div class="graph">
    <highcharts :options="chartOptions" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  props: {
    displayData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        '#058DC7',
        '#7dbae5',
        '#ff69b4',
        '#DDDF00',
        '#24CBE5',
        '#64E572',
        '#FF9655',
        '#FFF263',
        '#6AF9C4',
      ],
    }
  },
  computed: {
    yAxisData() {
      return [{ opposite: false }]
    },
    colorList() {
      const colors = cloneDeep(this.colors)
      const i = this.displayData.length
      // console.log(i)
      if (i === 1) {
        return colors.slice(0, 1)
      } else {
        return colors.slice(1, colors.length - 1)
      }
    },
    series() {
      const series = cloneDeep(this.displayData)
      return series.reduce((acc, cur, i) => {
        cur['color'] = this.colorList[i]
        acc.push(cur)
        return acc
      }, [])
    },
    chartOptions() {
      return {
        chart: {
          height: 280,
          zoomType: 'xy',
          type: 'column',
        },
        title: {
          text: null,
        },
        xAxis: {
          min: 1990,
          max: 2020,
          scrollbar: {
            enabled: true,
          },
          crosshair: true,
        },
        yAxis: this.yAxisData.map((item) => ({
          max: item.max,
          min: item.min,
          opposite: item.opposite,
          title: {
            text: '',
          },
          labels: {
            formatter() {
              return this.value.toLocaleString()
            },
          },
        })),
        plotOptions: {
          series: {
            pointWidth: 12,
            animation: false,
            label: {
              connectorAllowed: false,
            },
          },
          column: {
            stacking: 'normal',
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}{point.unit}</b> ({point.percentage:.0f}%)<br/>',
          shared: true,
        },
        credits: {
          enabled: false,
        },
        series: this.series,
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.graph
  margin-top: 10px
  height: 100%
</style>
