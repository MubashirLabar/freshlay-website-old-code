const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const protectmiddleware = require("../middleware/protect");
const { check, validationResult } = require("express-validator");
const Settings = require("../models/Settings");

const mailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const sharp = require("sharp");
const { google } = require("googleapis");
const axios = require("axios");

const CLIENT_ID =
  "724779593871-mfbuamnh9hceu7tujshqjar1lrjpb5qm.apps.googleusercontent.com";
const CLIENT_SECRET = "mxC7VOBUO4_hsPTHmxLxmxeT";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04IzFrZDu8RmXCgYIARAAGAQSNwF-L9IraMYzX1kKh-WWtp0MchgO3ehe6IhW22_m-X_vrtxO4govIFVmB5GyqXqUcuu6JkpUyco";
//console.log('client id',CLIENT_ID)

//twilio

// please check if you returning any unnecessary field to front end

// stutus codes
//200 OK
//201 Created
// 401 Unauthorized
//400 Bad Request
// 404 Not Found
//408 Request Timeout
// 422 Unprocessable Entity
// 964 Create User

// controllers line no.
//786    addtowishlist
//100 facebook controller signup
// 160 facebookControllersignin
// 204 resetpasswithmessage
// 269 changepassword
// 315 confirmresetlink
// 373 confirmcode
// 436 resetpasswordwithmessageconfirm

function randomgenerator() {
  return Math.round(new Date().valueOf() * Math.random()) + "";
}
const hashedpass = async (random) => {
  return await bcrypt.hash(random, 12);
};

const signtoken = (id) => {
  // 60 * 60 = 3600 1h
  return jwt.sign(
    { id },
    process.env.myjwt42,
    // for message 10 minutes
    { expiresIn: "2000d" }
  );
};

var randomFixedInteger = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() *
        (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};


exports.addnotification = async (req, res) => {
  try {
    let user;
    if (req.body.data.userid === "admin") {
      user = await User.findOne({ role: "admin" });
    } else {
      user = await User.findById(req.body.data.userid);
    }
    if (user.notifications) {
      const notification = user.notifications;
      notification.unshift(req.body);
      user.notifications = notification;
    } else {
      user.notifications = [req.body];
    }
    await user.save();
    //console.log()
    res.status(200).json({
      status: "success",
      notifications: user.notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Failed to save notification",
    });
  }
};

exports.removenotification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const newnotification = user.notifications.filter(
      (item) => item._id.toString() !== req.params.id.toString()
    );
    user.notifications = newnotification;
    await user.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Failed to remove notification",
    });
  }
};

exports.checkrefer = async (req, res) => {
  try {
    console.log(req.body)
    const foundeduser = await User.findOne({refercode : req.body.refercode});
    //console.log(foundeduser)
    if(foundeduser) {
      res.status(200).json({
        status: "success",
      });
    }
    else {
      res.status(200).json({
        status: "not founded",
      });
    }
  } catch (error) {
    return res.status(422).json({
      errors: "Failed to remove notification",
    });
  }
};

exports.facebookControllersignup = (req, res) => {
  console.log("FACEBOOK LOGIN REQ BODY", req.body);
  const { userID, accessToken } = req.body;
  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(async (response) => {
      const { email, name } = response;
      User.findOne({ email }).exec(async (err, user) => {
        if (user) {
          return res.status(422).json({
            errors:
              "User with this facebook id is already exist please sign in with facebook",
          });
        } else {
          let password = email + process.env.myjwt42;
          console.log(password);
          password = await bcrypt.hash(password, 12);
          const recent = await User.find().limit(1).sort({ $natural: -1 });
          let user_id;
          if (recent.length === 0) {
            user_id = 1;
          } else {
            const found_id = recent[0].user_id.split("-");
            user_id = Number(found_id[1]) + 1;
            user_id = `UID-${user_id}`;
          }
          const refercode = name.split(" ")[0] + randomFixedInteger(4)
          user = new User({ username: name, email, password, user_id,refercode });
          user.save(async (err, data) => {
            if (err) {
              console.log("ERROR FACEBOOK SIGN UP ON USER SAVE", err);
              return res.status(400).json({
                errors: "User signup failed with Facebook",
              });
            }

            const thetoken = await signtoken(user._id);
            const { email, name } = data;
            return res.json({
              token: thetoken,
              user: {
                email,
                username: name,
                //role
              },
            });
          });
        }
      });
    })
    .catch((error) => {
      res.json({
        error: "Facebook Signup failed. Try later",
      });
    });
};

