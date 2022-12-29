<template>
    <div class="guide-container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="block">
                    <span class="demonstration">请选择城市</span>
                    <el-cascader
                      v-model="city"
                      :options="options"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChange"></el-cascader>
                      <el-input v-model="input" placeholder="请输入地点" prefix-icon="el-icon-search" clearable>
                        <el-button icon="el-icon-search"  type="small" slot="append" @click=""></el-button>
                      </el-input>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card shadow="always">
                    <div slot="header">
                        <span>旅游新闻</span>
                    </div>
                    <div class="card-body">   
                        <el-row :gutter="10" >
                           
                                <el-col :span="8" v-for="item in list" :key="index" :offset="index > 0 ? 2 : 0">
                                <guidence
                                  :image="item.picture"
                                  :title="item.title"
                                  :publishtime="item.time"
                                  :link="item.link">
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
import { getCitylist } from '../../api/citylist'
import { getGuide } from '../../api/data'
export default{
    components:{
        VabChart,
        guidence
    },
    data(){
        return {
            input:'',
            choice:0,
            city:[],
            options: [],
            cityname:'上海',
            list:[]

        }
    },
    methods:{
        handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      fetchNews(){
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
        getGuide(data).then((r)=>{
          var name,url,img,date;
          name=r.data.contentlist[i].title;
          url=r.data.contentlist[i].link;
          img=r.data.contentlist[i].img;
          date=r.data.contentlist[i].pubDate;
          this.list.push({picture:img,title:name,time:date,link:url})
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    created(){
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