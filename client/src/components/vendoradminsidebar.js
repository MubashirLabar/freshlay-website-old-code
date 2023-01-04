import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Vendoradminsidebar = ({ component: Component, auth, ...rest }) => {
     const {loaded,isAuthenticated,user,dashboardlogined} = useSelector(state => state.authreducer)

     return ( 
        <Route {...rest} render={props => {
            if(loaded) {
                console.log('checkingg',isAuthenticated, user.rights.dashboard.read,dashboardlogined)
             if(isAuthenticated && props.location.pathname !== '/login' && props.location.pathname !== '/signup' && props.location.pathname !== '/404' && dashboardlogined)
             {
               
                if(isAuthenticated && user.rights.dashboard.read)
                {
                 return  (<Component {...props}/>) 
                }
                else
                {
                    return ''
                }
             }
             
            
            }
            } }  />
          )
};



export default Vendoradminsidebar;