exports.facebookControllersignin = (req, res) => {
  console.log("FACEBOOK LOGIN REQ BODY", req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      if (email) {
        User.findOne({ email }).exec(async (err, user) => {
          if (!user) {
            return res.status(422).json({
              errors:
                "User not found with this Facebook id please signup with Facebook",
            });
          } else {
            const thetoken = await signtoken(user._id);
            const { email, name } = user;
            return res.json({
              token: thetoken,
              user: {
                email,
                username: name,
                //  role
              },
            });
          }
        });
      } else {
        res.status(400).json({
          errors: "Facebook login failed. Try later",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        errors: "Facebook login failed. Try later",
      });
    });
};
/*********************** */
exports.resetpasswithmessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  }
  const phoneno = parseInt(req.body.phoneno);
  let theuser = await User.findOne({ phoneno });
  if (!theuser) {
    return res.status(422).json({
      errors: "Account not found with this phoneno",
    });
  }

  const result = await Settings.find();

  let randomnum = randomFixedInteger(result[0].phoneverifydigit);
  bcrypt.hash(`${randomnum}`, 12).then(async function (hash) {
    // Store hash in your password DB.
    const thetoken = await jwt.sign({ hash }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "5m",
    });
    await User.findOneAndUpdate(
      { phoneno: req.body.phoneno },
      {
        resetpassmessagetoken: thetoken,
      }
    );
    if (theuser.phoneno) {
      try {
        const response = await axios.post(
          `http://smartsms.pk/plain?api_token=${process.env.smartsmsapitoken}&api_secret=${process.env.smartsmsapi_secret}&to=92${theuser.phoneno}&from=Zeoel&message=Please enter these digits ${randomnum}`
        );
        //smartsms.pk/plain?api_token=7948b052ef3d03403518ff6fc52c81a2dae7e805c34f8e1df9b4fa055b00&api_secret=7948b052ef3d03403518ff6fc52c81a2dae7e805c34f8e1df9b4fa055CYY&to=923069595997&from=Zeoel&message=Hello there ahad raza
        http: console.log(response);
        if (response.status === 200) {
          res.status(200).json({
            status: "success",
            message:
              "Reset message has been sended, Code is valid for 5 minutes",
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(422).json({
          errors: "Error in server, cant connect with service",
        });
      }
    }
    //  hashed = hash
  });
};
exports.changepassword = async (req, res) => {
  // user is going to update is his info also username check if username already exist
  const user = req.user.id;
  const { password } = req.body;
  const theuser = await User.findById(req.user.id);
  if (theuser) {
    try {
      let npassword = await bcrypt.hash(password, 12);
      theuser.password = npassword;
      theuser.randompassgenerated = false;
      await theuser.save();
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({
        errors: "Error while updating password",
      });
    }
  } else {
    return res.status(422).json({
      errors: "Your Token is expired,please repeat the process",
    });
  }
};

exports.confirmresetlink = async (req, res) => {
  try {
    let theuser = await User.findOne({ resetemailPasswordLink: req.body.link });
    if (!theuser) {
      return res.status(422).json({
        errors: "Invalid link",
      });
    }
    try {
      decoded = jwt.verify(
        theuser.resetemailPasswordLink,
        process.env.JWT_RESET_PASSWORD
      );
    } catch (error) {
      return res.status(422).json({
        errors: "Your link is expire or invalid, please resend link.",
      });
    }
    if (decoded) {
      const id = theuser.id;
      const thetoken = jwt.sign({ id }, process.env.myjwt42, {
        expiresIn: "5m",
      });

      return res.status(200).json({
        status: "success",
        reset: true,
        data: {
          resettoken: thetoken,
        },
      });
    } else {
      return res.status(422).json({
        errors: "Your Code was not correct.Retry ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.confirmcode = async (req, res) => {
  try {
    const phoneno = parseInt(req.body.phone);
    let decoded;
    let theuser;
    // number or email check in boolean
    if (req.body.number.number) {
      theuser = await User.findOne({ phoneno: req.body.phone });
    } else if (req.body.email.email) {
      theuser = await User.findOne({ email: req.body.phone });
    }
    if (!theuser) {
      return res.status(422).json({
        errors: "Account not found with this phoneno",
      });
    }
    try {
      decoded = jwt.verify(
        theuser.resetpassmessagetoken,
        process.env.JWT_RESET_PASSWORD
      );
    } catch (error) {
      return res.status(422).json({
        errors: "Your code is expire or invalid, please resend code.",
      });
    }
    let result = await bcrypt.compare(req.body.code, decoded.hash);
    if (result) {
      if (req.body.reset) {
        const id = theuser.id;
        const thetoken = jwt.sign({ id }, process.env.myjwt42, {
          expiresIn: "5m",
        });

        return res.status(200).json({
          status: "success",
          reset: true,
          data: {
            resettoken: thetoken,
          },
        });
      }
      if (req.body.number.number) {
        await User.findOneAndUpdate(
          { phoneno: req.body.phone },
          { numberverified: true }
        );
      } else if (req.body.email.email) {
        await User.findOneAndUpdate(
          { email: req.body.phone },
          { confirmemail: true }
        );
      }
      const thetoken = await signtoken(theuser._id);
      res.status(200).json({
        status: "success",
        token: thetoken,
      });
    } else {
      return res.status(422).json({
        errors: "Your Code was not correct.Retry ",
      });
    }
  } catch (error) {
    return res.status(422).json({
      errors: "Error",
    });
  }
};

// when user enter number verify the number enterd from database
/*exports.resetpasswordwithmessageconfirm = async () => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  }
  let theuser = await User.findOne({ phoneno: req.body.phoneno });
  if (!theuser) {
    return res.status(422).json({
      errors: "Account not found with this phoneno",
    });
  }
  //console.log(theuser)

  // just more secure to store in  a token
  // not storing encrypted code, storing encrypted code in a token
  const decoded = jwt.verify(
    theuser.resetpassmessagetoken,
    process.env.JWT_RESET_PASSWORD
  );

  console.log(decoded);
  // const result = await bcrypt.compare(req.body.password,theuser.password);

  /*  if(theuser.phoneno)
   {
      try {
         const response   = await  client.messages.create({
            to: `+${theuser.phoneno}`,
            
            from: '+18316619806',
            body : `Please enter these digits to reset your password ${random}`
          })
          //.then(messages => console.log(messages.sid));
         console.log(response)  
         if(response.status === 'queued')
         {
      res.status(200).json({
         message : "Reset message has been sended, Code is valid for 5 minutes"
      })
         }       
      } catch (error) {
         console.log(error)
      }

     
   }*/
/*
}; */

// change pass below
//also allow less secure app in gmail
/********************* */
exports.forgotPasswordwithemail = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  let theuser = await User.findOne({ email });
  if (!theuser) {
    return res.status(422).json({
      errors: "Account not found with this Email",
    });
  }
  const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      async (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            errors: "User with that email does not exist",
          });
        }
        const access_token = await OAuth2Client.getAccessToken();
        const result = await Settings.find();
        let randomnum = randomFixedInteger(result[0].phoneverifydigit);
        bcrypt.hash(`${randomnum}`, 12).then(async function (hash) {
          const thetoken = await jwt.sign(
            { hash },
            process.env.JWT_RESET_PASSWORD,
            { expiresIn: "5m" }
          );
          await User.findOneAndUpdate(
            { email: req.body.email },
            {
              resetpassmessagetoken: thetoken,
            }
          );

          try {
            const username = theuser.username.split(" ")[1];
            let mail = {
              from: `ahad@freshlo.co`,
              //to : `${req.body.email}`,
              to: `${email}`,
              subject: "Password Reset Verification Code",
              // title,text,url , button-text,
              html: await emailtemplate(
                "You have requested to reset your password",
                "A request has been received to change the password for your Website account.This Code is valid for 5 minutes.",
                `${randomnum}`,
                username
              ),
            };
            const smtpTransport = mailer.createTransport({
              host: "smtp.hostinger.com",
              port: 587,
              secure: false, // upgrade later with STARTTLS
              auth: {
                user: "ahad@freshlo.co",
                pass: "Supermen@1122",
              },
            });
            /*const smtpTransport = mailer.createTransport({
          service: "Gmail",
          auth: {
           type : "OAuth2",
           user : 'imranahad009@gmail.com',
           clientId : CLIENT_ID,
           clientSecret : CLIENT_SECRET,
           refreshToken : REFRESH_TOKEN,
           accessToken : access_token
          },
        }); */

            smtpTransport.sendMail(mail, function (err) {
              if (err) {
                console.log(err);
                res.status(404).json({
                  errors: "could'nt send email",
                });
              } else {
                console.log("email sended");
                res.status(201).json({
                  status: "success",
                  message: "Email sended, Please Check your emails",
                });
              }
            });
          } catch (error) {
            console.log(error);
            return res.status(422).json({
              errors: "Error in server, cant connect with service",
            });
          }

          //  hashed = hash
        });
      }
    );
  }
};

