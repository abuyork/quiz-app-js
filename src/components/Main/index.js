import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Button,
  Message,
} from 'semantic-ui-react';

import mindImg from '../../images/javascript-logo.svg';

import {
  CATEGORIES,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';
import mockQuestions from '../Quiz/mock.json';

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    setTimeout(() => {
      try {
        let selectedQuestions;

        if (category === '0') { // General category
          // Get all questions from all categories
          const allQuestions = mockQuestions.flatMap(cat => 
            cat.questions.map(q => ({
              category: cat.category,
              question: q.question,
              correct_answer: q.correct_answer,
              incorrect_answers: q.incorrect_answers,
              options: shuffle([q.correct_answer, ...q.incorrect_answers])
            }))
          );

          // Shuffle all questions and take 30
          const shuffledQuestions = shuffle([...allQuestions]);
          selectedQuestions = shuffledQuestions.slice(0, 30);
        } else {
          // Find the selected category from mockQuestions array
          const selectedCategoryData = mockQuestions.find(cat => 
            cat.category.toLowerCase() === CATEGORIES.find(c => 
              c.value === category
            )?.text.toLowerCase()
          );

          if (!selectedCategoryData) {
            throw new Error('Category not found');
          }

          // Get questions from the selected category and map them
          const allQuestions = selectedCategoryData.questions.map(q => ({
            category: selectedCategoryData.category,
            question: q.question,
            correct_answer: q.correct_answer,
            incorrect_answers: q.incorrect_answers,
            options: shuffle([q.correct_answer, ...q.incorrect_answers])
          }));

          // For Scope and Contexts category, use all questions
          const questionsToTake = selectedCategoryData.category === 'Scope and Contexts' 
            ? allQuestions.length 
            : 10;

          // Shuffle all questions first
          const shuffledQuestions = shuffle([...allQuestions]);
          
          // Take appropriate number of questions
          selectedQuestions = shuffledQuestions.slice(0, questionsToTake);
        }

        setProcessing(false);
        startQuiz(
          selectedQuestions,
          countdownTime.hours + countdownTime.minutes + countdownTime.seconds
        );
      } catch (error) {
        setProcessing(false);
        setError({
          message: 'There was an error loading the questions. Please try again.'
        });
      }
    }, 1000);
  };

  if (offline) return <Offline />;

  return (
    <Container 
      style={{ 
        height: '100%',  // Changed from minHeight: '100vh'
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
      }}
    >
      <Segment 
        style={{ 
          width: '100%',
          maxWidth: '800px',
          margin: '0',
          padding: '2rem'
        }}
      >
        <Item.Group divided style={{ margin: '0' }}>
          <Item style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.5rem'
          }}>
            <Item.Image src={mindImg} size='tiny' />
            <Item.Content style={{ width: '100%' }}>
              <Item.Header>
                <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', textAlign: 'center' }}>
                  Test Your Javascript Knowledge
                </h1>
              </Item.Header>
              
              {error && (
                <Message error onDismiss={() => setError(null)} size='small'>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              
              <Item.Meta style={{ fontSize: '1rem', margin: '0.5rem auto', maxWidth: '500px' }}>
                <p style={{ margin: '0 0 0.5rem 0', textAlign: 'left' }}>
                  Choose Category
                </p>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                  style={{ marginBottom: '0.5rem' }}
                />
                
                <p style={{ margin: '1rem 0 0.5rem 0', textAlign: 'left' }}>
                  Please define timer for quiz
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Dropdown
                    search
                    selection
                    name="hours"
                    placeholder="Hours"
                    options={COUNTDOWN_TIME.hours}
                    value={countdownTime.hours}
                    onChange={handleTimeChange}
                    disabled={processing}
                    style={{ flex: 1 }}
                  />
                  <Dropdown
                    search
                    selection
                    name="minutes"
                    placeholder="Minutes"
                    options={COUNTDOWN_TIME.minutes}
                    value={countdownTime.minutes}
                    onChange={handleTimeChange}
                    disabled={processing}
                    style={{ flex: 1 }}
                  />
                  <Dropdown
                    search
                    selection
                    name="seconds"
                    placeholder="Seconds"
                    options={COUNTDOWN_TIME.seconds}
                    value={countdownTime.seconds}
                    onChange={handleTimeChange}
                    disabled={processing}
                    style={{ flex: 1 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: '0.9rem' }}>Hours</span>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: '0.9rem' }}>Minutes</span>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: '0.9rem' }}>Seconds</span>
                </div>
              </Item.Meta>
              
              <Item.Extra style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Button
                  primary
                  size="medium"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Start Quiz'}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
