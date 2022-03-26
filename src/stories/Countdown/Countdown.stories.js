import Countdown from '../../../src/components/Countdown'

export default {
  component: Countdown,
  title: 'Components/Countdown',
}

const Template = args => (
  <section id="event_card" className="section bg-dark pad-regular event_card">
    <div className="container">
      <div className="row">
        <div className="col-sm-6 event_content">
          <h3 className="next-cohort">Surprising Update</h3>
          <div className="event_excerpt">
            <p>Launching something new Veteran&apos;s Day. Be sure to apply!</p>
          </div>
        </div>
        <div className="col-sm-6 event_counter_container text-center">
          <Countdown {...args} />
        </div>
      </div>
    </div>
  </section>
)

export const Example = Template.bind({})

Example.args = {
  nextClass: 'February 12, 2040',
}