exports.sendCodeForVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  let theuser = await User.findOne({ email });
  if (!theuser) {
    return res.status(422).json({
      errors: "Account not found with this Email",
    });
  }

  const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      async (err, user) => {
        // we get error and user in callback function
        if (err || !user) {
          return res.status(400).json({
            errors: "User with that email does not exist",
          });
        }
        const access_token = await OAuth2Client.getAccessToken();

        const result = await Settings.find();
        let randomnum = randomFixedInteger(result[0].phoneverifydigit);
        bcrypt.hash(`${randomnum}`, 12).then(async function (hash) {
          const thetoken = await jwt.sign(
            { hash },
            process.env.JWT_RESET_PASSWORD,
            // for message 10 minutes
            { expiresIn: "5m" }
          );
          await User.findOneAndUpdate(
            { email: req.body.email },
            {
              resetpassmessagetoken: thetoken,
            }
          );

          try {
            console.log(randomnum);
            const username = theuser.username.split(" ")[1];
            let mail = {
              from: `ahad@freshlo.co`,
              //to : `${req.body.email}`,
              to: `${email}`,
              subject: "Email verification code",
              // title,text,url , button-text,
              html: await emailtemplate(
                "Here is your login verification code:",
                `Thanks for signing up! We just need to verify your email address to complete setting up your account.
          This Code is valid for 5 minutes.`,
                `${randomnum}`,
                username
              ),
            };
            // const smtpTransport = mailer.createTransport({
            //   service: "Gmail",
            //   auth: {
            //     type: "OAuth2",
            //     user: "imranahad009@gmail.com",
            //     clientId: CLIENT_ID,
            //     clientSecret: CLIENT_SECRET,
            //     refreshToken: REFRESH_TOKEN,
            //     accessToken: access_token,
            //   },
            // });
         
            // let mail = {
            //   from: `ahad@freshlo.co`,
            //   //to : `${req.body.email}`,
            //   to: `${email}`,
            //   subject: "Password Reset Verification Code",
            //   // title,text,url , button-text,
            //   html: await emailtemplate(
            //     "You have requested to reset your password",
            //     "A request has been received to change the password for your Website account.This Code is valid for 5 minutes.",
            //     `${randomnum}`,
            //     username
            //   ),
            // };
            const smtpTransport = mailer.createTransport({
              host: "smtp.hostinger.com",
              port: 587,
              secure: false, // upgrade later with STARTTLS
              auth: {
                user: "ahad@freshlo.co",
                pass: "Supermen@1122",
              },
            });
            smtpTransport.sendMail(mail, function (err) {
              if (err) {
                console.log(err);
                res.status(404).json({
                  errors: "could'nt send email",
                });
              } else {
                console.log("email sended");
                res.status(201).json({
                  status: "success",
                  message: "Email sended, Please Check your emails",
                });
              }
            });
          } catch (error) {
            console.log(error);
            return res.status(422).json({
              errors: "Error in server, cant connect with service",
            });
          }
        });
      }
    );
  }
};

