import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => {
     const {loaded,isAuthenticated,user} = useSelector(state => state.authreducer)

return ( <Route {...rest} render={props => {
    if(loaded) {
     //console.log('from protect router', isAuthenticated, user.role)
     if(isAuthenticated)
             {
                if(isAuthenticated && user.rights.dashboard.read)
                {
                return  (<Component {...props}/>)
                }
                else 
                {
                return   <Redirect to={'/dashboard'} />;
                }
             }
             else 
             {
               return <Redirect to={'/login'} />  
             }
    
    }
    } }  />
  )
};



export default AdminPrivateRoute;
