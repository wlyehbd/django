

export function timestampToTime (timestamp,type,times) { // 时间戳转换时间
  if (!timestamp) {
    return ''
  }
  let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + type;
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + type;
  let D = date.getDate()<10?'0'+date.getDate():date.getDate()
  let h = date.getHours()<10?'0'+date.getHours() + ':':date.getHours() + ':'
  let m = date.getMinutes()<10?'0'+date.getMinutes()+':':date.getMinutes()+':';
  let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
  if(!times){
    return Y+M+D;
  }else{
    return Y+M+D+' '+h+m+s
  }
 
}

// 验证是否含有中文字符
export function isChineseChar(str) { 
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}

export function setOption(data,color,title){//首页饼状图配置项数据
   let pieOption = {
    title : {
      text: title[0],
      subtext: title[1],
      x:'center'
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      alwaysShowContent:true
    },
    legend: {
      bottom: 10,
      left: "center",
      orient: "horizontal",
      padding: [5, 10],
      data: data.title,
      formatter:function(name){
        return name
      }
    },
    series: [
      {
        name: data.name,
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            formatter: '{b}:{c}',
            color:'auto',
            rich: {
                a: {
                    color: 'red',
                    lineHeight: 44,
                    align: 'center'
                },
                hr: {
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                },
                b: {
                    fontSize: 22,
                    lineHeight: 33
                },
                per: {
                    color: 'red',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                }
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: data.value[0],
            name: data.title[0],
            itemStyle: {
              normal: {
                color: color[0]
              }
            }
          },
          { 
            value: data.value[1], 
            name: data.title[1],
            itemStyle: {
              normal: {
                color: color[1]
              }
            }
          },
          { 
            value: data.value[2], 
            name: data.title[2],
            itemStyle: {
              normal: {
                color: color[2]
              }
            }
          }
        ]
      }
    ]
  };
  return pieOption
}

export function setOption1(pieTitle,colorList,dataTitleList,dataList){
 let option = {
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {d}% <br/> {c}"
    },
    graphic: {
        elements:[{
          type: 'text',
          style: {
              text:pieTitle,
              font: 'bolder 18px Arial',
              fill:'#000',
              width: 60,
              height: 60
          },
          left: 'center',
          top: 'center'
        }]
    },
    legend: {
        orient: 'horizontal',
        icon: 'roundRect',
        bottom: 5,
        x: 'center',
        textStyle: {
            color: '#000'
        },
        data:dataTitleList
    },
    series: [{
        type: 'pie',
        radius: ['43%', '57%'],
        center: ['50%', '50%'],
        color:colorList,
        data:dataList,
        labelLine: {
            normal: {
                show: true,
                length: 10,
                length2: 10,
                lineStyle: {
                    color: '#999',
                    width: 1
                }
            }
        },
        label: {
            normal: {
                formatter:  '{b|{b}}\n{d|{d}%}',
                rich: {
                    b: {
                        fontSize: 16,
                        color: '#333',
                        align: 'right',
                        padding: 4
                    },
                    d: {
                        fontSize: 16,
                        color: '#ff8400',
                        align: 'center',
                        padding: 4
                    },
                    c: {
                        fontSize: 16,
                        color: '#87CEFF',
                        align: 'right',
                        padding: 4
                    }
                }
            }
        }
    }]
};
return option
}
  //配置项demo
     // text:'图表名字',
     // dataTitleList: ['五保', '低保', '残疾', '失独', '重点优抚', '突出贡献']
     // colorList: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'],
     // dataList: [{
        //         value: 335,
        //         name: '五保'
        //     },
        //     {
        //         value: 310,
        //         name: '低保'
        //     },
        //     {
        //         value: 234,
        //         name: '残疾'
        //     },
        //     {
        //         value: 235,
        //         name: '失独'
        //     },
        //     {
        //         value: 254,
        //         name: '重点优抚'
        //     },
        //     {
        //         value: 174,
        //         name: '突出贡献'
        //     }
        // ],

    