const googleclient = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google Login
exports.googleControllersignup = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(422).json({
      errors: "You must have an token",
    });
  }
  googleclient
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(async (response) => {
      console.log("GOOGLE LOGIN RESPONSE", response);
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        const theuser = await User.findOne({ email });
        if (theuser) {
          return res.status(422).json({
            errors: "User with this email already exist please sign In",
          });
        } else {
          let password = email + process.env.myjwt42;
          console.log(password);
          password = await bcrypt.hash(password, 12);
          const recent = await User.find().limit(1).sort({ $natural: -1 });
          const refercode = name.split(" ")[0] + randomFixedInteger(4)
          let user_id;
          if (recent.length === 0) {
            user_id = 1;
          } else {
            const found_id = recent[0].user_id.split("-");
            user_id = Number(found_id[1]) + 1;
            user_id = `UID-${user_id}`;
          }

          user = new User({ username: name, email, password, user_id,refercode });
          user.save(async (err, data) => {
            if (err) {
              console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
              return res.status(400).json({
                errors: "User signup failed with google",
              });
            }

            const thetoken = await signtoken(user._id);
            const { email, name } = data;
            return res.json({
              token: thetoken,
              user: {
                email,
                username: name,
                //role
              },
            });
          });
        }
      } else {
        return res.status(400).json({
          errors: "Google login failed. Try again",
        });
      }
    });
};

exports.googleControllersignin = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(422).json({
      errors: "You must have an token",
    });
  }
  googleclient
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(async (response) => {
      console.log("GOOGLE LOGIN RESPONSE", response);
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        const theuser = await User.findOne({ email });
        if (!theuser) {
          return res.status(422).json({
            errors: "User not found with this email please signup",
          });
        }
        User.findOne({ email }).exec(async (err, user) => {
          if (user) {
            const thetoken = await signtoken(user._id);
            const { _id, email, name, role } = user;
            return res.json({
              token: thetoken,
              user: {
                email,
                username: name,
                //  role
              },
            });
          }
        });
      } else {
        return res.status(400).json({
          errors: "Google login failed. Try again",
        });
      }
    });
};

