<template>
    <div class="search-container">
        <div class="block">
            <span class="demonstration">请选择城市</span>
            <el-cascader
              v-model="city"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
            <el-input v-model="input" placeholder="请输入地点" prefix-icon="el-icon-search" clearable>
              <el-button icon="el-icon-search"  type="small" slot="append" @click="search()"></el-button>
            </el-input>
            
        </div>
        <div class="search-main-container">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <el-card shadow="always" class="landscape">
                <div slot="header" class="clearfix" >
                  <i class="el-icon-camera"></i>
                  <span>旅游资讯</span>
                </div>
                <div class="recommend">
                  <div  v-for="item in travelNews">
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
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-card shadow="always" class="infor">
                <div slot="header" class="clearfix">
                  <span>{{input}}</span>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="门票信息" name="first" style="overflow:hidden; overflow-y:scroll; height:calc(0.7*(100vh - 214px))">
                    <div class="ticket" v-for="item in ticket">
                      <div class="ticket-left">
                        <div style="font-size:medium; margin-bottom: 5px;">{{item.tname}}</div>
                        <div style="font-size:small; color:#666;margin-bottom: 5px;">{{item.beginDate}} -- {{item.endDate}}</div>
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
                  <el-tab-pane label="景点信息" name="second">
                    <div class="name">
                      {{information.name}}
                    </div>
                    <div class="location">
                      <span>{{information.address}}</span><br/>
                      <span>{{information.proName}} {{information.cityName}} {{information.areaName}}</span>
                    </div>
                    <div class="content">
                      <span>景点介绍：</span>
                      <span>{{information.content}}</span>
                      <span>开放时间：</span>
                      <span>{{information.opentime}}</span>
                      <span>注意：</span>
                      <span>{{information.attention}}</span>
                    </div>
                  </el-tab-pane>
                </el-tabs> 
              </el-card>
            </el-col>        
          </el-row>
        </div>
        
        
    </div>

  </template>
  
  <script>
    import axios from 'axios'
    import Site from '@/components/site.vue'
    import { getCitylist } from '../../api/citylist'
    import {getRecommend}from '../../api/data'
    import {getNews} from '../../api/news'
    export default {
      name: 'Search',
      components: {
        Site,
      },
      data() {
        return {
          tickets:[],
          activeName:'first',
          input:'',
          city: [],
          options: [],
          recommendation:[],
          travelNews:[],
          information:[]
          }
      },
      created() {
        getCitylist().then((r)=>{
        if(r.code===1){
          var tmp=[];
          var name,code;
          var cnt=0;
          for(var i=0;i<r.data.length;i++){
            for(var j=0;j<r.data[i].pchilds.length;j++){
              name=r.data[i].pchilds[j].name;
              code=r.data[i].pchilds[j].code;
              tmp.push({value:name,label:name});
            }
            name=r.data[i].name;
            code=r.data[i].code;
            this.options.push({value:name,label:name});
            this.options[cnt].children=tmp;
            cnt++;
            tmp=[];
          }
        }
      }).catch((err) => {
          console.log(err);
        });
      },
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
        },
        recommend(){
          getRecommend(this.city,10,this.input).then((r)=>{
            if(r.code===200){
              var rname,addr,summary,picture;
              for(var i=0;i<r.data.count;i++){
                rname=r.data.contentlist[i].name;
                addr=r.data.contentlist[i].address;
                summary=r.data.contentlist[i].summary;
                if(r.data.contentlist[i].picList.length===0){
                  picture=''
                }
                else{
                  picture=r.data.contentlist[i].picList[0].picUrl;
                }
                this.recommendation.push({name:rname,location:addr,comment:summary,pic:picture})
              }
              this.information.name=r.data.contentlist[0].name;
              this.information.address=r.data.contentlist[0].address;
              this.information.areaName=r.data.contentlist[0].areaName;
              this.information.cityName=r.data.contentlist[0].cityName;
              this.information.proName=r.data.contentlist[0].proName;
              this.information.content=r.data.contentlist[0].content;
              this.information.opentime=r.data.contentlist[0].opentime;
              this.information.attention=r.data.contentlist[0].attention;
              var ticket=r.data.contentlist[0].pricelist;
              var origin,discount,begin,end,name;
              for(var i=0;i<ticket.length;i++){
                name=ticket[i].TicketName;
                origin=ticket[i].Amount;
                discount=ticket[i].AmountAdvice;
                begin=ticket[i].BeginDate;
                end=ticket[i].EndDate;
                this.tickets.push({tname:name,originalPrice:origin,discountPrice:discount,beginDate:begin,endDate:end})
              }
            }
          }).catch((err) => {
          console.log(err);
          });
        },
        news(data){
          getNews(10,data).then((r)=>{
            if(r.code===200){
              console.log(r.result.allnum)
              var title,description,time,picture;
              for(var i=0;i<r.result.allnum;i++){
                title=r.result.newslist[i].title;
                description=r.result.newslist[i].description;
                time=r.result.newslist[i].ctime;
                picture=r.result.newslist[i].picUrl;
                this.travelNews.push({name:title,comment:description,location:time})
              }
            }
          }).catch((err) => {
          console.log(err);
          });
        },
        search(){
          var data=''
          if(this.city[1]==="市辖区")
          {
            data=this.city[0];
            data=data.substring(0,data.lastIndexOf("市"))
          }
          else{
            data=this.city[1];
            data=data.substring(0,data.lastIndexOf("市"))
          }
          this.news(data);
          //this.recommend()
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
  