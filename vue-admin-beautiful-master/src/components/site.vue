<template>
    <el-card :body-style="{padding:'0px'}">
        <div class="site-container">
            <div class="site-picture">
                <img :src="image" class="image">
            </div>
            <div class="info-container">
                <div class="site-title">
                    <span>{{title}}</span>
                </div>
                <div class="site-location">
                    <span>{{location}}</span>
                </div>  
                <div class="bottom">
                    <span>“{{comment}}”</span>
                </div>
            </div>
        </div>
        

    </el-card>
</template>

<script>
export default{
    name:'guidence',
    props:[
        'image',
        'title',
        'location',
        'comment'
    ],
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
  .site-container{
    display: flex;
    flex-direction: row;
    padding: 10px;
    .site-picture{
        width: 30%;
        padding-right: 10px;
        .image {
          width: 100%;
          height: 100%;
          transition: all ease-in-out 0.3s;
          &:hover {
          transform: scale(1.1);
          }
    }
    .info-container{
        display: flex;
        flex-direction: column;
    
    }
       
    
  }

  .site-title{
    margin-top: 13px;
    //margin-bottom: 13px;
    line-height: 18px;
    font-size: medium;
  }
  .site-location{
    margin-top: 13px;
    margin-bottom: 20px;
    line-height: 12px;
    color: #999;
    font-size: smaller;
  }
  .bottom {
    margin-top: 13px;
    margin-bottom: 13px;
    line-height: 14px;
    color: #666;
    font-size: smaller;
  }
  }
  
</style>