exports.getuser = async (req, res, next) => {
  try {
    // console.log(req.user)
    const theuser = await User.findById(req.user.id)
      .select(
        "role username phoneno favourite media cnic email addressbook favourite rights fullname notifications ordercount refercode wallet"
      )
      .populate("favourite");
    //  console.log(theuser);
    if (!theuser) {
      res.status(200).json({
        verified: false,
      });
    } else {
      res.status(200).json({
        success: "true",
        data: theuser,
        verified: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error while getting your info");
  }
};

exports.addtowishlist = async (req, res) => {
  try {
    const theuser = await User.findById(req.user.id);
    let favourites = theuser.favourite;
    if (theuser.favourite.length == 0) {
      favourites.push(req.body.id);
    } else if (theuser.favourite.length != 0) {
      const check = theuser.favourite.map((item) => item == req.body.id);
      if (check.includes(true)) {
        // deleting id
        favourites = favourites.filter((item) => item != req.body.id);
      } else {
        favourites.push(req.body.id);
      }
    }
    theuser.favourite = favourites;
    await theuser.save();
  } catch (error) {
    return res.status(422).json({
      errors: "Error adding to wishlists",
    });
  }
};

exports.getwishlist = async (req, res) => {
  try {
    const theuser = await User.findById(req.user.id).select("favourite");
    res.status(200).json({
      success: "true",
      data: theuser,
      // verified : true
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting wishlists",
    });
  }
};

exports.loginuser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  }
  let { emailphone, password } = req.body;
  let email;
  let phoneno;
  let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailphone.match(themail)) {
    email = emailphone;
  } else if (emailphone.match(/^[0-9]+$/)) {
    if (!(emailphone.length === 10)) {
      return res.status(422).json({
        errors: "Phone no length should be 10",
      });
    } else {
      phoneno = emailphone;
    }
  }

  try {
    let theuser;
    if (email) {
      theuser = await User.findOne({ email: email });
      if (!theuser) {
        return res.status(422).json({
          errors: "User not found with this email",
        });
      } else if (!theuser.confirmemail) {
        return res.status(201).json({
          emailverify: {
            verify: false,
          },
        });
      }
    } else if (phoneno) {
      theuser = await User.findOne({ phoneno: phoneno });
      if (!theuser) {
        return res.status(422).json({
          errors: "User not found with this Number",
        });
      } else if (!theuser.numberverified) {
        if (theuser.randompassgenerated) {
          const result = await bcrypt.compare(
            req.body.password,
            theuser.password
          );
          if (!result) {
            return res.status(422).json({
              errors: "Incorrect credentials",
            });
          }
          theuser = await User.findOneAndUpdate(
            { phoneno: phoneno },
            { randompassgenerated: false, numberverified: true }
          );
        } else {
          return res.status(201).json({
            numberverify: {
              verify: false,
            },
          });
        }
      }
    } else {
      return res.status(422).json({
        errors: "Please input correct credentials",
      });
    }

    const result = await bcrypt.compare(req.body.password, theuser.password);
    if (!result) {
      return res.status(422).json({
        errors: "Incorrect credentials",
      });
    }
    // console.log(`password compared: ${result}`)
    const thetoken = await signtoken(theuser._id);
    return res.status(200).json({
      success: "true",
      data: {
        token: thetoken,
        userrole: theuser.role,
      },
    });
  } catch (error) {
    res.status(404).json({
      errors: "We cant login you, server error",
    });
  }
};
exports.createuser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
    //return;
  }
  let { emailphone, username, password } = req.body;
  let email;
  let phoneno;
  let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailphone.match(themail)) {
    email = emailphone;
  } else if (emailphone.match(/^[0-9]+$/)) {
    if (!(emailphone.length === 10)) {
      return res.status(422).json({
        errors: "Phone no length should be 10",
      });
    } else {
      phoneno = emailphone;
    }
  } else {
    return res.status(422).json({
      errors: "Please input correct email or phone number",
    });
  }
  try {
    let user;

    if (email) {
      user = await User.findOne({ email: email });
      if (user) {
        return res.status(422).json({
          errors: "User with this email is already exist",
        });
      }
    } else if (phoneno) {
      user = await User.findOne({ phoneno: phoneno });
      if (user) {
        return res.status(422).json({
          errors: "User with this phone no is already exist",
        });
      }
    }

    password = await bcrypt.hash(password, 12);
    let newuser;
    if (email) {
      const recent = await User.find().limit(1).sort({ $natural: -1 });
      let user_id;
      if (recent.length === 0) {
        user_id = "UID-1";
      } else {
        const found_id = recent[0].user_id.split("-");
        user_id = Number(found_id[1]) + 1;
        user_id = `UID-${user_id}`;
      }
      const refercode = username.split(" ")[0] + randomFixedInteger(4)
      newuser = await User.create({ email, username, password, user_id,refercode });
    } else if (phoneno) {
      const recent = await User.find().limit(1).sort({ $natural: -1 });
      let user_id;
      if (recent.length === 0) {
        user_id = "UID-1";
      } else {
        const found_id = recent[0].user_id.split("-");
        user_id = Number(found_id[1]) + 1;
        // console.log(user_id)
        user_id = `UID-${user_id}`;
      }
      const refercode = username.split(" ")[0] + randomFixedInteger(4)
      newuser = await User.create({ phoneno, username, password, user_id,refercode });
    }

    const thetoken = await signtoken(newuser._id);

    if (email) {
      return res.status(200).json({
        success: "true",
        body: {
          newuser,
          token: thetoken,
          email: true,
        },
      });
    } else if (phoneno) {
      return res.status(200).json({
        success: "true",
        body: {
          newuser,
          token: thetoken,
          phone: true,
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      errors: "Error while creating user",
    });
  }
};

exports.verifyemail = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_RESET_PASSWORD);
    const user = await User.findById(decoded.id);
    if (user) {
      await User.findByIdAndUpdate(decoded.id, { confirmemail: true });
      return res.status(200).json({
        success: "true",
      });
    }
  } catch (error) {
    res.status(404).json({
      errors: "Your token has been expired or Invalid, please verify again",
    });
  }
};

