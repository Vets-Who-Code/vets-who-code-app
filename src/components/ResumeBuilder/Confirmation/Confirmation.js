import { useRouter } from 'next/router'
import CheckCircle from '../../images/check-circle.png'


const Confirmation = () => {
  const router = useRouter()
  return (
    <>
    <div className="resume-container">
      
      
      <div className="rc-response">
          <img src={CheckCircle} alt="" />
            <h1>Here's Your Resume!</h1>
            <h3>
              Now that you have an awesome resume, time to go get that dream job!
            </h3>
            <div className="rc-response__action">
              <a href=" ">
                  <button className="btn btn-cr">
                  Create New Resume
                  </button>
              </a>
              <a href="https://vetswhocode.io" id="rtrn-vwc">
                  Back to VWC
              </a>
            </div>
        
      </div>
   
    
      <div className="dwnld-error">
        <p>
          If your resume did not automatically download, <a href=" " id="dwnld-error__link">click here</a> to
          download it.
        </p>
      </div>
    </div>
  </>
  )
}

export default Confirmation
