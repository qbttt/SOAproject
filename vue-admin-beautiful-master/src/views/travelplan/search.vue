<template>
    <div class="search-container">
        <div class="block">
            <span class="demonstration">请选择目的地所在城市</span>
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
        </div>
        <div class="search-main-container">
            <el-card shadow="always" class="map-card" :body-style="{padding:'0px'}">
            <div class="map-container">
                <div id="map" class="container"></div>
            </div>
            </el-card>
            <el-card shadow="always" class="landscape">
            <div slot="header" class="clearfix">
                <span>名胜古迹</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
            </el-card>
        </div>
        
        
    </div>

  </template>
  
  <script>
    import axios from 'axios'
    import * as mapv from 'mapv'
    export default {
      name: 'Map',
      components: {},
      data() {
        return {
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
        }]
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
      }
      },
      
    }
  </script>
  <style lang="scss" scoped>
  .search-container{
    .block{
        display: flex;
        justify-content: left;
        align-items: center;
        margin-bottom: 10px;
        .demonstration{
            margin:5px;
        }
    }
    .search-main-container{
        display: flex;
        justify-content: space-around;
        .map-card{
        width:45%;
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
    width: 45%;
  }
    }
    
    
  }
  </style>
  