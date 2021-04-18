<template>
    <div class="bottom">
        <router-link tag="p" to="/Details">德恒党建</router-link>
        <router-link tag="p" to="/Details">勇于创新，敢挑重担，冲锋在前，无私奉献</router-link>
        <h5>德恒律师事务所 版权所有 </h5>
    </div>
</template>

<style>
.bottom{
    width: 100%;                    
    height: 150px;
    overflow: hidden;
    background-image: url(../assets/images/v2_qr4vi9.jpg);
    background-position: center;
    background-size: 110%;
    text-align: center;
    color: #fff;
}
.bottom p{
    font-size: 20px;
    line-height: 20px;
}
.bottom p:nth-of-type(1){
    margin-top: 34px;
}
.bottom p:nth-of-type(2){
    margin: 25px 0 22px;
}
.bottom h5{
    font-size: 12px;
    line-height: 12px;
}
</style>