exports.sendlinkagain = async (req, res, next) => {
  const { email } = req.body;
  let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === null || email === undefined) {
    res.status(404).json({
      errors: "Your email should'nt be empty",
    });
  } else if (!email.match(themail)) {
    res.status(404).json({
      errors: "Enter a correct email or phoneno",
    });
  }
  const user = await User.find({ email });

  if (!user || user.length === 0) {
    res.status(422).json({
      errors: "No user found with email",
    });
  } else {
    const token = jwt.sign(
      {
        _id: user[0]._id,
      },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "5m",
      }
    );
    // save in process env?? but we should in db
    const OAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const theurl = process.env.CLIENT_URL;
    let mail = {
      from: `imranahad009@gmail.com`,
      //to : `${req.body.email}`,
      to: `${email}`,
      subject: "Zeoel Email verify link",
      html: await emailtemplate(
        "Email Verification",
        "To verify your email please click the button below.This Link is valid for 5 minutes.",
        `${theurl}/user/confirmemail/${token}`,
        "Reset Password"
      ),
    };
    const access_token = await OAuth2Client.getAccessToken();
    const smtpTransport = mailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: "imranahad009@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: access_token,
      },
    });
    smtpTransport.sendMail(mail, function (err) {
      if (err) {
        res.status(404).json({
          errors: "could'nt send email",
        });
      } else {
        res.status(201).json({
          status: "success",
          message: "Email sended, Please Check your emails",
        });
      }
    });
  }
};

exports.updateuser = async (req, res, next) => {
  try {
    let { email, phoneno, username, cnic } = req.body;
    const mycnicRegExp = new RegExp(/\d{5}-\d{7}-\d/);
    const themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email && !phoneno) {
      return res.status(422).json({
        errors: "Please input phoneno or email",
      });
    } else if (email && !email.match(themail)) {
      return res.status(422).json({
        errors: "Please input correct email",
      });
    } else if (phoneno && !(phoneno.toString().length === 10)) {
      return res.status(422).json({
        errors: "Phone no length should be 10",
      });
    } else if (!mycnicRegExp.test(cnic) && cnic) {
      return res.status(422).json({
        errors: "Please input a valid cnic",
      });
    }
    const user = req.user.id;
    const data = req.body;
    const userupdated = await User.findByIdAndUpdate(user, data, { new: true });
    return res.status(200).json({
      success: "true",
      userupdated,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error while updating user",
    });
  }
};

exports.updateaddressbook = async (req, res, next) => {
  try {
    const user = req.user.id;
    const data = req.body;
    console.log(req.body);
    //JSON.stringify(data);
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json({
        errors: "Some field are missings",
      });
    }
    const theuser = await User.findById(req.user.id);
    const oldaddressbook = theuser.addressbook;
    if (data.deleteid) {
      let updatebook = oldaddressbook.filter((val) => val._id != data.deleteid);
      theuser.addressbook = updatebook;
    } else if (data._id) {
      console.log("inside editing", oldaddressbook);
      let newaddressbook = oldaddressbook.map((x) =>
        x.id == data._id ? data : x
      );
      theuser.addressbook = newaddressbook;
    } else {
      oldaddressbook.push(data);
      theuser.addressbook = oldaddressbook;
    }
    await theuser.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error while updating address book",
    });
  }
};

exports.updatepassword = async (req, res) => {
  const user = req.user.id;
  const { currentpassword, newpassword } = req.body;
  const theuser = await User.findById(req.user.id);

  let result = await bcrypt.compare(currentpassword, theuser.password);
  if (result) {
    try {
      let npassword = await bcrypt.hash(newpassword, 12);
      theuser.password = npassword;
      let newuser = await theuser.save();
      res.status(200).json({
        status: "success",
        newuser,
      });
    } catch (error) {
      return res.status(422).json({
        errors: "Error while updating password",
      });
    }
  } else {
    return res.status(422).json({
      errors: "Please input correct password",
    });
  }
};

exports.saveUserPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(422).json({
      errors: "File not found",
    });
  }
  try {
    const myfilename = `users/user-${"1212dqwdqw"}-${Date.now()}.jpeg`;
    req.file.filename = myfilename;
    sharp(req.file.buffer)
      .resize(1500, 1500)
      // tofile is actually an address where we are saving
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`public/${myfilename}`);

    const theuser = await User.findById(req.user.id);
    theuser.media = myfilename;
    await theuser.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Server error cant save your image",
    });
  }
};

