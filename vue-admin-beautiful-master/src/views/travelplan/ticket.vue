<template>
  <div class="table-container">
    <div class="select-container">
      <div class="block">
        <span class="demonstration">请选择交通工具</span>
        <el-cascader
          v-model="vehicle"
          :options="vehicleOption"
          :props="{expandTrigger:'hover'}"
          @change="handleChange"></el-cascader>
        <span class="demonstration">请选择出发地</span>
        <el-cascader
          v-model="depart"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"></el-cascader>
        <span class="demonstration">请选择目的地</span>
        <el-cascader
          v-model="arrive"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"></el-cascader>
      </div>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="depart_time"
      label="出发时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="arrive_time"
      label="到达时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="departure"
      label="出发">
    </el-table-column>
    <el-table-column
      prop="arrival"
      label="到达">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      sortable
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="company"
      label="航空公司">
    </el-table-column>
    <el-table-column
        show-overflow-tooltip
        label="余票"
        prop="left"
        sortable
      ></el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
        <el-button @click="handleClick" type="text" size="small">订票</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <span></span>
  </div>
  </div>
</template>

<script>
import { getCitylist } from '../../api/citylist';
  export default {
    methods: {
      handleClick(){
        console.log("yes")
      }
    },
    data() {
      return {

        tableData: [{
          date: '2016-05-02',
          depart_time: '07:55',
          arrive_time:'10:20',
          departure: '虹桥T2',
          arrival:'浦东T1',
          price:'320',
          company:'东航',
          left:10,
        }, {
          date: '2016-05-02',
          depart_time: '07:55',
          arrive_time:'10:20',
          departure: '虹桥T2',
          arrival:'浦东T1',
          price:'200',
          company:'东航',
          left:10,
        }, {
          date: '2016-05-02',
          depart_time: '07:55',
          arrive_time:'10:20',
          departure: '虹桥T2',
          arrival:'浦东T1',
          price:'400',
          company:'东航',
          left:10,
        }, {
          date: '2016-05-02',
          depart_time: '07:55',
          arrive_time:'10:20',
          departure: '虹桥T2',
          arrival:'浦东T1',
          price:'300',
          company:'东航',
          left:0,
        }],
        depart:[],
        arrive:[],
        vehicle:[],
        vehicleOption:[
          {
            value:'train',
            label:'火车'
          },
          {
            value:'plane',
            label:'飞机'
          }
        ],
        //d:[],
        //code,name,pchild
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
        }]
      }
    },
    created(){
      getCitylist().then((r)=>{
        if(r.code===1){
          console.log(r.data);
        }

      }).catch((err) => {
          console.log(err);
        });
    }
  }
</script>

<style lang="scss" scoped>

 

  .table-container{

    .select-container{
      .block{
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  }


  </style>
