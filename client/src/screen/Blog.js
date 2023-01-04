import React,{useEffect,useState} from 'react';
import { productCreateReducer } from '../reducers/productreducer';
import Header from './Header';
import zuz from "../core/Toast";
import axios from 'axios'

function Blog(props) {
    const [loading,setloading] = useState(true)
    const [blog,setblog] = useState([])
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        const getablog = async () => {
            try {
                const res = await  axios.get(`${process.env.REACT_APP_API_URL}/blog/getablog/${props.match.params.id}`)
                //console.log(res)
                if(res.data.status === 'success'){
                  setblog(res.data.blog)
                  setloading(false)
                }
               } catch (error) {
               if(error.response){
                 {
                   zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
                 }
               }
               } 
        }
        if(props.match.params.id != '1')
        {
            getablog()
        }
        else {
            setloading(false)
        }
    },[]);

    // console.log(props.match.params.id)
    // console.log(typeof(props.match.params.id))
    // console.log(props.match.params.id == '1')
    return (
        <React.Fragment>
            <Header/>
            {loading ? <div className="cover flex aic abs fill">
            <img src={`/images/loader.svg`} className="img" />
            </div>
            :  
            props.match.params.id != '1' ?
            <div className='blog-detail'>
                <div className='banner'> 
                    <div className='meta wrapWidth flex flex-col aic'>
                        <div className='title fontl s24 b8 color'>{blog.title}</div>
                        <div className='txt fontl s28 b7 c000'>{blog.mainheading}</div>
                    </div>
                    {/* <div className='graphic' style={{background: `url(${process.env.REACT_APP_END_URL}${blog.image2})`}}/> */}
                </div>
                <div className='content wrapWidth flex flex-col'>
                    {/* <div className='item fontl s16 b4 c000'><span className="s32 c000 b7">Lorem</span>dolor sit amet, consectetur adipiscing elit. Risus adipiscing et sed eleifend sagittis, fringilla lectus sed. Nisl tellus donec lacus, malesuada massa vulputate erat. Id malesuada nunc sit consectetur amet diam facilisi aliquet. Ut turpis at suspendisse placerat viverra maecenas id. Morbi sagittis libero sit sit vitae urna, lectus. Diam egestas ut odio sit fusce neque. Eu amet et habitant elit magna volutpat. Ac faucibus lectus aliquam nunc, nisi, lorem volutpat odio pellentesque. At nulla lectus in turpis velit laoreet magna. Suspendisse etiam morbi varius lacus porttitor nec magna.</div> */}
                    {blog.paragraphitems.map((item) =>  <div className='item fontl s16 b4 c000'>{item.paragraph}</div>)}
                 
                    <div className='img' style={{background: `url(${process.env.REACT_APP_END_URL}${blog.image2})`}}/>
                  
                </div>
                <div className='rights wrapWidth flex aic'>
                    <div className='cpy fontl s14 b6 upc c000'>&copy; 2021 Freshlay . All rights reserved. Terms of Service.</div>
                </div>
            </div>
            :
            <div className='blog-detail'>
                <div className='banner'> 
                    <div className='meta wrapWidth flex flex-col aic'>
                        <div className='title fontl s24 b8 color'>Freshlay Introduction</div>
                        <div className='txt fontl s28 b7 c000'>How To Use Freshlay.com ? Why Freshlay Born?</div>
                    </div>
                    <div className='graphic' style={{background: 'url(/images/blog-1.jpg)'}}/>
                </div>
                <div className='content wrapWidth flex flex-col'>
                    <div className='item fontl s16 b4 c000'><span className="s32 c000 b7">Lorem</span>dolor sit amet, consectetur adipiscing elit. Risus adipiscing et sed eleifend sagittis, fringilla lectus sed. Nisl tellus donec lacus, malesuada massa vulputate erat. Id malesuada nunc sit consectetur amet diam facilisi aliquet. Ut turpis at suspendisse placerat viverra maecenas id. Morbi sagittis libero sit sit vitae urna, lectus. Diam egestas ut odio sit fusce neque. Eu amet et habitant elit magna volutpat. Ac faucibus lectus aliquam nunc, nisi, lorem volutpat odio pellentesque. At nulla lectus in turpis velit laoreet magna. Suspendisse etiam morbi varius lacus porttitor nec magna.</div>
                    <div className='item fontl s16 b4 c000'>Libero lorem gravida semper eget consectetur. Id diam amet mi, sagittis sagittis elit non. In donec aliquet purus, rhoncus dictum viverra mi. Rhoncus fermentum felis, mauris, amet fames ipsum cursus amet volutpat. Aliquam ornare mauris iaculis a habitant imperdiet tincidunt consectetur nisl. Morbi malesuada et sit volutpat tempus. Mauris tortor ac in platea. Magna nisl, libero lacus, felis sit.</div>
                    <div className='item fontl s16 b4 c000'>Lacinia neque amet, vitae ultrices pellentesque leo sagittis. Sed vitae, potenti suspendisse mauris feugiat sapien cum netus sit. Ipsum aliquam, erat id nibh habitant integer ut eget. Aliquam egestas etiam lacus vel urna alique.</div>
                    <div className='item fontl s16 b4 c000'>Cum et, nullam convallis arcu amet rhoncus, mauris. In elementum fusce amet vitae semper quis lectus aliquam. Non, lobortis accumsan maecenas accumsan, mattis nunc mi. Sem eget sit sapien egestas. Ut maecenas congue accumsan, arcu eu. Morbi et mauris habitasse feugiat justo, semper ultricies vitae posuere. Sed ac lorem convallis nisl elementum risus. Risus, faucibus morbi urna sapien, suspendisse libero, scelerisque tellus. Orci sagittis, vitae tortor, cras a egestas. Dignissim dictum adipiscing ipsum, netus in.</div>
                    <div className='img' style={{background: `url(/images/blog-6.jpg)`}}/>
                    <div className='item fontl s16 b4 c000'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus adipiscing et sed eleifend sagittis, fringilla lectus sed. Nisl tellus donec lacus, malesuada massa vulputate erat. Id malesuada nunc sit consectetur amet diam facilisi aliquet. Ut turpis at suspendisse placerat viverra maecenas id. Morbi sagittis libero sit sit vitae urna, lectus. Diam egestas ut odio sit fusce neque. Eu amet et habitant elit magna volutpat. Ac faucibus lectus aliquam nunc, nisi, lorem volutpat odio pellentesque. At nulla lectus in turpis velit laoreet magna. Suspendisse etiam morbi varius lacus porttitor nec magna.</div>
                    <div className='item fontl s16 b4 c000'>Libero lorem gravida semper eget consectetur. Id diam amet mi, sagittis sagittis elit non. In donec aliquet purus, rhoncus dictum viverra mi. Rhoncus fermentum felis, mauris, amet fames ipsum cursus amet volutpat. Aliquam ornare mauris iaculis a habitant imperdiet tincidunt consectetur nisl. Morbi malesuada et sit volutpat tempus. Mauris tortor ac in platea. Magna nisl, libero lacus, felis sit.</div>
                    <div className='item fontl s16 b4 c000'>Lacinia neque amet, vitae ultrices pellentesque leo sagittis. Sed vitae, potenti suspendisse mauris feugiat sapien cum netus sit. Ipsum aliquam, erat id nibh habitant integer ut eget. Aliquam egestas etiam lacus vel urna aliquet. Accumsan in odio nisl sit. At netus neque, ac feugiat amet, elit netus in. Molestie cursus et condimentum hendrerit leo.</div>
                    <div className='item fontl s16 b4 c000'>Cum et, nullam convallis arcu amet rhoncus, mauris. In elementum fusce amet vitae semper quis lectus aliquam. Non, lobortis accumsan maecenas accumsan, mattis nunc mi. Sem eget sit sapien egestas. Ut maecenas congue accumsan, arcu eu. Morbi et mauris habitasse feugiat justo, semper ultricies vitae posuere. Sed ac lorem convallis nisl elementum risus. Risus, faucibus morbi urna sapien, suspendisse libero, scelerisque tellus. Orci sagittis, vitae tortor, cras a egestas. Dignissim dictum adipiscing ipsum, netus in.</div>
                </div>
                <div className='rights wrapWidth flex aic'>
                    <div className='cpy fontl s14 b6 upc c000'>&copy; 2021 Freshlay . All rights reserved. Terms of Service.</div>
                </div>
            </div>
            }
        </React.Fragment>
    );
}

export default Blog;