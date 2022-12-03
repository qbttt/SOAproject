<template>
    <div class="search-container">
        <div class="block">
            <span class="demonstration">请选择城市</span>
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
            <el-input v-model="input" placeholder="请输入地点" prefix-icon="el-icon-search" clearable>
              <el-button icon="el-icon-search"  type="small" slot="append"></el-button>
            </el-input>
            
        </div>
        <div class="search-main-container">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-card shadow="always" class="map-card" :body-style="{padding:'0px'}">
                <div class="map-container">
                  <div id="map" class="container"></div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-card shadow="always" class="landscape">
                <div slot="header" class="clearfix" >
                  <i class="el-icon-camera"></i>
                  <span>发现好去处</span>
                </div>
                <div class="recommend">
                  <div  v-for="item in recommendation">
                  <Site 
                    :title="item.name"
                    :image="item.pic"
                    :comment="item.comment"
                    :location="item.location"
                    />
                </div>
                </div>
                
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-card shadow="always" class="landscape">
                <div slot="header" class="clearfix" >
                  <i class="el-icon-camera"></i>
                  <span> 旅游资讯</span>
                </div>
                <div class="recommend">
                  <div  v-for="item in recommendation">
                  <Site 
                    :title="item.name"
                    :image="item.pic"
                    :comment="item.comment"
                    :location="item.location"
                    />
                </div>
                </div>
                
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-card shadow="always" class="landscape">
                <div slot="header" class="clearfix" >
                  <i class="el-icon-camera"></i>
                  <span>景点介绍</span>
                </div>
                <div class="recommend">
                  <div  v-for="item in recommendation">
                  <Site 
                    :title="item.name"
                    :image="item.pic"
                    :comment="item.comment"
                    :location="item.location"
                    />
                </div>
                </div>
                
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-card shadow="always" class="info">
                <div slot="header" class="clearfix">
                  <span>{{input}}</span>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="门票信息" name="first" style="overflow:hidden; overflow-y:scroll; height:calc(0.7*(100vh - 214px))">
                    <div class="ticket" v-for="item in ticket">
                      <div class="ticket-left">
                        <div style="font-size:medium; margin-bottom: 5px;">{{item.tname}}</div>
                        <div style="font-size:small; color:#666;margin-bottom: 5px;">{{item.availableDate}} | 已售:{{item.sold}}</div>
                        <div>{{item.message}}</div>
                      </div>
                      <div class="ticket-right">
                        <div style="display:flex; flex-direction: row; align-items:center">
                          <div style="text-decoration:line-through; color:#666; font-size: small; margin-right: 2px;">￥{{item.originalPrice}}</div>
                          <div style="color:orange;font-size:medium;margin-right: 2px;">￥{{item.discountPrice}}</div>
                          <div style="color:#666; font-size: small;">起</div>
                        </div>
                        <el-button >预定</el-button>

                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="评价问答" name="second">
                    <div>
                      <div>
                        
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="搜索周边" name="third">搜索周边</el-tab-pane>
                </el-tabs>
                
                </el-card>
            </el-col>
          </el-row>
            
            
            
        </div>
        
        
    </div>

  </template>
  
  <script>
    import axios from 'axios'
    import * as mapv from 'mapv'
    import Site from '@/components/site.vue'
    export default {
      name: 'Map',
      components: {
        Site,
      },
      data() {
        return {
          ticket:[
            {
              tname:'儿童票',
              availableDate:'可订今日',
              sold:'90000',
              message:'21:30前可订',
              originalPrice:'138',
              discountPrice:'48'
            },
            {
              tname:'学生票',
              availableDate:'可订今日',
              sold:'100000',
              message:'21:30前可订',
              originalPrice:'168',
              discountPrice:'68'
            },
            {
              tname:'学生票',
              availableDate:'可订今日',
              sold:'100000',
              message:'21:30前可订',
              originalPrice:'168',
              discountPrice:'68'
            },
            {
              tname:'学生票',
              availableDate:'可订今日',
              sold:'100000',
              message:'21:30前可订',
              originalPrice:'168',
              discountPrice:'68'
            }
          ],
          activeName:'first',
          input:'',
          value: [],
          options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
          }],
          recommendation:[
            {
              name:'上海迪士尼',
              location:'浦东新区',
              comment:'最最快乐的地方',
              pic:require('@/assets/comparison/right.jpg')
            },
            {
              name:'上海欢乐谷',
              location:'佘山',
              comment:'主题乐园',
              pic:require('@/assets/comparison/right.jpg')
            },
            {
              name:'南翔古镇',
              location:'南翔',
              comment:'上海市四大历史名镇之一',
              pic:require('@/assets/comparison/right.jpg')
            },
            {
              name:'武康路历史文化名街',
              location:'复兴西路/丁香花园',
              comment:'超有名的洋房建筑风格',
              pic:require('@/assets/comparison/right.jpg')
            }
          ]
      }
      },
      created() {},
      mounted() {
        this.$nextTick(() => {
            
          const map = this.$baseMap()
          axios
            .get(
              'https://cdn.jsdelivr.net/npm/mapv@2.0.12/examples/data/od-xierqi.txt'
            )
            .then((rs) => {
              let data = []
              let timeData = []
  
              rs = rs.data.split('\n')
              let maxLength = 0
              for (let i = 0; i < rs.length; i++) {
                let item = rs[i].split(',')
                let coordinates = []
                if (item.length > maxLength) {
                  maxLength = item.length
                }
                for (let j = 0; j < item.length; j += 2) {
                  let x = (Number(item[j]) / 20037508.34) * 180
                  let y = (Number(item[j + 1]) / 20037508.34) * 180
                  y =
                    (180 / Math.PI) *
                    (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2)
                  if (x == 0 || y == NaN) {
                    continue
                  }
                  coordinates.push([x, y])
                  timeData.push({
                    geometry: {
                      type: 'Point',
                      coordinates: [x, y],
                    },
                    count: 1,
                    time: j,
                  })
                }
                data.push({
                  geometry: {
                    type: 'LineString',
                    coordinates: coordinates,
                  },
                })
              }
  
              let dataSet = new mapv.DataSet(data)
  
              let options = {
                strokeStyle: 'rgba(53,57,255,0.5)',
                // globalCompositeOperation: 'lighter',
                shadowColor: 'rgba(53,57,255,0.2)',
                shadowBlur: 3,
                lineWidth: 3.0,
                draw: 'simple',
              }
  
              let mapvLayer = new mapv.MaptalksLayer(
                'mapv1',
                dataSet,
                options
              ).addTo(map)
  
              let dataSet2 = new mapv.DataSet(timeData)
  
              let options2 = {
                fillStyle: 'rgba(255, 250, 250, 0.2)',
                globalCompositeOperation: 'lighter',
                size: 1.5,
                animation: {
                  stepsRange: {
                    start: 0,
                    end: 100,
                  },
                  trails: 3,
                  duration: 5,
                },
                draw: 'simple',
              }
  
              let mapvLayer2 = new mapv.MaptalksLayer(
                'mapv2',
                dataSet2,
                options2
              ).addTo(map)
            })
        })
      },
      methods: {
        handleChange(value) {
        console.log(value);
        },
        handleClick(tab,event){
          console.log(tab,event)
        }
        
      },
      
    }
  </script>
  <style lang="scss" scoped>
  .search-container{
    .block{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        .demonstration{
            margin:5px;
        }
    }
    .search-main-container{
        .map-card{
        width:100%;
          .map-container {
            .container {
              width: 100%;
              height: calc(100vh - 214px);
            }  
           }
        }

    .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .landscape {
    width: 100%;
    height: calc(100vh - 214px);
    .recommend{
      height: calc(0.8*(100vh - 214px));
      overflow: hidden;
      overflow-y: scroll;
    }
    
  }
  
  .info{
    width: 100%;
    height: calc(100vh - 214px);
  }
  .ticket{
    display:flex;
    justify-content: space-between;
    margin: 5px;
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 1px 1px 1px 1px #999;
    .ticket-left{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    .ticket-right{
      display: flex;
      flex-direction: column;
      justify-content: left;
    }
  }

  }
    
    
  }
  </style>
  