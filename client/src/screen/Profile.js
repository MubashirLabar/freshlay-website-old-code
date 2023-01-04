import React, { useState, useEffect } from "react";

// Screen
import Header from "./Header";
import Footer from "./Footer";
import { Dialog } from "../core";
import { useSelector, useDispatch } from "react-redux";
import ShippingAddressForm from "./sub/ShippingAddressForm";
import zuz from "../core/Toast";
import { updatedata, updatepassword, uploadpic,updateaddressbook } from "../actions/profile";
import store from '../components/store';
import { Provider } from "react-redux";

function Profile(props) {
  const theuser = useSelector((state) => state.authreducer);
  const { loaded, user } = theuser;
  
  const [currentpassword, setcurrentpassword] = useState();
  const [newpassword, setnewpassword] = useState();
  const [confirmnewpassword, setconfirmnewpassword] = useState();
  useEffect(() => {
    document.title = "Profile";
  },[])
  const addressForm = () =>{
    Dialog({
        title: "Add New Address",
        content: <Provider store={store}>
                    <ShippingAddressForm/>
                </Provider>,
    })  
  }

  const editaddressForm = (item) => {
    Dialog({
      title: "Edit Address",
      content: <Provider store={store}>
                  <ShippingAddressForm item={item}/>
               </Provider>
    });
  };

  const deleteaddressForm = (id) => {
 const  thedata = {
      deleteid : id
    }
     dispatch(updateaddressbook(user,thedata))
  }

  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [phoneno, setphone] = useState();
  const [cnic, setcnic] = useState();

  const dispatch = useDispatch();
  //  console.log(phoneno)
  useEffect(() => {
    if (user) {
      setusername(user.username);
      setemail(user.email);
      setphone(user.phoneno);
      setcnic(user.cnic);
    }
  }, [user]);
  const updateinfo = () => {
    //let mycnicRegExp = new RegExp(/\d{5}-\d{7}-\d/);
    //let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username == null) {
      zuz.Toast.show({ html: "Enter a username", time: 5 });
    } else if (username.length < 3 || username.length > 20) {
      zuz.Toast.show({
        html: "Username length should be between 4 to 20",
        time: 5,
      });
    } else if (email == null && phoneno == null) {
      zuz.Toast.show({ html: "Enter your email Address or phone no", time: 5 });
    } else {
      const body = { username, email, phoneno, cnic };
      dispatch(updatedata(body));
    }
    
  };

  const updatemypassword = () => {
    if (!confirmnewpassword || !newpassword || !currentpassword) {
      zuz.Toast.show({
        html: "Please input all field to update your password",
        time: 5,
      });
    } else if (confirmnewpassword !== newpassword) {
      zuz.Toast.show({
        html: "Your new password fields did'nt matched",
        time: 5,
      });
    } else {
      dispatch(updatepassword(currentpassword, newpassword));
    }
  };

  const dropme = (e) => {
    dispatch(uploadpic(e.target.files[0]));
  };
  return (
    <React.Fragment>
      <Header />
      {loaded ? (
        <div className="profile-page flex wrapWidth">
          {/* Profile Sidebar */}
          <div className="side-bar flex flex-col">
            <div className="block flex flex-col">
              <div className="user flex flex-col aic">
                <div className="dp rel">
                  <img
                    className="img"
                    src={`${process.env.REACT_APP_END_URL}${user.media}`}
                  />
                  <input
                    type="file"
                    onChange={(e) => dropme(e)}
                    className="hide-element abs"
                    id="_file_input"
                  />
                  <button onClick={() =>{document.getElementById("_file_input").click()}} className="cleanbtn btn abs s18 anim icon-camera"/>
                </div>
                {/*<div className="txt fontl s16 b6 black">{username}</div>*/}
                {/*<div className="tx fontl s14 c777">{user.address}</div>*/}
              </div>
              <div className="meta flex flex-col">
                <div className="item flex aic">
                  <div className="lbl fontl s15 b5 c333">Username:</div>
                  <div className="txt fontl s15 c333">{user.username}</div>
                </div>
                { user.email &&
                <div className="item flex aic">
                  <div className="lbl fontl s15 b5 c333">Email:</div>
                  <div className="txt fontl s15 c333">{user.email}</div>
                </div>
                }
                 { user.phoneno &&
                <div className="item flex aic">
                  <div className="lbl fontl s15 b5 c333">Phone No:</div>
                  <div className="txt fontl s15 c333">{user.phoneno}</div>
                </div>
                 }
                 { user.cnic &&
                <div className="item flex aic">
                  <div className="lbl fontl s15 b5 c333">CNIC:</div>
                  <div className="txt fontl s15 c333">{user.cnic}</div>  
                </div>
                 } 
                 {/* Wallet & refercode*/}
                 
                <div className="item flex aic">
                  <div className="lbl fontl s15 b5 c333">Refercode:</div>
                  <div className="txt fontl s15 c333">{user.refercode}</div>  
                </div>
                <div className="item flex aic">
                  <div className="lbl fontl s15 b5 c333">Wallet balance:</div>
                  <div className="txt fontl s16 b6 c333">{user.wallet}</div>  
                </div>
                  
              </div>

            </div>
          </div>
          <div className="content flex flex-col">
            {/* Personal Info Block */}
            <div className="block flex flex-col">
              <div className="title top font b6 s20 black">Personal Info</div>
              <div className="form flex flex-col">
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333">User Name</div>
                  <input
                    type="text"
                    value={username}
                    className="cleanbtn iput fontl s15 c333 anim"
                    id="myusername"
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333">Email</div>
                  <input
                    type="text"
                    value={email}
                    className="cleanbtn iput fontl s15 c333 anim"
                    id="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333">Phone no.</div>
                  <input
                    type="number"
                    value={phoneno}
                    className="cleanbtn iput fontl s15 c333 anim"
                    id="phoneno"
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333">CNIC</div>
                  <input
                    type="text"
                    value={cnic}
                    className="cleanbtn iput fontl s15 c333 anim"
                    id="cnic"
                    onChange={(e) => setcnic(e.target.value)}
                  />
                </div>

                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333" />
                  <button
                    className="button btn iput font s16 b6 anim"
                    onClick={() => updateinfo()}
                  >
                    Save Change
                  </button>
                </div>
              </div>
            </div>

            {/* Address Book */}
            <div className="block flex flex-col">
              <div className="title b flex aic">
                <div className="adr-tit font b6 s20 black">Address Book</div>
                <button
                  className="button new fontl s15 flex aic anim"
                  onClick={() => addressForm()}
                >
                  <span className="icon-plus s16" />
                  &nbsp;Add New
                </button>
              </div>
              <div className="address-blk flex flex-wrap">
                {user.addressbook
                  //.filter((x) => x.block == "address")
                  .map((item) => (
                    <div className="item flex flex-col">
                      <div className="txt fontl s16 c333">{item.name}</div>
                      <div className="txt fontl s16 c333">{item.streetaddress}</div>
                      <div className="txt fontl s15 c333">{item.cellphone}</div>
                    <div className="txt fontl s15 c333">{item.coordinateaddress}</div>
                      <div className="actions flex aic">
                        <button className="btn cleanbtn icon-edit s28" onClick={() =>editaddressForm(item)}/>
                        <button className="btn cleanbtn icon-close s28" onClick={() => deleteaddressForm(item._id)}/>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Personal Info Block */}
            <div className="block flex flex-col">
              <div className="title c font b6 s20 black">Change Password</div>
              <div className="form flex flex-col">
                {/*profile.filter(x=> x.block == "password").map(item=>(
                                    <div className="item flex aic">
                                        <div className="lbl fontl s16 b6 c333">{item.label}</div>
                                        <input type={item.type} value={item.value} className="cleanbtn iput fontl s15 c333 anim"/>                                                  
                                    </div>
                                )) */}
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333">Current password</div>
                  <input
                    type="password"
                    value={currentpassword}
                    onChange={(e) => setcurrentpassword(e.target.value)}
                    className="cleanbtn iput fontl s15 c333 anim"
                  />
                </div>
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333">New password</div>
                  <input
                    type="password"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                    className="cleanbtn iput fontl s15 c333 anim"
                  />
                </div>
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333">Confirm password</div>
                  <input
                    type="password"
                    value={confirmnewpassword}
                    onChange={(e) => setconfirmnewpassword(e.target.value)}
                    className="cleanbtn iput fontl s15 c333 anim"
                  />
                </div>
                <div className="item flex aic">
                  <div className="lbl fontl s16 b6 c333" />
                  <button
                    onClick={() => updatemypassword()}
                    className="button btn iput font s16 b6 anim"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default Profile;
