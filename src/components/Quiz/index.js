import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header,
} from 'semantic-ui-react';
import he from 'he';

import Countdown from '../Countdown';
import { getLetter } from '../../utils';

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questionIndex]);

  const handleItemClick = (e, { name }) => {
    setUserSlectedAns(name);
  };

  const handleNext = () => {
    let point = 0;
    if (userSlectedAns === he.decode(data[questionIndex].correct_answer)) {
      point = 1;
    }

    const qna = questionsAndAnswers;
    qna.push({
      question: he.decode(data[questionIndex].question),
      user_answer: userSlectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = timeTaken => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  return (
    <Item.Header>
      <Container style={{ 
        maxWidth: '800px', 
        height: '85vh',
        padding: '0.5rem 0',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Segment style={{ 
          padding: '1.2rem', 
          width: '100%',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Item.Group divided style={{ 
            margin: '0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Item style={{ flex: 1 }}>
              <Item.Content style={{ 
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: '0.8rem'
              }}>
                <Item.Extra style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                }}>
                  <Header as="h1" style={{ margin: '0', fontSize: '1rem' }}>
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No.${questionIndex + 1} of ${data.length}`}
                    </Header.Content>
                  </Header>
                  <Countdown
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  />
                </Item.Extra>
                <Item.Meta style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <Message size="large" floating style={{ margin: 0, padding: '0.8rem' }}>
                    <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                  </Message>
                  <Item.Description>
                    <h3 style={{ fontSize: '0.9rem', margin: 0 }}>Please choose one of the following answers:</h3>
                  </Item.Description>
                  <Divider style={{ margin: 0 }} />
                  <Menu vertical fluid size="large" style={{ 
                    margin: 0,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                  }}>
                    {data[questionIndex].options.map((option, i) => {
                      const letter = getLetter(i);
                      const decodedOption = he.decode(option);

                      return (
                        <Menu.Item
                          key={decodedOption}
                          name={decodedOption}
                          active={userSlectedAns === decodedOption}
                          onClick={handleItemClick}
                          style={{ 
                            padding: '0.6rem 1rem',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.9rem'
                          }}
                        >
                          <b style={{ marginRight: '10px' }}>{letter}</b>
                          {decodedOption}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <div>
                  <Divider style={{ margin: '0.6rem 0' }} />
                  <Item.Extra style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.3rem 2rem',
                    position: 'relative',
                    bottom: 0
                  }}>
                    <Button
                      content="Home"
                      onClick={() => window.location.href = '/'}
                      size="medium"
                      icon="home"
                      labelPosition="left"
                      style={{ margin: 0 }}
                    />
                    <Button
                      primary
                      content="Next"
                      onClick={handleNext}
                      size="medium"
                      icon="right chevron"
                      labelPosition="right"
                      disabled={!userSlectedAns}
                      style={{
                        position: 'absolute',
                        right: '30px',  // Adjust this value as needed
                        top: '50%',
                        transform: 'translateY(-50%)',
                        margin: 0
                      }}
                    />
                  </Item.Extra>
                </div>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Container>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
