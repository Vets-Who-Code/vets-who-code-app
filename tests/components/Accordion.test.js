import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Accordion, { Panel } from '../../src/components/Accordion'

jest.useFakeTimers()

describe('<Accordion />', () => {
  test('should toggle aria expanded on click on any panel', () => {
    const { container } = render(
      <Accordion accordionId="first-one">
        <Panel id={0} title="panel one title" body="panel one body">
          panel content one
        </Panel>
        <Panel id={1} title="panel two title" body="panel two body">
          panel content one
        </Panel>
      </Accordion>
    )

    const panelOne = container.querySelector('#heading-0')
    const panelOneContent = container.querySelector('[aria-labelledby="heading-0"]')
    const panelTwo = container.querySelector('#heading-1')
    const panelTwoContent = container.querySelector('[aria-labelledby="heading-1"]')
    const anchorElement = container.querySelectorAll('a')

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')

    fireEvent.click(panelOne)
    fireEvent.click(panelTwo)

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('true')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('false')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('true')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('false')

    fireEvent.click(panelOne)
    fireEvent.click(panelTwo)

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')
  })

  test('should toggle aria expanded on click on one panel when singlePanel prop passed', () => {
    const { container } = render(
      <Accordion accordionId="first-one" singlePanel>
        <Panel
          id={0}
          title={() => <div>panel one title</div>}
          body={() => <div>panel one body</div>}
        >
          panel content one
        </Panel>
        <Panel
          id={1}
          title={() => <div>panel two title</div>}
          body={() => <div>panel two body</div>}
        >
          panel content one
        </Panel>
      </Accordion>
    )

    const panelOne = container.querySelector('#heading-0')
    const panelOneContent = container.querySelector('[aria-labelledby="heading-0"]')
    const panelTwo = container.querySelector('#heading-1')
    const panelTwoContent = container.querySelector('[aria-labelledby="heading-1"]')
    const anchorElement = container.querySelectorAll('a')

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')

    fireEvent.click(panelOne)

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('true')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('false')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')

    fireEvent.click(panelTwo)

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('true')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('false')
  })

  test('should toggle aria expanded on keypress on any panel', () => {
    const { container } = render(
      <Accordion accordionId="first-one">
        <Panel id={0} title="panel one title" body="panel one body">
          panel content one
        </Panel>
        <Panel id={1} title="panel two title" body="panel two body">
          panel content one
        </Panel>
      </Accordion>
    )

    const panelOne = container.querySelector('#heading-0')
    const panelOneContent = container.querySelector('[aria-labelledby="heading-0"]')
    const panelTwo = container.querySelector('#heading-1')
    const panelTwoContent = container.querySelector('[aria-labelledby="heading-1"]')
    const anchorElement = container.querySelectorAll('a')
    const mockKeydownEvent = { keyCode: 13 }

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')

    fireEvent.keyDown(panelOne, mockKeydownEvent)
    fireEvent.keyDown(panelTwo, mockKeydownEvent)

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('true')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('false')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('true')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('false')

    fireEvent.keyDown(panelOne, mockKeydownEvent)
    fireEvent.keyDown(panelTwo, mockKeydownEvent)

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')
  })

  test('should toggle aria expanded on keydown === 13 on one panel when singlePanel prop passed', () => {
    const { container } = render(
      <Accordion accordionId="first-one" singlePanel>
        <Panel
          id={0}
          title={() => <div>panel one title</div>}
          body={() => <div>panel one body</div>}
        >
          panel content one
        </Panel>
        <Panel
          id={1}
          title={() => <div>panel two title</div>}
          body={() => <div>panel two body</div>}
        >
          panel content one
        </Panel>
      </Accordion>
    )

    const panelOne = container.querySelector('#heading-0')
    const panelOneContent = container.querySelector('[aria-labelledby="heading-0"]')
    const panelTwo = container.querySelector('#heading-1')
    const panelTwoContent = container.querySelector('[aria-labelledby="heading-1"]')
    const anchorElement = container.querySelectorAll('a')
    const mockKeydownEvent = { keyCode: 13 }

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')

    fireEvent.keyDown(panelOne, mockKeydownEvent)
    fireEvent.keyDown(panelOne, { keyCode: 27 })

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('true')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('false')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('false')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('true')

    fireEvent.keyDown(panelTwo, mockKeydownEvent)

    expect(anchorElement[0].getAttribute('aria-expanded')).toBe('false')
    expect(panelOneContent.getAttribute('aria-hidden')).toBe('true')
    expect(anchorElement[1].getAttribute('aria-expanded')).toBe('true')
    expect(panelTwoContent.getAttribute('aria-hidden')).toBe('false')
  })
})
