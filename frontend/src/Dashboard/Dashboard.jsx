import { useNavigate } from "react-router-dom";
import react from 'react';
import "./Dashboard.css";;

export default function Dashboard() {
  let nevigate = useNavigate();

  return (
    <>
    
        <div className="sidebar-main-div">
            <ol className='ol-list'>
              <hr/>
                <li onClick={() => nevigate('/admin/dashboard/catagory')} className='main-list'>catagory</li><hr/>
                <li onClick={() => nevigate('/admin/dashboard/vendor')} className='main-list'>vendor</li><hr/>
            </ol>
        </div>

    </>
  )
}
