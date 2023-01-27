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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CustomModal