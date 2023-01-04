import React,{useState,useEffect} from 'react';
import { Link} from 'react-router-dom';

// Screen
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./sub/ProductCard";
import {useDispatch,useSelector} from 'react-redux';
import {filterProducts} from '../actions/product'; 
import ProductCardPreloader from './sub/ProdcutCardPreloader';
import NewProductCard from './sub/NewProductCard';
import {homepagepackages} from '../actions/package'

import Lottie from 'react-lottie';
import * as comingSoon from "../lottie/coming.json"

function Category(props){ 
    const [dropCata, setDropCata] = useState(false);
    const [dropPrice, setDropPrice] = useState(false);
    const [dropSort, setDropSort] = useState(false);
    const [cata, setCata] = useState(props.match.params.categoryname); 
    const [sort, setSort] = useState("Default sorting"); 
    const [min,setmin] = useState(0);
    const [max,setmax] = useState(0);
    const [skip,setskip] = useState(0)
    const [minmax,setminmax] = useState('')

    const {packageloaded,packages} =  useSelector(state => state.myhomepageproducts);
   
    const emptyProducts = [{},{},{},{},{}];

    let data = useSelector(state => state.filterdproducts);
    const {loading,products,totalproducts,filtermoreloading} = data;
  
  let dispatch = useDispatch()

   useEffect(() => {
    dispatch(homepagepackages())
   },[])


  
   const _preLoading = () =>{
       return(
        <div className="multi-prdt-wrap flex flex-col wrapWidth">
            <div className="search-items">
                {
                    emptyProducts.map((el,i)=>(
                        <ProductCardPreloader key={i}/>  
                    )) 
                }
            </div>
        </div>
       )
   }

   const _comingSoon_ = {
        loop: true,
        autoplay: true, 
        animationData: comingSoon.default,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    };
   
    return (
        <React.Fragment> 
            <Header />

            <div className="category-page flex flex-col wrapWidth">
                { 
                    <React.Fragment>
                        {/* Selected for You */}
                        {!packageloaded ? 
                            _preLoading() 
                            :
                            <div className="multi-prdt-wrap flex flex-col wrapWidth">
                        {packages.length > 0 ?
                        <div className="search-items"> 
                            {
                                packages.map((item,index)=>( 
                                    <NewProductCard key={index} data={item} package={true}/>
                                ))
                            } 
                        </div>
                        : <div>No offers found</div> } 
                   
                </div> }
                    </React.Fragment>
                }
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Category;