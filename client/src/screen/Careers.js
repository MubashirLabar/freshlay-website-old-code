import React,{useState, useEffect} from 'react';

// Screen 
import Header from "./Header";
import Footer from "./Footer"; 

function Careers(props) {

    const [jobs, setJobs] = useState([
        {img: '/images/job-1.jpeg'},
        {img: '/images/job-2.jpeg'},
    ])

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[]);

    return (
        <React.Fragment>
            <Header />
            <div className="about-p contact career-p wrapWidth flex flex-col">
                <div className="title font s28 b black">Careers</div>
                <div className="txt mrg-b font s15 c333">Are you a graduate and looking for on-the-job training to build your career? Are you intereted in becoming the part of the world’most competitive team?<br/> Then Join us and get an immaculate experience for your bright future.</div>
                <div className="txt font s15 c333">Signup and add your CV at <span className="b">hr@freshlay.com.pk</span> and we'll keep you updated on Freshlay career.</div>
                <div className='jobs flex flex-col'>
                    <div className='lbl font s22 b black'>Recent Jobs</div>
                    <div className='job-blk flex'>
                        {
                            jobs.map((item,index) => (
                                <img key={index} src={item.img} className='item'/>
                            ))
                        }
                    </div>  
                </div>
            </div>
            <Footer /> 
        </React.Fragment>
    );
}

export default Careers;