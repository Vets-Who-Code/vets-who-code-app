import React from 'react';

const Syllabus = () => {
  return (
    <section id="faq" className="faq section pad-regular bg-default">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="faq-short-brief">
              <h2>#VetsWhoCode Syllabus</h2>
              <p>
                Our curriculum is designed using the Agile Methodology with
                four-day sprints dedicated to the subject. We do it in this
                manner based on the practice of how veterans "Train How You
                Fight" in the military, so they should train how they would work
                in a real software company. The primary language we will focus
                on is JavaScript, due to its popularity in the job market, ease
                of transition between Computer Science topics and real world
                application, and the scope of industries we can introduce our
                veterans to, all while keeping language proficiency at the
                forefront of the program. This way we can introduce Data
                Visualization, Data Science, Cyber Security, and Internet of
                Things(IoT) to our veterans, while continuing to have our troops
                grow in the area of JavaScript.
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div
              className="panel-group faq_list"
              id="accordion"
              role="tablist"
              aria-multiselectable="true"
            >
              <div className="panel panel-default active">
                <div className="panel-heading" role="tab" id="headingOne">
                  <h4 className="panel-title">
                    <a
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      {' '}
                      Week One: Set Up and Prep
                      <i className="fa fa-minus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseOne"
                  className="panel-collapse collapse in"
                  role="tabpanel"
                  aria-labelledby="headingOne"
                >
                  <div className="panel-body">
                    During this week we focus on ensuring that our troops have
                    the needed technologies set up and to gain exposure to our
                    tools.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingTwo">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      {' '}
                      Week Two: The Web, Git and HTML
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTwo"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingTwo"
                >
                  <div className="panel-body">
                    This is when we start diving in on the basics, ensuring that
                    you are comfortable in the terminal, and using version
                    control, while teaching how the web works.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingThree">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      {' '}
                      Week 3: Basics of CSS
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseThree"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingThree"
                >
                  <div className="panel-body">
                    Here we start learning CSS with the focus on learning web
                    design.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingFour">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      {' '}
                      Week 4: Advanced CSS
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFour"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFour"
                >
                  <div className="panel-body">
                    Here we focus on more advanced concepts such as Grid Layout
                    as well as working with Foundation and Bootstrap.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingFive">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      {' '}
                      Week 5: JavaScript Basics
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFive"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFive"
                >
                  <div className="panel-body">
                    This week we will start to learn the history and basics of
                    Javascript and learn how to use it alone as well as in web
                    design.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingSix">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      {' '}
                      Week 6: Computer Science With Javascript
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseSix"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingSix"
                >
                  <div className="panel-body">
                    We continue our training in Javascript while also learning
                    fundamentals in Computer Science. Recursion, Big O Notation,
                    Sorting, Data Structures and Functional Programming.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingSeven">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      {' '}
                      Week 7: Computer Science With Javascript II: Deeper Dive
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseSeven"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingSeven"
                >
                  <div className="panel-body">
                    Here we continue to build Computer Science skills with
                    javascript. Binary Trees and Breadth-First Search are just a
                    few of the things we will dive into.
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingEight">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseEight"
                      aria-expanded="false"
                      aria-controls="collapseEight"
                    >
                      {' '}
                      Week 8: Data Visualization
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseEight"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingEight"
                >
                  <div className="panel-body">
                    More JavaScript and even more math as we enter the world of
                    Canvas, D3.js, WebGL
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingNine">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseNine"
                      aria-expanded="false"
                      aria-controls="collapseNine"
                    >
                      {' '}
                      Week 9: Node.js Express and Socket.io
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseNine"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingNine"
                >
                  <div className="panel-body">
                    Entering the world of Node.js and writing Javascript on the
                    server
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingTen">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTen"
                      aria-expanded="false"
                      aria-controls="collapseTen"
                    >
                      {' '}
                      Node, Express and Socket.io II
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTen"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingTen"
                >
                  <div className="panel-body">
                    Continuing to build with Node and learning Test Driven
                    Development
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingE">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseE"
                      aria-expanded="false"
                      aria-controls="collapseE"
                    >
                      {' '}
                      React
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseE"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingE"
                >
                  <div className="panel-body">
                    Start down the path or React, ES6 and Mongo DB
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingT">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseT"
                      aria-expanded="false"
                      aria-controls="collapseT"
                    >
                      {' '}
                      React II
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseT"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingT"
                >
                  <div className="panel-body">
                    Continuing to develop in React
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingTh">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseTh"
                      aria-expanded="false"
                      aria-controls="collapseTh"
                    >
                      {' '}
                      Interview Prep I
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseTh"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingTh"
                >
                  <div className="panel-body">
                    Start resume preparations as well as how to indentify
                    potential job opportunities
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="headingFourteen">
                  <h4 className="panel-title">
                    <a
                      className="collapsed"
                      role="button"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#collapseFourteen"
                      aria-expanded="false"
                      aria-controls="collapseFourteen"
                    >
                      {' '}
                      Interview Prep II
                      <i className="fa fa-plus accordions-derective-icon pull-right" />
                    </a>
                  </h4>
                </div>
                <div
                  id="collapseFourteen"
                  className="panel-collapse collapse"
                  role="tabpanel"
                  aria-labelledby="headingFourteen"
                >
                  <div className="panel-body">
                    Starting the process of mock interviews and learning how to
                    hack the technical interview.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Syllabus;
