<template>
    <div class="weather-container">
        <el-form ref="weatherform" :model="form" :inline="true" @submit.native.prevent>
            <el-form-item>
                <el-input type="search" placeholder="请输入城市名称" v-model="form.cityname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" @click="weather(form.cityname)">查询</el-button>
            </el-form-item>
        </el-form>

        <el-card :body-style="{ padding: '30px' }" shadow="hover">
            <el-table :data="tableData" :header-cell-style="{'text-align':'center'}" :cell-style="{ 'text-align': 'center' }" style="width: 100%">
                <el-table-column prop="date" label="日期">
                </el-table-column>
                <el-table-column prop="info" label="天气">
                </el-table-column>
                <el-table-column prop="temperature" label="温度">
                </el-table-column>
                <el-table-column prop="humidity" label="湿度">
                </el-table-column>
                <el-table-column prop="direct" label="风向">
                </el-table-column>
                <el-table-column prop="power" label="风力">
                </el-table-column>
                <el-table-column prop="aqi" label="空气质量">
                </el-table-column>
            </el-table>
        </el-card>


        <el-col :span="12">
            <el-card :body-style="{ padding: '30px' }" shadow="hover">
                <el-table :data="tableData1" :header-cell-style="{'text-align':'center'}" :cell-style="{ 'text-align': 'center' }" style="width: 100%">
                    <el-table-column prop="date" label="日期">
                    </el-table-column>
                    <el-table-column prop="temperature" label="温度">
                    </el-table-column>
                    <el-table-column prop="weather" label="天气">
                    </el-table-column>
                    <el-table-column prop="direct" label="风向">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>


        <el-col :span="12">
            <el-card :body-style="{ padding: '30px' }" shadow="hover">
                <el-table :data="tableData2" :header-cell-style="{'text-align':'center'}" :cell-style="{ 'text-align': 'center' }" style="width: 100%">
                    <el-table-column prop="life" label="事项" width="80%">
                    </el-table-column>
                    <el-table-column prop="suggest" label="建议" >
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import { getWeather, getLife } from '@/api/weather'

export default {
    name: 'weatherform',
    data() {
        return {
            form: {
                cityname: ''
            },
            tableData: [

            ],
            tableData1: [

            ],
            tableData2: [

            ]
        }
    },
    methods: {
        weather(cityname) {
            getWeather(cityname).then((r) => {
                if (r.error_code === 0) {
                    console.log(r.reason)
                    var info, temperature, humidity, direct, power, aqi;
                    this.tableData = [];
                    this.tableData1 = [];

                    info = r.result.realtime.info;
                    temperature = r.result.realtime.temperature;
                    humidity = r.result.realtime.humidity;
                    direct = r.result.realtime.direct;
                    power = r.result.realtime.power;
                    aqi = r.result.realtime.aqi;
                    this.tableData.push({ date: "今天", info: info, temperature: temperature, humidity: humidity, direct: direct, power: power, aqi: aqi })

                    var date1, temperature1, weather1, direct1;
                    for (var i = 0; i < r.result.future.length; i++) {
                        date1 = r.result.future[i].date;
                        temperature1 = r.result.future[i].temperature;
                        weather1 = r.result.future[i].weather;
                        direct1 = r.result.future[i].direct;
                        this.tableData1.push({ date: date1, temperature: temperature1, weather: weather1, direct: direct1 })
                    }
                }
            }).catch((err) => {
                console.log(err);
            });

            getLife(cityname).then((r) => {
                if (r.error_code === 0) {
                    console.log(r.reason)
                    var suggest;
                    this.tableData2 = [];

                    suggest = r.result.life.kongtiao.des;
                    this.tableData2.push({ life: '空调', suggest: suggest })
                    suggest = r.result.life.guomin.des;
                    this.tableData2.push({ life: '过敏', suggest: suggest })
                    suggest = r.result.life.shushidu.des;
                    this.tableData2.push({ life: '舒适度', suggest: suggest })
                    suggest = r.result.life.chuanyi.des;
                    this.tableData2.push({ life: '穿衣', suggest: suggest })
                    suggest = r.result.life.diaoyu.des;
                    this.tableData2.push({ life: '钓鱼', suggest: suggest })
                    suggest = r.result.life.ganmao.des;
                    this.tableData2.push({ life: '感冒', suggest: suggest })
                    suggest = r.result.life.ziwaixian.des;
                    this.tableData2.push({ life: '紫外线', suggest: suggest })
                    suggest = r.result.life.xiche.des;
                    this.tableData2.push({ life: '洗车', suggest: suggest })
                    suggest = r.result.life.yundong.des;
                    this.tableData2.push({ life: '运动', suggest: suggest })
                    suggest = r.result.life.daisan.des;
                    this.tableData2.push({ life: '带伞', suggest: suggest })
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.weather-container {
    .el-form {
        margin: 10px;
    }

    .el-card {
        margin: 5px;
    }
}
</style>
