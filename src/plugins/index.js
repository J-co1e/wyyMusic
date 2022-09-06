import { Swipe, SwipeItem,Button,Popup,Field,CellGroup } from 'vant';
let plugins=[
  Swipe, SwipeItem,Button,Popup,Field,CellGroup
]
export default function getVant(app){
  plugins.forEach((item)=>{
    return app.use(item)
  })

}