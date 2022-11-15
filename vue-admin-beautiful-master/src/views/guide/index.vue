<template>
    <div class="guide-container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="block">
                    <span class="demonstration">请选择目的地所在城市</span>
                    <el-cascader
                      v-model="value"
                      :options="options"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"></el-cascader>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-card shadow="always">
                    <div slot="header">
                        <span>发现好去处</span>
                    </div>
                    <vab-chart
                      :autoresize="true"
                      theme="vab-echarts-theme"
                      :options="cy"
                      @zr:click="handleZrClick"
                      @click="handleClick"
                      >
                    </vab-chart>
                    <div class="bottom">
                        <span>...</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-card shadow="always">
                    <div slot="header">
                        <span>客流量</span>
                    </div>
                    <vab-chart
                      :autoresize="true"
                      theme="vab-echarts-theme"
                      :options="flow"
                      >
                    </vab-chart>
                    <div class="bottom">
                        <span>...</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card shadow="always">
                    <div slot="header">
                        <span> 攻略</span>
                    </div>
                    <div class="choice-button">
                        <el-button @click="choice=0">全部</el-button>
                        <el-button @click="choice=1">美食</el-button>
                    </div>
                    <div class="card-body">   
                        <el-row  :gutter="10">
                            <el-col :span="8" v-for="item in list" :offset="index > 0 ? 2 : 0">
                                <guidence
                                  :image="item.picture"
                                  :title="item.title"
                                  :publishtime="item.time"
                                  :comments="item.comments">
                            </guidence>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import VabChart from '@/plugins/echarts'
import guidence from '@/components/guidence'
export default{
    components:{
        VabChart,
        guidence
    },
    data(){
        return {
            choice:0,
            value:[],
            options: [{
          value: 'destination',
          label: '江苏',
          children: [{
            value: 'shejiyuanze',
            label: '南京',
          }, {
            value: 'daohang',
            label: '苏州',
          },{
            value: 'daohang',
            label: '无锡',
          },{
            value: 'daohang',
            label: '常州',
          },{
            value: 'daohang',
            label: '徐州',
          },{
            value: 'daohang',
            label: '南通',
          }]
        }, {
          value: 'zujian',
          label: '河北',
          children: [{
            value: 'basic',
            label: '石家庄',
          }, {
            value: 'form',
            label: '保定',
          }, {
            value: 'data',
            label: '张家口',
          }, {
            value: 'notice',
            label: '秦皇岛',
          }, {
            value: 'navigation',
            label: '邯郸',
          }]
        }, {
          value: 'ziyuan',
          label: '浙江',
          children: [{
            value: 'axure',
            label: '杭州'
          }, {
            value: 'sketch',
            label: '宁波'
          }, {
            value: 'jiaohu',
            label: '温州'
          }]
        }],
            cityname:'上海',
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
              gridSize: 20,
              sizeRange: [10, 30],
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
              data: [
                {
                  name: '上海欢乐谷',
                  value: 1500,
                },
                {
                  name: '上海海洋水族馆',
                  value: 1081,
                },

                {
                  name: '上海动物园',
                  value: 650,
                },
                {
                  name: '田子坊',
                  value: 600,
                },
                {
                  name: '豫园',
                  value: 450,
                },
                {
                  name: '上海自然博物馆',
                  value: 300,
                },
                {
                  name: '武康路',
                  value: 300,
                },
                {
                  name: '佘山国家森林公园',
                  value: 500,
                },
                {
                  name: '顾村公园',
                  value: 300,
                },
                {
                  name: '七宝老街',
                  value: 200,
                },
                {
                  name: '上海杜莎夫人蜡像馆',
                  value: 180,
                },
                {
                  name: '南京路步行街',
                  value: 170,
                },
                {
                  name: '静安寺',
                  value: 160,
                },
                {
                  name: '浦东美术馆',
                  value: 1500,
                },
                {
                  name: '外滩',
                  value: 1200,
                },
                {
                  name: '上海迪士尼度假区',
                  value: 1100,
                },
                {
                  name: '国家会展中心',
                  value: 900,
                },
                {
                  name: '上海海昌海洋公园',
                  value: 800,
                },
                {
                  name: '上海城隍庙',
                  value: 700,
                },
                {
                  name: '思南公馆',
                  value: 800,
                },
                {
                  name: '愚园路',
                  value: 900,
                },
                {
                  name: '静安别墅',
                  value: 920,
                },
              ],
            },
          ],
            },
            list:[
                {
                    comments:10,
                    picture:require('@/assets/comparison/left.jpg'),
                    title:'上海旅游适用攻略',
                    time:'2022/11/14 14:07'
                },
                {
                    comments:18,
                    picture:require('@/assets/comparison/left.jpg'),
                    title:'上海必走的8条徒步路线',
                    time:'2022/11/14 13:45'
                },
                {
                    comments:130,
                    picture:require('@/assets/comparison/left.jpg'),
                    title:'上海踏秋|复兴岛公园',
                    time:'2022/11/13 12:09'
                },
                {
                    comments:79,
                    picture:require('@/assets/comparison/left.jpg'),
                    title:'上海秋日brunch',
                    time:'2022/11/13 09:36'
                }
            ],
            flow: {
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
              name: '客流量',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 20, 33, 39, 33, 22],
            },
          ],
        },

        }
    },
    methods:{
        handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
    }
}
</script>

<style lang="scss" scoped>
.guide-container{
    background: #f5f7f8 ;
    .block{
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 10px;
        .demonstration{
            margin:5px;
        }
    }
    .el-card__body {
        .echarts {
          width: 100%;
          height: 200px;
        }
      }
      .choice-button{
        margin-bottom: 5px;
      }
      .card-body{
        display: flex;
        flex-direction: row;
      }
      .guide{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        margin-bottom: 3px;
        .article-title{
            font-size: small;
            color: black;
        }
        .time{
            font-size: smaller;
            color: #666;
            margin-top: 1px;
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