
import './home.css'
const Home = () => {
      return (
            <div className="w-full h-[100vh]  flex flex-row justify-center items-center pl-[10%] mt-[3%] pr-[10%]">
                  <div className="left w-[40%] h-full flex flex-col justify-center  items-start ">
                        <img className="w-[80%]" src="/Image/homefig.svg" alt="Home Figure" />
                  </div>
                  <div className="w-[60%] h-full flex flex-col justify-center  items-start ">
                        <div className="right1 font-rocknroll text-white text-[50px] max-lg:text-[40px] whitespace-nowrap" >Welcome to EcoSync</div>
                        <div className=" right2 font-rocknroll mt-2 font-[200] text-[#ffffffd8] text-[30px] max-xl:text-[25px] max-lg:text-[20px] whitespace-nowrap" >Revolutionizing Dhaka's Waste Management</div>
                        <div className="right3 font-sans mt-5 font-[400] text-[#ffffffd8] text-[20px] max-lg:text-[20px] text-justify" >EcoSync revolutionizes Dhaka North City Corporation's waste management by using innovative technology to streamline waste collection, transportation, and processing. This comprehensive web application promotes a cleaner, greener Dhaka by enhancing operational efficiency and sustainability.</div>
                  </div>

            </div>
      )
}

export default Home;