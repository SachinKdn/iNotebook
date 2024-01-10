import React, { useRef, useState } from 'react';

function UpdateNote() {
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => {
    console.log("opening...")
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        onClick={openModal}
      >
       Push meeee...
      </button>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" aria-labelledby="exampleModalLabel">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">Sachin Kadian</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateNote;
