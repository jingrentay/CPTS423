import React from 'react'
import "../Projects/ProjectHomePage";
import ProjectHomePage from '../Projects/ProjectHomePage';
import ProjectForm from "../Projects/ProjectForm";
import FeverChart from '../../components/FeverChart';

export default function Detailpage(){
   
    
    
    return(
         <>
       
         <div className="detail_1"> 
         <ProjectForm/> 
         
         </div>
        
         <div className='details_2'>
                  
          <h1> Fever Chart </h1>
          <p><FeverChart/></p>
          </div>
 
      
 
 
         </>
 
 
 
 
 
     );
 }

