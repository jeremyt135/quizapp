import React from 'react'
import '../../../styles/quiz.css'
import Footer from '../common/Footer'

const Quiz = () => {
  return (
    <>
      <section class='container'>
        <section class='content col-lg-8 col-sm-10 mx-auto mt-3'>
          <form>
            <div class='row mb-4'>
              <div class='col d-flex align-items-center'>
                <h1 class='mb-0'>Quiz Title</h1>
              </div>
            </div>
            <div class='row mb-2'>
              <div class='col'>
                <div class='row'>
                  <div class='col d-flex align-items-center'>
                    <h2 class='mb-2'>
                      1. <span>Question 1</span>
                    </h2>
                  </div>
                </div>
                <div class='answer answer--selected row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question1'
                        id='q1answer1'
                        value='1'
                        checked
                      />
                      <label for='q1answer1'>
                        1. <span>Answer 1 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class='answer row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question1'
                        id='q1answer2'
                        value='2'
                      />
                      <label for='q1answer2'>
                        2. <span>Answer 2 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class='answer row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question1'
                        id='q1answer3'
                        value='3'
                      />
                      <label for='q1answer3'>
                        3. <span>Answer 3 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='row mb-2'>
              <div class='col'>
                <div class='row'>
                  <div class='col d-flex align-items-center'>
                    <h2 class='mb-2'>
                      2. <span>Question 2</span>
                    </h2>
                  </div>
                </div>
                <div class='answer answer--selected row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question2'
                        id='q2answer1'
                        value='1'
                        checked
                      />
                      <label for='q2answer1'>
                        1. <span>Answer 1 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class='answer row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question2'
                        id='q2answer2'
                        value='2'
                      />
                      <label for='q2answer2'>
                        2. <span>Answer 2 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class='answer row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question2'
                        id='q2answer3'
                        value='3'
                      />
                      <label for='q2answer3'>
                        3. <span>Answer 3 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='row mb-2'>
              <div class='col'>
                <div class='row'>
                  <div class='col d-flex align-items-center'>
                    <h2 class='mb-2'>
                      3. <span>Question 3</span>
                    </h2>
                  </div>
                </div>
                <div class='answer answer--selected row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question3'
                        id='q3answer1'
                        value='1'
                        checked
                      />
                      <label for='q3answer1'>
                        1. <span>Answer 1 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class='answer row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question3'
                        id='q3answer2'
                        value='2'
                      />
                      <label for='q3answer2'>
                        2. <span>Answer 2 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class='answer row mt-2'>
                  <div class='col d-flex align-items-start'>
                    <div class='form-check mb-1'>
                      <input
                        class='form-check-input'
                        type='radio'
                        name='question3'
                        id='q3answer3'
                        value='3'
                      />
                      <label for='q3answer3'>
                        3. <span>Answer 3 Text</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </section>
      <Footer />
    </>
  )
}

export default Quiz
