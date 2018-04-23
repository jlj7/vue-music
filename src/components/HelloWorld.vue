<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div style="width: 10px;height: 10px;background: #ffa900"></div>
    <div style="width: 10px;height: 10px;background: #ff4085"></div>
    <div style="width: 10px;height: 10px;background: #00cfff"></div>
    <div style="width: 10px;height: 10px;background: #9abc1c"></div>
    <canvas id="myCanvas" width="600" height="400">您的浏览器暂不支持canvas，请升级到最新版本</canvas>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    let canvas = {}
    let image = {}
    let particles = []
    // 获取canvas元素
    canvas.obj = document.getElementById('myCanvas')
    if (canvas.obj.getContext) {
      // 获取渲染上下文
      canvas.ctx = canvas.obj.getContext('2d')
      // 设置画布大小
      canvas.w = canvas.obj.width = document.body.clientWidth
      canvas.h = canvas.obj.height = document.body.clientHeight
      // 新建一个image对象
      let img = new Image()
      // 图像加载完后
      img.onload = function () {
        // 把图像信息保存在image里面
        image.obj = img
        image.w = img.width
        image.h = img.height
        image.x = parseInt(canvas.w / 2 - image.w / 2)
        image.y = 200
        // 把图像绘制到画布上
        canvas.ctx.drawImage(image.obj, image.x, image.y, image.w, image.h)
        image.imageData = canvas.ctx.getImageData(image.x, image.y, image.w, image.h)
        // 计算出符合要求的像素
        calculate()
        // 计算后绘制到画布上
        draw()
      }
      // 设置并保存坐标
      img.src = 'static/payment-icon.png'
    }
    // 计算并保存坐标
    function calculate () {
      // let len = image.imageData.length
      // 只保存100行，100列的像素值
      let cols = 100
      let rows = 100
      // 设置成100行，100列后每个单元的宽高
      let Swidth = parseInt(image.w / cols)
      let Sheight = parseInt(image.h / rows)
      let pos = 0 // 数组中的位置
      // let parX, parY // 粒子的x，y坐标
      let data = image.imageData.data // 像素值数组
      console.log(data)
      for (let i = 1; i <= cols; i++) {
        for (let j = 1; j <= rows; j++) {
          // 计算（i，j）在数组中R的坐标值
          pos = [(j * Sheight - 1) * image.w + (i * Swidth - 1)] * 4
          // 判断像素透明度值是否符合要求
          if (data[pos + 3] > 0) {
            let particle = {
              // x,y值都随机一下
              x: image.x + i * Swidth + (Math.random() - 0.5) * 20,
              y: image.y + j * Sheight + (Math.random() - 0.5) * 20
            }
            // 根据图像不同的色值来设定粒子色值
            if (data[pos] < 50) {
              particle.fillStyle = '#2C211E'
            } else if (data[pos + 1] < 220 && data[pos + 1] > 180) {
              particle.fillStyle = '#F8D4BC'
            } else if (data[pos + 1] < 160 && data[pos + 1] > 140) {
              particle.fillStyle = '#C29730'
            } else if (data[pos + 1] < 180 && data[pos + 1] > 160) {
              particle.fillStyle = '#2DA980'
            }
            // 符合要求的粒子保存到数组里
            particles.push(particle)
          }
        }
      }
    }

    // 绘图案
    function draw () {
      canvas.ctx.clearRect(0, 0, canvas.w, canvas.h)
      let len = particles.length
      console.log(particles)
      let currParticle = null
      // 把保存的粒子全部绘制到画布里
      for (let i = 0; i <= len; i++) {
        currParticle = particles[i]
        canvas.ctx.fillStyle = currParticle.fillStyle
        canvas.ctx.fillRect(currParticle.x, currParticle.y, 1, 1)
      }
    }

    canvas.ctx.moveTo(300, 500)
    canvas.ctx.lineTo(300, 300)
    canvas.ctx.lineWidth = 6
    canvas.ctx.strokeStyle = '#ff0000'
    canvas.ctx.stroke()

    canvas.obj.onmousedown = function (e) {
      var mx = e.layerX
      var my = e.layerY
      var sx = 300
      var sy = 200
      var angle = Math.atan2((my - sy), (mx - sx))
      canvas.ctx.clearRect(0, 0, 600, 600)
      canvas.ctx.beginPath()
      canvas.ctx.moveTo(sx, sy)
      canvas.ctx.lineTo(sx + 20 * Math.cos(angle), sy + 20 * Math.sin(angle))
      canvas.ctx.stroke()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
