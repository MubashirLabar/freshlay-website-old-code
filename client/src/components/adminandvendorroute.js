import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Noaccess from '../vendor/NoAccess';


const AdminAndVendorRoute = ({ component: Component, auth, ...rest }) => {
     const {loaded,isAuthenticated,user} = useSelector(state => state.authreducer)
     return ( 
        <Route {...rest} render={props => {
            if(loaded) {
             if(isAuthenticated)
             {
                if(isAuthenticated && user.rights.dashboard.read)
                {
                    const route = props.match.path.split('/')[1]
                    const userreadright = (user.rights[route])
                   
                 if(route)
                 {
                  if(userreadright ? userreadright.read : false)
                   {
                      return  (<Component {...props}/>) 
                   }
                   else
                   {
                       return <Noaccess />
                   }
                 }
                }
                else if (isAuthenticated && user.role === 'user')
                {
                  return <Noaccess />
                }
               
             }
             else 
             {
                return  <Redirect to={'/login'} />  
             }
            
            }
            } }  />
          )
};



export default AdminAndVendorRoute;
