import {Howl} from 'howler';
import myaudiofile from '../../unconvinced-569.mp3';
import zuz from "../../core/Toast";
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {addnotifiction} from '../../actions/Admin/notifications'

const Rating = () => {

  const {isAuthenticated,user }  = useSelector((state) => state.authreducer);
  const dispatch = useDispatch()
  const play  = () => {
    var sound = new Howl({
      src: myaudiofile
    });
    sound.play();
  }
  useEffect(() => {
    if(isAuthenticated){
    const connectwithsocket = () => {
        let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);    
        ws.addEventListener('message', function (mydata) {
        const thedata = JSON.parse(JSON.parse(mydata.data))
       if(thedata.type === 'notification')
       {
        //console.log('notification')
        const {data} = thedata
        //console.log(data)
            if(user._id === data.data.userid)
            {
              if(data.data.type === "orderaccepted")
              {
                zuz.Toast.show({html:`Your order has been accepted`, time: 5});
                play();
                dispatch((addnotifiction([{...data}])))
              }
              else if(data.data.type === "orderrejected")
              {
                zuz.Toast.show({html:`Your order has been rejected`, time: 5});
                play();
                dispatch((addnotifiction([{...data}])))
              }
            else if(data.data.type === "destinationreachad")
            {
                  play();
                  zuz.Toast.show({html:`Your order has been reached to the location please receive your order`, time: 20});
                  dispatch((addnotifiction([{...data}])))
              }  
            else if(data.data.type === "orderdelivered")
            { 
              console.log('reached')
                play();
                dispatch((addnotifiction([{...data}])))

            } 
             }   
        }
        });
    
        ws.onclose = function(){
            console.log('disconneted')
            setTimeout(function(){connectwithsocket()}, 5000);
        };
    }
    connectwithsocket()
}
//return () => console.log('you left component')
},[isAuthenticated])

return ''
}


export default Rating
