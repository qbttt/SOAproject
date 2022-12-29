<template>
    <div class="travel-plan-container">
      <div class="block">
            <span class="demonstration">请选择城市</span>
            <el-cascader
              v-model="city"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
            <el-input v-model="district" placeholder="请输入区名" prefix-icon="el-icon-search" clearable>
              <el-button icon="el-icon-search"  type="small" slot="append" @click="fetchCombo()"></el-button>
            </el-input>
            <span class="demonstration">日期</span>
        </div>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in comboList"
          :key="index"
          :xs="24"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="6"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="combo-list-card-body">
              <div class="combo-list-tag-group">
              </div>
              <div class="combo-list-image-group">
                <img :src="item.image" class="combo-list-image" />
              </div>
              <div class="combo-list-title">
                <a :href="item.comboUrl"> {{ item.title }}</a>
              </div>
              <div class="combo-list-description">{{ item.description }}</div>
              <div class="combo-list-price">
                <span>¥ {{ item.price }} 元</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        background
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
  </template>
  
  <script>
  import { getCombo } from '../../api/data';
    export default {
      name: 'TravelPlan',
      components: {},
      data() {
        return {
          queryForm: {
            pageNo: 1,
            pageSize: 20,
            title: '',
          },
          comboList: [],
          listLoading: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          total: 0,
          elementLoadingText: '正在加载...',
          options:[],
          city:[],
          input:''
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
      methods: {
        handleSizeChange(val) {
          this.queryForm.pageSize = val
          this.fetchData()
        },
        handleCurrentChange(val) {
          this.queryForm.pageNo = val
          this.fetchData()
        },
        handleQuery() {
          this.queryForm.pageNo = 1
          this.fetchData()
        },
        fetchCombo(){
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
          getCombo(data).then((r)=>{
            if(r.code===200){
              for(var i=0;i<r.data.count;i++){
                var p,name,pic,des,url;
                p=r.data.comboList[i].comboPrice;
                name=r.data.comboList[i].comboTitle;
                pic=r.data.comboList[i].comboImg;
                des=r.data.comboList[i].comboDescription;
                url=r.data.comboList[i].comboUrl;
                this.comboList.push({title:name,description:des,image:pic,price:p,comboUrl:url})
              }
            }
          }).catch((err) => {
          console.log(err);
        });

          
        }
      },
    }
  </script>
  <style lang="scss" scoped>
   .block{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        .demonstration{
            margin:5px;
        }
    }
    .travel-plan-container {
      .combo-list-card-body {
        position: relative;
        text-align: center;
        cursor: pointer;
  
        .combo-list-tag-group {
          position: absolute;
          top: 10px;
          right: 5px;
          z-index: 9;
        }
  
        .combo-list-image-group {
          height: 400px;
          overflow: hidden;
  
          .combo-list-image {
            width: 100%;
            height: 400px;
            transition: all ease-in-out 0.3s;
  
            &:hover {
              transform: scale(1.1);
            }
          }
        }
  
        .combo-list-title {
          margin: 8px 0;
          font-size: 16px;
          font-weight: bold;
        }
  
        .combo-list-description {
          font-size: 14px;
          color: #808695;
        }
  
        .combo-list-price {
          margin: 8px 0;
          font-size: 14px;
          color: $base-color-orange;
  
          s {
            color: #c5c8ce;
          }
        }
      }
    }
  </style>
  