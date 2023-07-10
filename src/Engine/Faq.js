import React, { useState, useContext } from 'react'
import Jumbotron from "../Components/Jumbotron"
import "./style/faq.scss"
import UtilityContext from "../context/utility/UtilityContext"

const Faq = () => {

  const { sendMess } = useContext(UtilityContext);

  const [askData, setAskData] = useState({})
  const handleOnChange = (e) => {
    setAskData({ ...askData, [e.target.name]: e.target.value })
  }

  const handleCheckbox = (e) => {
    setAskData({ ...askData, [e.target.name]: e.target.checked })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailId, question, answerToMail } = askData
    try {
      await fetch(`http://localhost:5001/ask/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailId: emailId,
          question: question,
          answerToMail: answerToMail,
        })
      }).then(async (response) => {
        const data = await response.json();
        if (data.ask) {
          sendMess('success', 'Thank you for contacting. We will response as soon as posible');
          setTimeout(() => {
            document.getElementById('askForm').reset();
          }, 1500);
        } else {
          sendMess('info', 'Somthing wend wrong with servers')
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container fade-in">
        <div className="row my-4">
          <div className="col col-8 header-2 text-white">
            <p>
              <span className="theamText">H</span>ey<span className="theamText">,</span> we<span className="theamText">'</span>ve <span className="theamText">S</span>een some <span className="theamText">F</span>requent asked <span className="theamText">q</span>uestions
            </p>
          </div>
        </div>

        {/* FAQ with anser */}
        <div className="row px-5 accordian-main-container ">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Accordion Item #1
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Accordion Item #2
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Accordion Item #3
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="row justify-content-center">
          <form onSubmit={handleSubmit} id='askForm'>
            <div className="form-main-container">
              <div className="heading" style={{ width: '100%' }}>
                <Jumbotron text={`Want to ask somthing ?`} />
              </div>

              <div className="main-form">
                <div className="input-group">
                  <input type="email" name="emailId" placeholder='Your Email' onChange={handleOnChange} />
                </div>
                <div className="input-group">
                  <textarea name="question" cols="100" rows="10" placeholder='How we may help you ?' onChange={handleOnChange} />
                </div>
                <div className="input-group my-2 align-items-center mb-3">
                  <input type="checkbox" name="answerToMail" onChange={handleCheckbox} />
                  <label htmlFor="answerToMail" className='answerToMailText'>Are you agree to get answer in your mail id ?</label>
                </div>
                <div className="input-group">
                  <button type="submit" className='btn btn-custom'>Ask Us</button>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
    </>
  )
}

export default Faq
