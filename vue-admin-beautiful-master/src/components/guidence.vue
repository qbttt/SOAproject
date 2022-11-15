<template>
    <el-card :body-style="{padding:'0px'}">
        <img :src="image" class="image">
        <div style="padding:14px">
            <span>{{title}}</span>
            <div class="bottom clearfix">
                <span>{{publishtime}}</span>
            </div>
            <el-badge :value="comments" :max="99" class="item">
                <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
                <el-button size="mini" icon="el-icon-share"></el-button>
                <el-button size="mini" icon="el-icon-chat-line-round">评论</el-button> 
            </el-badge> 
            
        </div>

    </el-card>
</template>

<script>
export default{
    name:'guidence',
    props:[
        'image',
        'title',
        'publishtime',
        'comments'
    ],
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
  .image {
    width: 100%;
    height: 400px;
    transition: all ease-in-out 0.3s;
    &:hover {
        transform: scale(1.1);
    }
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .bottom {
    margin-top: 13px;
    margin-bottom: 13px;
    line-height: 12px;
    color: #999;
    font-size: smaller;
  }
</style>