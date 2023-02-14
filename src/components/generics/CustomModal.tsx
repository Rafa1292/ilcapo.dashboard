import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface Props {
  children: React.ReactNode
  title: string
  show: boolean
  handleClose: () => void
}

function CustomModal({ children, title, show, handleClose }: Props) {
  return (
    <>
      <Modal dialogClassName="w-80" fullscreen='fullscreen' centered show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          {children}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CustomModal