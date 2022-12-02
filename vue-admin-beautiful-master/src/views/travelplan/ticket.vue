<template>
  <div class="table-container">
    <div class="select-container">
      <div class="block">
        <span class="demonstration">交通工具</span>
        <el-cascader
          size="small"
          v-model="vehicle"
          :options="vehicleOption"
          :props="{expandTrigger:'hover'}"
          @change="handleChange"></el-cascader>
          <span class="demonstration">日期</span>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
        <span class="demonstration">出发地</span>
        <el-cascader
          size="small"
          v-model="depart"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"></el-cascader>
        <span class="demonstration">目的地</span>
        <el-cascader
          size="small"
          v-model="arrive"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"></el-cascader>
        <el-button @click="updateTrain()">查询</el-button>
      </div>

    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="日期"
      width="100">
    </el-table-column>
    <el-table-column
      prop="depart_time"
      label="出发时间"
      width="100">
    </el-table-column>
    <el-table-column
      prop="arrive_time"
      label="到达时间"
      width="100">
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
      v-if="vehicle=='plane'"
      prop="planeNum"
      label="航班">
    </el-table-column>
    <el-table-column
      v-if="vehicle=='plane'"
      prop="company"
      label="航空公司">
    </el-table-column>
    <el-table-column
      v-if="vehicle=='train'"
      prop="trainNum"
      label="车次">
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
import {getWeather} from '../../api/weather';
import {getTrain} from '../../api/ticket';
  export default {
    methods: {
      handleClick(){
        console.log("yes")
      },
      handleChange(){
        console.log("change")
      },
      tableRowClassName(){

      },
      updateTrain(){
        //console.log(this.depart);
        var de='';
        if(this.depart[1]=="市辖区"){
          de=this.depart[0];
          de=de.substring(0,de.lastIndexOf("市"))
        }
        else{
          de=this.depart[1];
          de=de.substring(0,de.lastIndexOf("市"))
        }
       // console.log(this.arrive);
        var arr='';
        if(this.arrive[1]=="市辖区"){
          arr=this.arrive[0];
          arr=arr.substring(0,arr.lastIndexOf("市"))
        }
        else{
          arr=this.arrive[1];
          arr=arr.substring(0,arr.lastIndexOf("市"))
        }
        //console.log(de);
        //console.log(arr);
        //console.log(this.date);
        getTrain(de,arr,this.date).then((r)=>{
          if(r.code===200){
            console.log(r.data.count)
            var p=[];
            var num;
            var departStation,destStation,departTime,arriveTime,tprice,seats;
            this.tableData=[];
            for(var i=r.data.list.length-1;i>=0;i--){
              num=r.data.list[i].trainNum;
              //console.log(num);
              departStation=r.data.list[i].departStationName;
              destStation=r.data.list[i].destStationName;
              departTime=r.data.list[i].departDepartTime;
              arriveTime=r.data.list[i].destArriveTime;
              tprice=r.data.list[i].prices[1].price;
              seats=r.data.list[i].prices[1].leftNumber;
              this.tableData.push({date:this.date,depart_time:departTime,arrive_time:arriveTime,departure:departStation,arrival:destStation,price:tprice,left:seats,trainNum:num})
            }
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    data() {
      return {

        /*tableData: [{
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
        }],*/
        tableData:[],
        date:'',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        depart:'',
        arrive:'',
        vehicle:'',
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
        options:[],
      }
    },
    created(){
      getCitylist().then((r)=>{
        if(r.code===1){
          //console.log(r.data[0].pchilds);
          var tmp=[];
          var name,code;
          var cnt=0;
          for(var i=r.data.length-1;i>=0;i--){
            //console.log(r.data[i].name);
            for(var j=r.data[i].pchilds.length-1;j>=0;j--){
              //console.log(r.data[i].pchilds[j].name);
              name=r.data[i].pchilds[j].name;
              code=r.data[i].pchilds[j].code;
              tmp.push({value:name,label:name});
            }
            //console.log(tmp);
            name=r.data[i].name;
            code=r.data[i].code;
            this.options.push({value:name,label:name});
            this.options[cnt].children=tmp;
            cnt++;
            tmp=[];
          }
          //console.log(this.options)
        }
      }).catch((err) => {
          console.log(err);
        });
      /*getWeather().then((r)=>{
        if(r.error_code===0){
          console.log(r.result)
        }
      }).catch((err) => {
          console.log(err);
        });*/
      /*getTrain("上海","北京","2022-12-03").then((r)=>{
        if(r.code===200){
          console.log(r.data.list)
        }
      }).catch((err) => {
          console.log(err);
        });*/
      
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
        .demonstration{
          width:80px;
          text-align: center;
        }
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
