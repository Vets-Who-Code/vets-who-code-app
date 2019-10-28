import React, { useState, useCallback, useContext, createContext } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node,
  accordionId: PropTypes.string.isRequired,
  singlePanel: PropTypes.bool,
}

const defaultProps = {
  singlePanel: false,
  accordionId: '',
}

const AccordionContext = createContext({
  isOpen: () => false,
  onClick() {},
})

export const useAccordion = sectionSlug => {
  const { onClick, isOpen, accordionId } = useContext(AccordionContext)
  return {
    accordionId,
    onClick,
    isOpen: isOpen(sectionSlug),
  }
}

function Accordion({ accordionId, singlePanel, children }) {
  const [openSections, setOpenSections] = useState({})
  const isOpen = sectionSlug => Boolean(openSections[sectionSlug])
  const onClick = useCallback(
    sectionSlug => {
      setOpenSections({
        ...(singlePanel ? {} : openSections),
        [sectionSlug]: !openSections[sectionSlug],
      })
    },
    [openSections, singlePanel, setOpenSections]
  )

  return (
    <AccordionContext.Provider value={{ onClick, isOpen, accordionId }}>
      <div
        className="panel-group faq_list"
        id={accordionId}
        role="tablist"
        aria-multiselectable="true"
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

Accordion.propTypes = propTypes
Accordion.defaultProps = defaultProps

export default Accordion
