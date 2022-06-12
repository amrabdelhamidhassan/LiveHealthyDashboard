import '../styles/components/Graph.css'
import '../constants/colors.css'
import { Counter } from '../styles/stylingfunctions';

function Graph({Title,TotalNumber,GraphData,click=null})
{
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
    const calculatePercentage=(total,number,totalLength=100)=>
    {
        return Math.round((number/total)*totalLength)
    }
    return(
        <div className='graphContainer BackgroundMainThemeDark 'onClick={click}>
            <div className='TitleRow'>
                <div>{Title}</div>
                <span style={{width:'1vw'}}> </span>
                {Counter(0,TotalNumber)}

            </div>
            <div>
                {
                    GraphData.map((dataobject)=>
                    {
                        return(
                            <div className='graphRow' >
                                <div className='labelTitle'>
                                    {dataobject.key}
                                </div>
                                <div className='labelTitle'>
                                    {
                                        Counter(0,dataobject.data)
                                    }
                                </div >
                                <div className='colorBar' style={{backgroundColor:getRandomColor(),width:calculatePercentage(TotalNumber,dataobject.data,15)+'vw'}}>
                                </div>
                                <div className='labelTitle'>
                                    {
                                        Counter(0,calculatePercentage(TotalNumber,dataobject.data),true)
                                    }
                                </div >
                            </div>
                        )
                    }
                    )
                }    

            </div>
        </div>

    )
}
export default Graph;