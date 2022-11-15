<template>
    <div class="route-container">
        <div class="form-container">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="出发地" prop="start">
                            <el-input v-model="ruleForm.start"></el-input>
                        </el-form-item>

                        <el-form-item label="目的地" prop="end">
                            <el-input v-model="ruleForm.end"></el-input>
                        </el-form-item>

                        <el-form-item label="出行方式" prop="type">
                            <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox label="步行" name="type"></el-checkbox>
                                <el-checkbox label="公交" name="type"></el-checkbox>
                                <el-checkbox label="骑车" name="type"></el-checkbox>
                                <el-checkbox label="驾车" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">
                                立即创建
                            </el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>

                    </el-form>
                </el-col>
            </el-row>
        </div>

        <div class="map-container">
            <div id="map" class="container"></div>
        </div>
    </div>
</template>
  
<script>
//map import
import axios from 'axios'
import * as mapv from 'mapv'

export default {
    //map
    name: 'Map',
    components: {},
    //form
    name: 'Form',
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
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少选择一个出行方式',
                        trigger: 'change',
                    },
                ],
            },
        }
    },

    created() { },
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

    //form
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
    },

}

</script>
  
<style lang="scss" scoped>
.map-container {
    .container {
        width: 100%;
        height: calc(100vh - 214px);
    }
}
</style>