<template>
    <div class="accommodation-container">
      <vab-query-form>
        <vab-query-form-right-panel :span="24">
          <el-form
            ref="form"
            :model="queryForm"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <el-input v-model="queryForm.title" placeholder="请输入关键词" />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
                @click="handleQuery"
              >
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-right-panel>
      </vab-query-form>
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
            <div class="accommodation-list-card-body">
              <div class="accommodation-list-tag-group">
                <el-tag v-if="item.isRecommend" hit type="success">推荐</el-tag>
                <el-tag v-if="item.status === 0" hit type="danger">订满</el-tag>
              </div>
              <div class="accommodation-list-image-group">
                <img :src="item.image" class="accommodation-list-image" />
              </div>
              <div class="accommodation-list-title">{{ item.title }}</div>
              <div class="accommodation-list-description">{{ item.description }}</div>
              <div class="accommodation-list-price">
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
  
    export default {
      name: 'Accommodation',
      components: {},
      data() {
        return {
          queryForm: {
            pageNo: 1,
            pageSize: 20,
            title: '',
          },
          comboList: [
            {
              isRecommend:true,
              status:0,
              image:require('@/assets/comparison/left.jpg'),
              title:'上海三日游',
              description:'在上海玩三天',
              price:'5000'
            },
            {
              isRecommend:true,
              status:5,
              image:'',
              title:'上海三日游',
              description:'在上海玩三天',
              price:'4000'
            },
            {
              isRecommend:true,
              status:0,
              image:'',
              title:'上海三日游',
              description:'在上海玩三天',
              price:'3000'
            },
            {
              isRecommend:true,
              status:100,
              image:'',
              title:'上海三日游',
              description:'在上海玩三天',
              price:'2000'
            }],
          listLoading: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          total: 0,
          elementLoadingText: '正在加载...',
        }
      },
      created() {
        this.fetchData()
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
        async fetchData() {
          
        },
      },
    }
  </script>
  <style lang="scss" scoped>
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
  