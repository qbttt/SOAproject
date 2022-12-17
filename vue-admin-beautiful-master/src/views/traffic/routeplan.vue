<template>
    <div class="route-container">
        <el-col :span="6">
            <el-card :body-style="{ padding: '30px' }" shadow="hover">
                <div class="form-container">
                    <el-row :gutter="20">
                        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="18">
                            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px"
                                class="demo-ruleForm">
                                <el-form-item label="出发地" prop="start">
                                    <el-input v-model="ruleForm.start" id="sinpt"></el-input>
                                </el-form-item>

                                <el-form-item label="目的地" prop="end">
                                    <el-input v-model="ruleForm.end" id="einpt"></el-input>
                                </el-form-item>

                                <el-form-item label="出行方式" prop="type">
                                    <el-radio-group v-model="ruleForm.type">
                                        <el-radio label="步行" name="type"></el-radio>
                                        <el-radio label="公交" name="type"></el-radio>
                                        <el-radio label="骑车" name="type"></el-radio>
                                        <el-radio label="驾车" name="type"></el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary"
                                        @click="getroute(ruleForm.start, ruleForm.end, ruleForm.type)">
                                        查询
                                    </el-button>
                                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </el-col>

        <el-col :span="18">
            <el-card :body-style="{ padding: '15px' }" shadow="hover">
                <div class="map-container">
                    <div id="container"></div>
                    <div id="panel"></div>
                </div>
            </el-card>
        </el-col>
    </div>
</template>
  
<script>


export default {
    data() {
        return {
            ruleForm: {
                start: '',
                end: '',
                region: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            rules: {
                start: [
                    { required: true, message: '请输入出发地', trigger: 'blur' },
                ],
                end: [
                    { required: true, message: '请输入目的地', trigger: 'blur' },
                ],
            },
            map: null,
        }
    },
    mounted() {
        this.initMap();
    },
    destroyed() {
        this.map.destroy();
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        initMap() {
            this.map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 11, // 初始化地图层级
                center: [119.20058, 32.98972]// 初始化地图中心点
            });
        },

        drivingMap(start, end) {
            AMap.plugin("AMap.Driving", () => {
                //构造路线导航类
                var driving = new AMap.Driving({
                    map: this.map,
                    city: '全国',
                    panel: "panel",
                });
                //创建搜索的路线  传入要规划的坐标点
                // 根据起终点名称规划驾车导航路线
                driving.search([
                    { keyword: start },
                    { keyword: end }
                ],
                    function (status, result) {
                        if (status === "complete") {
                            log.success('绘制驾车路线完成')
                        } else {
                            log.error('获取驾车数据失败：' + result)
                        }
                    }
                );
            });
        },
        walkingMap(start, end) {
            AMap.plugin("AMap.Walking", () => {
                //构造路线导航类
                var walking = new AMap.Walking({
                    map: this.map,
                    panel: "panel",
                });
                //创建搜索的路线  传入要规划的坐标点
                // 根据起终点名称规划驾车导航路线
                walking.search([
                    { keyword: start },
                    { keyword: end }
                ],
                    function (status, result) {
                        if (status === "complete") {
                            log.success('绘制步行路线完成')
                        } else {
                            log.error('获取步行数据失败：' + result)
                        }
                    }
                );
            });
        },
        ridingMap(start, end) {
            AMap.plugin("AMap.Riding", () => {
                //构造路线导航类
                var riding = new AMap.Riding({
                    map: this.map,
                    panel: "panel",
                });
                //创建搜索的路线  传入要规划的坐标点
                // 根据起终点名称规划驾车导航路线
                riding.search([
                    { keyword: start },
                    { keyword: end }
                ],
                    function (status, result) {
                        if (status === "complete") {
                            log.success('绘制骑行路线完成')
                        } else {
                            log.error('获取骑行数据失败：' + result)
                        }
                    }
                );
            });
        },
        transferMap(start, end) {
            AMap.plugin("AMap.Transfer", () => {
                //构造路线导航类
                var transfer = new AMap.Transfer({
                    map: this.map,
                    city: '全国',
                    panel: "panel",
                });
                //创建搜索的路线  传入要规划的坐标点
                // 根据起终点名称规划驾车导航路线
                transfer.search([
                    { keyword: start },
                    { keyword: end }
                ],
                    function (status, result) {
                        if (status === "complete") {
                            log.success('绘制公交路线完成')
                        } else {
                            log.error('获取公交数据失败：' + result)
                        }
                    }
                );
            });
        },

        getroute(start, end, type) {
            // 构造路线导航类
            if (type === "驾车") {
                this.initMap();
                this.drivingMap(start, end);
            }
            else if (type === "步行") {
                this.initMap();
                this.walkingMap(start, end);
            }
            else if (type === "骑车") {
                this.initMap();
                this.ridingMap(start, end);
            }
            else if (type === "公交") {
                this.initMap();
                this.transferMap(start, end);
            }
        },

    },
}

</script>

<style lang="scss" scoped>
.map-container {
    height: 500px;
    width: 985px;
}

#container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.el-card {
    margin: 5px;
}

#panel {
    position: fixed;
    max-height: 90%;
    overflow-y: auto;
    top: 180px;
    right: 65px;
    width: 280px;
    height: 300px;
}

#panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

#panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
}
</style>