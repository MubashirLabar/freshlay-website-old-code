import React,{useState,useEffect} from 'react';
import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json";
import {searchproductupdate,searchProducts} from '../actions/product'; 
import {connect,useDispatch,useSelector} from 'react-redux'
// Screen
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./sub/ProductCard";
import ProductCardPreloader from './sub/ProdcutCardPreloader';
import NewProductCard from './sub/NewProductCard';

function SearchResult(props){

    let data = useSelector(state => state.searchproducts);
    const {loading,products,totalproducts,searchmoreloading} = data;
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "FreshLo Search";
        dispatch(searchProducts(props.match.params.keyword))
    }, [])

    const [popular, SetPopular] = useState([
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},
        {label_en: "Fresh Lehsan China", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/4.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/3.jpg"},                                         
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/1.jpg"},
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/3.jpg"},
        {label_en: "Fresh Lehsan China", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/4.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/2.jpg"},                                         
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/5.png"},
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/6.jpg"},
        {label_en: "Fresh Lehsan China", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/2.jpg"},                                         
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/3.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/2.jpg"},                                         
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/5.png"},
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/6.jpg"},
    ]); 
    const emptyProducts = [{},{},{},{},{},{},{},{},{},{}]; 

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

   const _preLoading = () =>{
        return(
        <div className="multi-prdt-wrap flex flex-col wrapWidth">
            <div className="search-items">
                {
                    emptyProducts.map(()=>(
                        <ProductCardPreloader />  
                    )) 
                }
            </div>
        </div>
        )
    }
 
    return (
        <React.Fragment> 
            <Header />
            <div className="search-page flex flex-col wrapWidth">
                {/* Selected for You */}
             {loading ? 
                _preLoading() 
                : 
                products.length == 0 ? 
                <div className="empty-orders flex flex-col">
                    <Lottie options={_emptyPage_} width={300}/>
                    <div className="lbl font s16 b6 c333">Opps! No Result Found</div>
                    <div className="txt font s15 c333">It would appear because you need to search something other!</div>
                </div> 
              : 
              <React.Fragment>
              {loading ? 
                _preLoading()  
               : 
              <React.Fragment>
                    <div className="title rfont b s22 black">Search Result</div>
                    <div className="multi-prdt-wrap flex flex-col wrapWidth">
                    <div className="search-items"> 
                        {
                            products.map(item=>( 
                                <NewProductCard data={item}/>
                            ))
                        } 
                    </div>  
                    {products.length >= totalproducts ? '' :  <div className="more flex aic">
                        {searchmoreloading ? _preLoading() :  
                        <button 
                            onClick={() => dispatch(searchproductupdate()) }
                            className="button font s15 b">Load more</button>  }
                    </div>
                    }
                </div>
              </React.Fragment> 
              }  
              </React.Fragment>
}
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default SearchResult;