<template>
  <div class="index-container">
    <el-row :gutter="20">
      
      
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>用户画像</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="cy"
            @zr:click="handleZrClick"
            @click="handleClick"
          />
          <div class="bottom">
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>GDP分布图</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="zgdt"
          />
        </el-card>
      </el-col>
      
      
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts'
  import { dependencies, devDependencies } from '../../../package.json'
  import { getLikes } from '../../api/data'
  export default {
    name: 'Index',
    components: {
      VabChart,
    },
    data() {
      return {
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        config1: {
          startVal: 0,
          endVal: this.$baseLodash.random(20000, 60000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config2: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config3: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },

        //访问量
        fwl: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '访问量',
              type: 'line',
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },
        //授权数
        sqs: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              /*boundaryGap: false,*/
              data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '授权数',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 20, 33, 39, 33, 22],
            },
          ],
        },
        //词云
        cy: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
          },
          series: [
            {
              type: 'wordCloud',
              gridSize: 15,
              sizeRange: [12, 40],
              rotationRange: [0, 0],
              width: '100%',
              height: '100%',
              textStyle: {
                normal: {
                  color() {
                    const arr = [
                      '#1890FF',
                      '#36CBCB',
                      '#4ECB73',
                      '#FBD437',
                      '#F2637B',
                      '#975FE5',
                    ]
                    let index = Math.floor(Math.random() * arr.length)
                    return arr[index]
                  },
                },
              },
              data: [ ],
            },
          ],
        },
        //中国地图
        zgdt: {
          title: {
            text: '2022年全国GDP分布',
            subtext: '',
          },
          tooltip: {
            trigger: 'item',
          },
          dataRange: {
            orient: 'horizontal',
            min: 0,
            max: 55000,
            text: ['高', '低'],
            splitNumber: 0,
          },
          series: [
            {
              name: '2022年全国GDP分布',
              type: 'map',
              roam: false,
              zoom: 1.25,
              mapType: 'china',
              mapLocation: {
                x: 'center',
              },
              selectedMode: 'multiple',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },
              data: [
                { name: '西藏', value: 605.83 },
                { name: '青海', value: 1670.44 },
                { name: '宁夏', value: 2102.21 },
                { name: '海南', value: 2522.66 },
                { name: '甘肃', value: 5020.37 },
                { name: '贵州', value: 5701.84 },
                { name: '新疆', value: 6610.05 },
                { name: '云南', value: 8893.12 },
                { name: '重庆', value: 10011.37 },
                { name: '吉林', value: 10568.83 },
                { name: '山西', value: 11237.55 },
                { name: '天津', value: 11307.28 },
                { name: '江西', value: 11702.82 },
                { name: '广西', value: 11720.87 },
                { name: '陕西', value: 12512.3 },
                { name: '黑龙江', value: 12582 },
                { name: '内蒙古', value: 14359.88 },
                { name: '安徽', value: 15300.65 },
                { name: '北京', value: 16251.93 },
                { name: '福建', value: 17560.18 },
                { name: '上海', value: 19195.69 },
                { name: '湖北', value: 19632.26 },
                { name: '湖南', value: 19669.56 },
                { name: '四川', value: 21026.68 },
                { name: '辽宁', value: 22226.7 },
                { name: '河北', value: 24515.76 },
                { name: '河南', value: 26931.03 },
                { name: '浙江', value: 32318.85 },
                { name: '山东', value: 45361.85, selected: true },
                { name: '江苏', value: 49110.27 },
                { name: '广东', value: 53210.28 },
              ],
            },
          ],
        },

       
       
      }
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {
      let base = +new Date(2020, 1, 1)
      let oneDay = 24 * 3600 * 1000
      let date = []

      let data = [Math.random() * 1500]
      let now = new Date(base)

      const addData = (shift) => {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        date.push(now)
        data.push(this.$baseLodash.random(20000, 60000))

        if (shift) {
          date.shift()
          data.shift()
        }

        now = new Date(+new Date(now) + oneDay)
      }

      for (let i = 1; i < 6; i++) {
        addData()
      }
      addData(true)
      this.fwl.xAxis[0].data = date
      this.fwl.series[0].data = data
      this.timer = setInterval(() => {
        addData(true)
        this.fwl.xAxis[0].data = date
        this.fwl.series[0].data = data
      }, 3000)
    },
    methods: {
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
      async fetchData() {
        const { data } = await getList()
        data.map((item, index) => {
          if (index === data.length - 1) {
            item.color = '#0bbd87'
          }
        })
        this.activities = data
        const res = await getNoticeList()
        this.noticeList = res.data
       
      },
      fetchLikes(){
        getLikes(this.$store.getters.username).then((r)=>{
          var word,v;
          for(var i=0;i<r.data.userlikelist.length;i++){
            word=r.data.userlikelist[i];
            v=800+200*i
            this.cy.series.data.push({value:v,name:word})
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }

      .el-card__body {
        .echarts {
          width: 100%;
          height: 125px;
        }
      }
    }

    .card {
      min-height: 400px;

      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 305px;
          }
        }
      }
    }

    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }

   


  }
</style>
