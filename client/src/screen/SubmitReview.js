import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";

// Screen 
import Header from "./Header";
import Footer from "./Footer"; 
import setheadertoken from "../utils/setheadertoken";
import axios from "axios";
import zuz from "../core/Toast";

function Review(props) { 

    const [rating,setrating] = useState('')
    const [review,setreview] = useState('')
    const [orderid] = useState(props.match.params.orderid)
    const onValueChange= (e) => {
      setrating(e.target.value)
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.myjwttoken) {
            setheadertoken(localStorage.myjwttoken);
          }
          try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/review/createreview`, {rating,review,orderid});
        } catch (error) {
              if (error.response) {
                zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
              }
          }
    }
    
    useEffect(()=>{
      document.documentElement.scrollTop = 0;
    },[]);
    
    return (
        <React.Fragment>
          <Header />
          <div className="smt-rev-pg">
            <div className="wrapper wrapWidth flex flex-col">
              <div className="hdr">
                <div className="title font s24 b6 c000">Order Feedback</div>
                <div className="txt font s15 c000">Please submit your valuable feedback to make our services better.</div>
              </div>
              <form className="form flex" onSubmit={formSubmit}>
                <div className="lef flex-col">
                  <div className="item">
                    <label>
                      <input
                        type="radio"
                        value="1"
                        checked={rating === "1"}
                        onChange={onValueChange}
                      />
                      1.0 Very bad
                    </label>
                  </div>
                  <div className="item">
                <label>
                  <input
                    type="radio"
                    value="2"
                    checked={rating === "2"}
                    onChange={onValueChange}
                  />
                  2.0 Bad
                </label>
              </div>
                  <div className="item">
                    <label>
                      <input
                        type="radio"
                        value="3"
                        checked={rating === "3"}
                        onChange={onValueChange}
                      />
                      3.0 Good
                    </label>
                  </div>
                  <div className="item">
                    <label>
                      <input
                        type="radio"
                        value="4"
                        checked={rating === "4"}
                        onChange={onValueChange}
                      />
                      4.0 Very Good
                    </label>
                  </div>
                  <div className="item">
                    <label>
                      <input
                        type="radio"
                        value="5"
                        checked={rating === "5"}
                        onChange={onValueChange}
                      />
                      5.0 Excellent
                    </label>
                  </div>
                </div>
                <div className="rig flex flex-col">
                  {/*<div>Selected option is : {rating}</div>*/}
                  <div className="item flex flex-col">
                    <div className="txt font s15 b6 c000">Comment:</div>
                    <textarea className="cmt font s15 c000" value={review} onChange={ (e) => setreview(e.target.value)}/>
                  </div>
                  <button className="button font s15 cfff anim" type="submit">Submit</button>
                </div>
              </form>
            </div>  
          </div>
        <Footer/> 
    </React.Fragment>
    ); 
}

export default Review;