<template>
    <div class="accommodation-container">
      <div class="block">
            <span class="demonstration">请选择城市</span>
            <el-cascader
              v-model="city"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
            <el-input v-model="district" placeholder="请输入区名" prefix-icon="el-icon-search" clearable>
              <el-button icon="el-icon-search"  type="small" slot="append" @click="fetchAccomodation()"></el-button>
            </el-input>
            <span class="demonstration">日期</span>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in list"
          :key="index"
          :xs="24"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="6"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="accommodation-list-card-body">
              <div class="accommodation-list-tag-group">
                <el-tag v-if="item.isRecommend" hit type="success">推荐</el-tag>
              </div>
              <div class="accommodation-list-image-group">
                <img :src="item.image" class="accommodation-list-image" />
              </div>
              <div class="accommodation-list-title">{{ item.title }}</div>
              <div class="accommodation-list-description">{{ item.description }}</div>
              <div class="accommodation-list-price">
                <span>¥ {{ item.price }} 元起</span>
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
  import { getAccomodation } from '../../api/data'
  import { getCitylist } from '../../api/citylist';
    export default {
      name: 'Accommodation',
      components: {},
      data() {
        return {
          date:'',
          district:'',
          queryForm: {
            pageNo: 1,
            pageSize: 20,
            title: '',
          },
          list: [],
          listLoading: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          total: 0,
          elementLoadingText: '正在加载...',
          city:[],
          options:[]
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
        fetchAccomodation(){
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
          getAccomodation(data,this.district,this.date).then((r)=>{
            if(r.code===200){
              for(var i=0;i<r.data.count;i++){
                var address,name,pic,p;
                address=r.data.hotelList[i].address;
                name=r.data.hotelList[i].chineseName;
                pic=r.data.hotelList[i].picture;
                p=r.data.hotelList[i].price;
                this.list.push({title:name,description:address,image:pic,price:p,isRecommend:true})
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
    .accommodation-container {
      .accommodation-list-card-body {
        position: relative;
        text-align: center;
        cursor: pointer;
  
        .accommodation-list-tag-group {
          position: absolute;
          top: 10px;
          right: 5px;
          z-index: 9;
        }
  
        .accommodation-list-image-group {
          height: 400px;
          overflow: hidden;
  
          .accommodation-list-image {
            width: 100%;
            height: 400px;
            transition: all ease-in-out 0.3s;
  
            &:hover {
              transform: scale(1.1);
            }
          }
        }
  
        .accommodation-list-title {
          margin: 8px 0;
          font-size: 16px;
          font-weight: bold;
        }
  
        .accommodation-list-description {
          font-size: 14px;
          color: #808695;
        }
  
        .accommodation-list-price {
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
  