// nonlogined user
/*
exports.saveaddressnonlogined = async (req, res) => {
  console.log(req.body)
  try {
   const user = await User.findOne({ phoneno: Number(req.body.cellphone) });
   //const user2 = await User.findOne({ email: req.body.email });
           if(user)
          {
            if(user.numberverified)
            {
              const thetoken = await signtoken(user._id);
              return res.status(200).json({
                status: "success",
                thetoken
              });
            }
            else {
              var randomFixedInteger = function (length) {
                return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
              }
              let randompassword = randomFixedInteger(8)
              const password = await bcrypt.hash(randompassword.toString(), 12);
              const newuser = await User.findOneAndUpdate({phoneno :  Number(req.body.cellphone)}, {password})
              try {
                const res = await axios.post(`http://smartsms.pk/plain?api_token=${process.env.smartsmsapitoken}&api_secret=${process.env.smartsmsapi_secret}&to=92${newuser.phoneno}&from=Zeoel&message=Message from Freshlay! An account has been created with this phone number, Your password is ${randompassword}`)
                console.log(res)
              } catch (error) {
                console.log(error)
                return res.status(422).json({
                  errors: "Error while sending message",
                });
              }
            
              const thetoken = await signtoken(newuser._id);
              res.status(200).json({
                status: "success",
                thetoken
              });
            }
          }
          else {
            var randomFixedInteger = function (length) {
              return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
            }
            const recent = await User.find().limit(1).sort({ $natural: -1 });
            let user_id;
            if (recent.length === 0) {
              user_id = "UID-1";
            } else {
              const found_id = recent[0].user_id.split("-");
              user_id = Number(found_id[1]) + 1;
              // console.log(user_id)
              user_id = `UID-${user_id}`;
            }
            let randompassword = randomFixedInteger(8)
            const password = await bcrypt.hash(randompassword.toString(), 12);
            newuser = await User.create({ phoneno : Number(req.body.cellphone), 
              username : req.body.name, password, user_id,randompassgenerated : true });
            // sendmessage
            try {
              const res = await axios.post(`http://smartsms.pk/plain?api_token=${process.env.smartsmsapitoken}&api_secret=${process.env.smartsmsapi_secret}&to=92${newuser.phoneno}&from=Zeoel&message=Message from Freshlay! An account has been created with this phone number, Your password is ${randompassword}`)
              console.log(res)
            } catch (error) {
              console.log(error)
              return res.status(422).json({
                errors: "Error while sending message",
              });
            }
          
            const thetoken = await signtoken(newuser._id);
            res.status(200).json({
              status: "success",
              thetoken
            });
          }
  } catch (error) {  
    console.log(error)
    return res.status(422).json({
      errors: "Server error cant save your image",
    });
  }
};
*/

