# d3-uml

## TODO:

[ x ] svg nested 显示不完全

### 高优先级TODO：

[ x ] 获取classBox 高度宽度数值

width 需要字体数量来计算 以及padding计算

height 需要先根据 tspan 字体大小和 padding 计算出 Text Height，
然后根据textheight 以及padding 计算出外部的 rect 高度
然后根据rect 以及padding 计算出最外层 rect 高低




[ x ] 根据 高度宽度 以及 依赖关系 计算坐标

根据依赖关系， 深度相同的在一层

[ x ] 上述信息，计算连线怎么绘制 

根据坐标 和 有数据的 范围 计算 连线绘制


### 最高优先级

[ x ] 计算宽度

[ x ] 关系 的 虚线实线

[ x ] 收起开启 umlBox (展开 收起) {部分完成}

[ x ] 根据内容裁剪过长内容 (根据字数，截取过长) {完成} 

[ x ] 放在被截取的文本上， 显示原内容alert 

[ x ] 关系 的 双向箭头 { 完成 }

[ x ] 多余框框去除 {完成}

[ x ] 根据连接情况 排布布局