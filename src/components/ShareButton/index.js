import React, { Fragment } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

const ShareButton = () => {
  const handleClick = () => {
    navigator
      .share({
        title: document.title,
        text: 'Check out this quiz app — it rocks!',
        url: 'https://abuyork.github.io/quiz-app/',
      })
      .then(() => console.log('Successfully shared'))
      .catch(error => console.log(error.message));
  };

  return (
    <Fragment>
      {navigator.share ? (
        <Button
          title="Share"
          floated="right"
          size="medium"
          circular
          icon="share alternate"
          onClick={handleClick}
          style={{ margin: '0.5rem' }}
        />
      ) : (
        <Modal
          closeIcon
          size="tiny"
          trigger={
            <Button
              title="Share"
              floated="right"
              size="medium"
              circular
              icon="share alternate"
              style={{ margin: '0.5rem' }}
            />
          }
        >
          <Modal.Header className="ui center aligned" style={{ padding: '1rem' }}>
            Share on
          </Modal.Header>
          <Modal.Content className="ui center aligned container" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="https://www.facebook.com/sharer.php?u=https%3A//abuyork.github.io/quiz-app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button color="facebook" size="medium" fluid>
                  <Icon name="facebook" />
                  Facebook
                </Button>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https%3A//abuyork.github.io/quiz-app/&text=Check%20out%20this%20quiz%20app%20—%20it%20rocks!&via=_abuyork"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button color="twitter" size="medium" fluid>
                  <Icon name="twitter" />
                  Twitter
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fabuyork.github.io%2Fquiz-app%2F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button color="linkedin" size="medium" fluid>
                  <Icon name="linkedin" />
                  LinkedIn
                </Button>
              </a>
            </div>
          </Modal.Content>
        </Modal>
      )}
    </Fragment>
  );
};

export default ShareButton;