exports.sendhelpemail = async (req, res) => {
  const { email, number, name, message } = req.body;
  try {
    let mail = {
      from: `ahad@freshlo.co`,
      //to : `${req.body.email}`,
      to: `contact@freshlay.com.pk`,
      subject: "Message from user",
      // title,text,url , button-text,
      html: await contactustemplate(
        `${email}`,
        `${message}`,
        `${number}`,
        name
      ),
    };
    const smtpTransport = mailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "ahad@freshlo.co",
        pass: "Supermen@1122",
      },
    });
    smtpTransport.sendMail(mail, function (err) {
      if (err) {
        console.log(err);
        res.status(404).json({
          errors: "could'nt send email",
        });
      } else {
        console.log("email sended");
        res.status(201).json({
          status: "success",
          message: "Email has been sended",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Error in server, cant connect with service",
    });
  }

  //  hashed = hash
};

exports.getuserwithnumber = async (req, res) => {
  try {
     console.log(req.body)
     const user = await User.findOne({phoneno :req.body.cellphone})
     let userfounded;
     let ordercount;
     if(user){
       userfounded = true
       ordercount = user.ordercount
     }
     else {
       userfounded = false
     }
     res.status(201).json({
      status: "success",
      userfounded,
      ordercount
    });
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error while getting your info");
  }
};

const date = new Date();
const emailtemplate = async (title, text, verificationnumber, lastname) => {
  const result = await Settings.find();
  return `
    <html>
      <head>
      <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Roboto:wght@100;300;400;500;700&family=Varela+Round&display=swap"
      rel="stylesheet">
        <style> 
          .color{color: #57c702;}
          .email-tamplate{
            background: #f5f5f5;
            padding: 50px 0px; 
          } 
          .line{
            height: 10px;
            background: #57c702;
            width: 840px; 
            margin: 0 auto;
          }
          .tamp-blk{
            width: 760px; 
            margin: 0 auto;
            background: #fff;
            padding: 20px 40px;
            position: relative;
          }
          .logo{
            height: 62px;
            margin-bottom: 8px;
          }
          .title{
            font-family: "Open Sans", sans-serif;
            font-size: 26px;
            font-weight: 700;
            color: #020102;
          }
          .nam{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
            padding: 30px 0px 20px 0px;
          }
          .code-blk{
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
          }
          .txt{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .code{
            font-family: "Open Sans", sans-serif;
            font-size: 24px;
            font-weight: bold;
            color: #57c702;
            margin-top: 15px;
            letter-spacing: 0.5px;
          } 
          .msg{
            margin-top: 25px;
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .note{
            margin-top: 20px;
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .ftr{
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
            margin: 25px 0px 0px 0px;
          } 
          .log{width: 110px;} 
          .rits{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
            margin-bottom: 20px;
            margin-top: 2px;
          }
          .icons{
            display: flex;
            align-items: center; 
          }
          .ico{
            height: 35px;
            margin-right: 10px;
          }
          @media screen and (max-width: 1200px) {
            .tamp-blk{
              max-width: 650px;
            }
            .line{max-width: 730px;}
          }
          @media screen and (max-width: 768px) {
            .tamp-blk{max-width: 420px;}
            .line{max-width: 500px;}
          }
          @media screen and (max-width: 640px) {
            .tamp-blk{max-width: 320px;}
            .line{max-width: 400px;}
          }  
          @media screen and (max-width: 425px) {
            .tamp-blk{
              max-width: 266px;
              padding: 20px 12px;
            }  
            .line{max-width: 290px;}  
            .ftr{padding: 20px 18px;} 
          }
        </style>   
      </head>
      <body> 
        <div class="email-tamplate">
          <div class="line" />
          <div class='tamp-blk'>  
            <img src="https://exporterbd.com/site/logo.png" class="logo" />
            <div class="title">Your Verification Code</div>
            <div class="nam">${
              lastname ? `Hello ${lastname}` : "Hello Dear"
            } ,</div>
            <div class="code-blk">
                <div class="txt">${title}</div>
                <div class="code">${verificationnumber}</div>
            </div> 
            <div class="msg">Please make sure you never share this code with anyone.</div>
            <div class="note"><span class="b6 color">Note:</span>&nbsp;The code will expire in 5 minutes.</div>
            <div class="ftr">
                <img src="https://exporterbd.com/site/logo.png" class="log" />
                <div class="rits">© Freshlo ${date.getFullYear()} All rights reserved.</div>
                <div class="icons">
                    <a to="/"><img class="ico" src="https://exporterbd.com/site/logo.png/images/facebook.png" /></a>
                    <a to="/"><img class="ico" src="https://exporterbd.com/images/instagram.png" /></a>
                    <a to="/"><img class="ico" src="https://exporterbd.com/images/linkedin.png" /></a>
                    <a to="/"><img class="ico" src="https://exporterbd.com/images/twitter.png" /></a>
                </div>
            </div> 
          </div> 
        </div>
      </body>
    </html>
  `;
};

const contactustemplate = async (email, message, phoneno, name) => {
  const result = await Settings.find();
  return `
    <html>
      <head>
      <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Roboto:wght@100;300;400;500;700&family=Varela+Round&display=swap"
      rel="stylesheet">
        <style> 
          .color{color: #57c702;}
          .email-tamplate{
            background: #f5f5f5;
            padding: 50px 0px; 
          } 
          .line{
            height: 10px;
            background: #57c702;
            width: 840px; 
            margin: 0 auto;
          }
          .tamp-blk{
            width: 760px; 
            margin: 0 auto;
            background: #fff;
            padding: 20px 40px;
            position: relative;
          }
          .logo{
            height: 62px;
            margin-bottom: 8px;
          }
          .title{
            font-family: "Open Sans", sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: #020102;
          }
          .nam{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
            padding: 30px 0px 20px 0px;
          }
          .code-blk{
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
          }
          .txt{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .code{
            font-family: "Open Sans", sans-serif;
            font-size: 24px;
            font-weight: bold;
            color: #57c702;
            margin-top: 15px;
            letter-spacing: 0.5px;
          } 
          .msg{
            margin-top: 25px;
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .note{
            margin-top: 20px;
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .ftr{
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
            margin: 25px 0px 0px 0px;
          } 
          .log{width: 110px;} 
          .rits{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
            margin-bottom: 20px;
            margin-top: 2px;
          }
          .icons{
            display: flex;
            align-items: center; 
          }
          .ico{
            height: 35px;
            margin-right: 10px;
          }
          @media screen and (max-width: 1200px) {
            .tamp-blk{
              max-width: 650px;
            }
            .line{max-width: 730px;}
          }
          @media screen and (max-width: 768px) {
            .tamp-blk{max-width: 420px;}
            .line{max-width: 500px;}
          }
          @media screen and (max-width: 640px) {
            .tamp-blk{max-width: 320px;}
            .line{max-width: 400px;}
          }  
          @media screen and (max-width: 425px) {
            .tamp-blk{
              max-width: 266px;
              padding: 20px 12px;
            }  
            .line{max-width: 290px;}  
            .ftr{padding: 20px 18px;} 
          }
        </style>   
      </head>
      <body> 
        <div class="email-tamplate">
          <div class="line" />
          <div class='tamp-blk'>  
        
            <div class="title">Message from ${name}</div>
            <div class="txt">Email : ${email}</div>
            <div class="txt">Phone : ${phoneno}</div>
            <div class="code-blk">
            <div class="txt">${message}</div>
            </div> 
       
          </div> 
        </div>
      </body>
    </html>
  `;
};


