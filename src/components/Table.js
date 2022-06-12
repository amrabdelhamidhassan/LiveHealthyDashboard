import '../styles/components/Table.css'
import { useEffect, useState } from 'react';
import { Counter } from '../styles/stylingfunctions';
//Data 2D array
//Header 2D array
function Table({Data,Header,pagination=9}) {
    const [currentSelect,setCurrentSelect]=useState(1);
    const [selections,setSelections]=useState(Math.ceil(Data.length/pagination));
    const [selectionsArray,setSelectionsArray]=useState([])

    useEffect(() => {
      }, [currentSelect]);
    useEffect(() => {


        setSelections(Math.ceil(Data.length/pagination))
        const selectionsarr=[];
        for (let index = 1; index <= (selections); index++) {
            selectionsarr.push(index)
                   
        }       
        setSelectionsArray(selectionsarr) ;
        }, [Data]);
    const HeaderRow=(headerData)=>
    {
        return(
            headerData.map((header)=>{
                return(
                <div className='headerRow BackgroundMainThemeDark' >
                {header.map((title)=>{
                        return(
                            <div className='headerTitle'>
                                    {title}
                            </div>
                        )
                    
                })}
            </div>
                )

            })

        )
       
    }
    if(Data.length>0)
    {
        return(
            <div className='tableBody'>
                    {(selectionsArray.length>1) &&  <div className='paginationRow'>
                        <button className='paginationButton BackgroundMainThemeDark' onClick={()=>{const select=currentSelect;(select>1)? setCurrentSelect(parseInt(select)-1):console.log('')}}>
                            Previous
                        </button>      
                        <select className='paginationButton BackgroundMainThemeDark'  value={currentSelect}id="framework" onChange={(selected)=>{setCurrentSelect(selected.target.value)}}>
                            { selectionsArray.map((item)=>{
                            return(
                                    <option value={item}className='paginationButton'>
                                        {item}
                                    </option>
                                )
                                
                            })}
                        </select>     
                    <button className='paginationButton BackgroundMainThemeDark'  onClick={()=>{const select=currentSelect;(select<selections)? setCurrentSelect(parseInt(select)+1):console.log('')}}>
                            Next
                        </button>    
                </div>
                    }
                {HeaderRow(Header)}
                {Data.slice((currentSelect-1)*pagination,currentSelect*pagination).map((Row)=>{
                    return(
                        <div className='RowBox BackgroundMainThemeDark '>
                        {Row.map((item)=>{return(
                            <div className='RowData BackgroundMainThemeDark'>
                                {item}
                            </div>
                        )})
                        }
                        </div>

                    )


                })}

            </div>
            )
    }
    else
    {
        return(
            <div className='tableBody'>

                <div className='paginationRow'>
                    <div className='paginationButton BackgroundMainThemeDark'>
                            No Data Found
                    </div>
                </div>
            </div>
        )
    }

    }
export default Table;
