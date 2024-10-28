import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button } from 'semantic-ui-react';

import ShareButton from '../ShareButton';
import { calculateScore, calculateGrade, timeConverter } from '../../utils';

const Stats = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz,
}) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  return (
    <Segment style={{ padding: '1rem' }}>
      <Header as="h1" textAlign="center" block style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>
        {remarks}
      </Header>
      <Header as="h2" textAlign="center" block style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
        Grade: {grade}
      </Header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Header as="h3" textAlign="center" block style={{ fontSize: '1rem', margin: '0' }}>
          Total Questions: {totalQuestions}
        </Header>
        <Header as="h3" textAlign="center" block style={{ fontSize: '1rem', margin: '0' }}>
          Correct Answers: {correctAnswers}
        </Header>
        <Header as="h3" textAlign="center" block style={{ fontSize: '1rem', margin: '0' }}>
          Your Score: {score}%
        </Header>
        <Header as="h3" textAlign="center" block style={{ fontSize: '1rem', margin: '0' }}>
          Passing Score: 60%
        </Header>
        <Header as="h3" textAlign="center" block style={{ fontSize: '1rem', margin: '0' }}>
          Time Taken: {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
        </Header>
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        flexWrap: 'wrap'
      }}>
        <Button
          primary
          content="Play Again"
          onClick={replayQuiz}
          size="medium"
          icon="redo"
          labelPosition="left"
        />
        <Button
          color="teal"
          content="Back to Home"
          onClick={resetQuiz}
          size="medium"
          icon="home"
          labelPosition="left"
        />
        <ShareButton />
      </div>
    </Segment>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Stats;
