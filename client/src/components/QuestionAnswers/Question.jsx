/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import AddAnswerModal from './modals/AddAnswerModal';

function Question({ questionId, questionBody, questionHelpfulness }) {
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [showAddAnswer, setShowAddAnswer] = useState(false);

  const questionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const handleMarkHelpful = () => markedHelpful || axios
    .put(`/qa/questions/${questionId}/helpful`)
    .then(() => setMarkedHelpful(true))
    // eslint-disable-next-line no-console
    .catch(console.error);

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter' || key === ' ') {
      handleMarkHelpful();
    }
  };

  return (
    <>
      <div className="qa-question" style={questionStyle}>
        <span>
          <strong>Q: </strong>
          {questionBody}
        </span>
        <span>
          Helpful?
          {' '}
          <span
            onClick={handleMarkHelpful}
            role="button"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            style={{ cursor: 'pointer' }}
          >
            <u>Yes</u>
            {` (${markedHelpful ? questionHelpfulness + 1 : questionHelpfulness})`}
          </span>
          {' | '}
          <span
            onClick={() => setShowAddAnswer(true)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={-1}
            style={{ cursor: 'pointer' }}
          >
            <u>Add Answer</u>
          </span>
        </span>
      </div>
      {/* TODO: is this the best place for the modal? */}
      <AddAnswerModal
        showModal={showAddAnswer}
        onClose={() => setShowAddAnswer(false)}
      />
    </>
  );
}

export default Question;
