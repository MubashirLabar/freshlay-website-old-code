import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => {
     const {loaded,isAuthenticated,user,dashboardlogined} = useSelector(state => state.authreducer)

return ( <Route {...rest} render={props => {
  
    if(loaded) {
            if(isAuthenticated)
             {
                if(dashboardlogined)
                {
                    return   <Redirect to={'/dashboard'} />;
                }
                else 
                {
                    return  (<Component {...props}/>) 
                }
             }
            else 
             {
               return <Redirect to={'/login'} />  
             }
    
        }
    } 
} 
 />
  )
};



export default AdminPrivateRoute;
