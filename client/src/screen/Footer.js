import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import zuz from "../core/Toast";
import axios from "axios";
import Whatsapp from "../svg/Whatsapp";

function Footer(props) {
  const [firstNav, setfirstNav] = useState([
    { label: "About us", slug: "/about" },
    { label: "Careers", slug: "/careers" },
    { label: "Couriers", slug: "/couriers" },
    { label: "FAQ", slug: "/faq" },
    { label: "Privacy Policy", slug: "/privacy" },
  ]);

  const [secondNav, setSecondNav] = useState([
    { label: "Terms & Conditons", slug: "/terms-conditions" },
    { label: "Return Policy", slug: "/return-policy" },
    { label: "Delivery Policy", slug: "/delivery-policy" },
  ]);

  const [thirdNav, setThirdNav] = useState([
    { label: "Facebook", slug: "/" },
    { label: "Twitter", slug: "/" },
    { label: "Instagram", slug: "/" },
    { label: "WhatsApp", slug: "/" },
  ]);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [message, setmessage] = useState("");
  const sendemail = async () => {
    try {
      if (!name || !email || !number || !message) {
        return zuz.Toast.show({ html: `Input all necessary fields`, time: 5 });
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sendhelpemail`,
        {
          name,
          email,
          number,
          message,
        }
      );
      //console.log(res)
      if (res.data.status === "success") {
        zuz.Toast.show({ html: `${res.data.message}`, time: 5 });
        setname("");
        setemail("");
        setnumber("");
        setmessage("");
      }
    } catch (error) {
      if (error.response) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      } else {
        zuz.Toast.show({ html: `Network error`, time: 5 });
      }
    }
  };

  const date = new Date();

  return (
    <React.Fragment>
      {props.match.path == "/" ? (
        <div className="hom-footer flex flex-col rel">
          <img src="/images/ftr-lit.png" className="lit-img" />
          <img src="/images/ftr-rit.svg" className="rit-img" />
          <div className="wrap wrapWidth flex">
            <div className="form flex flex-col">
              <div className="meta">
                <div className="label rfont s24 c000 b">Ask Us Anything!</div>
                <div className="font s14 c000">Any Question? Write Here!</div>
              </div>
              <div className="items flex flex-col aic">
                <input
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Name"
                  className="cleanbtn iput font s15 c333 anim"
                />
                <input
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Email"
                  className="cleanbtn iput font s15 c333 anim"
                />
                <input
                  onChange={(e) => setnumber(e.target.value)}
                  value={number}
                  type="text"
                  placeholder="Number"
                  className="cleanbtn iput font s15 c333 anim"
                />
                <textarea
                  onChange={(e) => setmessage(e.target.value)}
                  value={message}
                  type="text"
                  placeholder="Message"
                  className="cleanbtn iput area font s15 c333 anim"
                />
                <button
                  onClick={() => sendemail()}
                  className="cleanbtn btn rfont s15 b6 cfff flex aic anim"
                >
                  Send My Query
                  <img src="/images/ftr-snd.svg" className="ico" />
                </button>
              </div>
            </div>
          </div>
          <div
            className="cvr flex aic rel"
            style={{ background: "url(/images/ftr-wave.svg)" }}
          >
            <div className="wrapWidth flex aic">
              <div className="lit flex aic">
                <div className="logs flex flex-col">
                  <img src="/images/logo.svg" className="logo" />
                  <div className="links flex aic">
                    <Link
                      to="/about"
                      className="lin rfont s16 b3 cfff flex aic"
                    >
                      About&nbsp;&nbsp;&#124;&nbsp;&nbsp;
                    </Link>
                    <Link
                      to="/careers"
                      className="lin rfont s16 b3 cfff flex aic"
                    >
                      Careers&nbsp;&nbsp;&#124;&nbsp;
                    </Link>
                    <Link
                      to="/delivery-policy"
                      className="lin rfont s16 b3 cfff flex aic"
                    >
                      Delivery Policy&nbsp;&nbsp;&#124;&nbsp;&nbsp;
                    </Link>
                    <Link to="/faq" className="lin rfont s16 b3 cfff flex aic">
                      FAQ&nbsp;&nbsp;&#124;&nbsp;&nbsp;
                    </Link>
                    <Link
                      to="/privacy"
                      className="lin rfont s16 b3 cfff flex aic"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  {/*<div className='links flex aic'>
                                    <Link to="/terms-conditions" className='lin rfont s16 b3 cfff flex aic'>Terms & Conditons&nbsp;&nbsp;&#124;&nbsp;&nbsp;</Link>
                                    <Link to="/return-policy" className='lin `rfont s16 b3 cfff flex aic'>Return Policy&nbsp;&nbsp;&#124;&nbsp;&nbsp;</Link>
                                </div>*/}
                  <div className="meta flex aic">
                    <div className="item flex aic">
                      <div className="ico icon-mail s18 cfff" />
                      <div className="lb rfont s16 b3 cfff flex aic">
                        info@freshlay.com.pk
                      </div>
                    </div>
                    <div className="item flex aic">
                      <div className="ico icon-phone-call s18 cfff" />
                      <div className="lb rfont s16 b3 cfff flex aic">
                        +92 61-6210050
                      </div>
                    </div>
                    <div className="item flex aic">
                      <div className="ico icon-phone-call s18 cfff" />
                      <div className="lb rfont s16 b3 cfff flex aic">
                        +92 317-7660050
                      </div>
                    </div>
                  </div>
                  <div className="social flex aic">
                    <a
                      href="https://www.facebook.com/FreshlayOfficial/"
                      target="_blank"
                      className="item flex aic anim"
                    >
                      <div className="ico icon-facebook1" />
                    </a>
                    <a
                      href="https://twitter.com/freshlay"
                      target="_blank"
                      className="item flex aic anim"
                    >
                      <div className="ico icon-twitter1" />
                    </a>
                    <a
                      href="https://www.instagram.com/Freshlay.Official/"
                      target="_blank"
                      className="item flex aic anim"
                    >
                      <div className="ico icon-instagram1" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/freshlay/"
                      target="_blank"
                      className="item flex aic anim"
                    >
                      <div className="ico icon-linkedin" />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCJd1aKkwMxNjxZLLLe3dihQ"
                      target="_blank"
                      className="item flex aic anim"
                    >
                      <div className="ico icon-youtube-play" />
                    </a>
                    <a
                      href="https://api.whatsapp.com/send?phone=+92 317-7660050"
                      target="_blank"
                      className="item flex aic anim"
                    >
                      <Whatsapp />
                    </a>
                  </div>
                </div>
                {/*<div className='join flex flex-col aic'>
                                <div className='s24 b cfff'>join Us Now!</div>
                                <div className='tt s15 cfff'>Download Our App</div>
                                <div className='item flex aic'>
                                    <img src='/images/ftr-playstore.svg' className='ico' />
                                    <div className='lbl rfont s13 b6'><span className="font s3 s12">Download on the</span><br/>Google Play Store</div>
                                </div>
                                <div className='item flex aic'>
                                    <img src='/images/ftr-appstore.svg' className='ico' />
                                    <div className='lbl rfont s13 b6'><span  className="font s3 s12">Get it on</span><br/>App Store</div>
                                </div>
                            </div>*/}
              </div>
              <div className="rit">
                <img src="/images/apple.png" className="img" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="small-ftr flex aic">
          <div className="font s14 c777">{`© Freshlay ${date.getFullYear()} All rights reserved`}</div>
        </div>
      )}
    </React.Fragment>
  );
}

export default withRouter(Footer);
