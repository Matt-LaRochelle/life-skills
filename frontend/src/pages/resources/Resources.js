import './resources.css'
import w1 from '../../img/w1.png'
import w2 from '../../img/w2.png'
import w3 from '../../img/w3.png'
import w4 from '../../img/w4.png'
import w5 from '../../img/w5.png'
import w6 from '../../img/w6.png'
import w7 from '../../img/w7.png'
import w8 from '../../img/w8.png'
import w9 from '../../img/w9.png'
import w10 from '../../img/w10.png'

const Resources = () => {
    return (
        <div className='resources__container'>
        <p>This app was inspired by this video</p>
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/oC5nhc_eEH8?si=G9kJ1b3JqL-qF53O" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
            
            <div className='resources__grid'>  
                <img src={w1} alt="life skill #1 - workout consistently" />
                <img src={w2} alt="life skill #2 - personal finance skills" />
                <img src={w3} alt="life skill #3 - meditation" />
                <img src={w4} alt="life skill #4 - verbal and written communication skills" />
                <img src={w5} alt="life skill #5 - waking up early" />
                <img src={w6} alt="life skill #6 - public speaking" />
                <img src={w7} alt="life skill #7 - get honest with yourself" />
                <img src={w8} alt="life skill #8 - leadership" />
                <img src={w9} alt="life skill #9 - decision making" />
                <img src={w10} alt="life skill #10 - listening" />
            </div>
        </div>
    )
}

export default Resources