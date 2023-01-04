import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import zuz from "../core/Toast";
import axios from "axios";

function Blogs() {
  const [loading, setloading] = useState("");
  const [allblogs, setallblogs] = useState([]);
  useEffect(() => {
    const getblogs = async () => {
      try {
        setloading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/blog/getblogs`
        );
        //console.log(res)
        if (res.data.status === "success") {
          setallblogs(res.data.blogs);
          setloading(false);
        }
      } catch (error) {
        if (error.response) {
          {
            zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
          }
        }
      }
    };
    getblogs();
  }, []);

  const [blogs, setBlogs] = useState([
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-1.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-3.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-5.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-2.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-4.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-6.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-2.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-4.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-3.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-4.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-6.jpg",
      slug: "/blogs/detial",
    },
    {
      lbl: "How To Use Freshlay.com ? Why Freshlay Born?",
      category: "Fruits",
      img: "/images/blog-5.jpg",
      slug: "/blogs/detial",
    },
  ]);

  return (
    <React.Fragment>
      {loading && (
        <div className="cover flex aic abs fill">
          <img src={`/images/loader.svg`} className="img" />
        </div>
      )}
      <Header notBg={true} page="blog-p" />
      <div className="blogs-p">
        <div
          className="banner rel"
          style={{ background: `url(/images/blog-bg.jpg)` }}
        >
          <div className="cvr abs fill" />
          <div className="block flex flex-col abs">
            <div className="tag flex aic">
              <img className="ico" src="/images/crown.svg" />
              <span className="fontl s13 upc cfff">Featured Blog</span>
            </div>
            <div className="blk flex aic">
              <div
                className="img"
                style={{ background: "url(/images/blog-5.jpg" }}
              />
              <div className="meta flex flex-col">
                <div className="lbl fontl s20 b6 color">
                  Freshlay Introduction
                </div>
                <div className="txt fontl s18 c000">
                  How To Use <span className="b7 s22">Freshlay.com ?</span> Why
                  Freshlay Born?
                </div>
                {/* <Link
                  to={`/blogs/detail/1`}
                  className="color fontl s13 b7 flex aic"
                >
                  Read More&nbsp;
                  <span className="icon-chevron-right b6" />
                </Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="categories flex aic">
          <div className="lbl fontl s16 b7 on">All</div>
          <div className="lbl fontl s16 b7">Fruits</div>
          <div className="lbl fontl s16 b7">Vegetables</div>
          <div className="lbl fontl s16 b7">Grocery</div>
        </div>
        <div className="section flex aic">
          <div className="wrapWidth flex flex-col">
            <div className="title fontl s24 b4">&bull; Best Posts</div>
            <div className="wrap">
              {allblogs.map((item) => (
                <div className="block">
                  <div className="media">
                    <div
                      className="img anim"
                      style={{
                        background: `url(${process.env.REACT_APP_END_URL}${item.image2})`,
                      }}
                    />
                  </div>
                  <div className="meta flex flex-col">
                    <div className="cata fontl s14 b4">{`Category : ${item.category}`}</div>
                    <div className="lbl font s16 b5 c000">{item.title}</div>
                    <div className="btn flex aic">
                      <Link
                        to={`/blogs/detail/${item._id}`}
                        className="mor color fontl s13 b7 flex aic"
                      >
                        Read More&nbsp;
                        <span className="icon-chevron-right b6" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pagnation flex flex-col">
          <div className="wrapper wrapWidth flex flex-col aic">
            <div className="label fontl s16 c000 b6">
              Showing 1 – 12 of 386 Articles
            </div>
            <div className="block flex aic">
              <button className="btn cleanbtn icon-chevron-left s16 c000" />
              <div className="steps flex aic">
                <div className="lbl fontl s14 b5 color">2</div>
                <div className="lbl fontl s14 b5 color">3</div>
                <div className="lbl fontl s14 b5 color">4</div>
                <div className="lbl fontl s14 b5 color">5</div>
                <div className="lbl fontl s14 b5 color">6</div>
                <div className="lbl fontl s14 b5 color">7</div>
                <div className="lbl fontl s14 b5 color">8</div>
                <div className="lbl fontl s14 b5 color">9</div>
              </div>
              <button className="btn cleanbtn icon-chevron-right s16 c000" />
            </div>
            <div className="ftr">
              <div className="wrapWidth flex aic">
                <div className="lit">
                  <img src="/images/blog-ftr.svg" className="img" />
                </div>
                <div className="rit flex flex-col">
                  <div className="lbl fontl s18 b6 c000">
                    SUBSCRIBE TO OUR NEWSLETTER, IT'S FREE
                  </div>
                  <div className="sub flex aic">
                    <input className="cleanbtn iput fontl s15 c000" />
                    <button className="cleanbtn btn fontl s15 upc cfff">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rights flex aic">
              <div className="cpy fontl s14 b6 upc c000">
                &copy; 2021 Freshlay . All rights reserved. Terms of Service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Blogs;
