import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare} from '@fortawesome/free-regular-svg-icons';
import { faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import {marked} from 'marked';
import { Navbar } from 'react-bootstrap';

marked.setOptions({
  breaks: true
})

function App() {

  const initialState = `# This is a heading!
  ## And this is a subheading
  There's also [links](https://www.freecodecamp.org)
  and
  > Block Quotes!

  Heres some code, \`<div></div>\`, between 2 backticks.

  \`\`\`
  // this is multi-line code:

  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`

  You can also make text **bold**... whoa!

  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:

  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `
  ;

  const [text, setText] = useState(initialState);
  const [isActive, setActive] = useState('false')

  const markdownText = marked(text);
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <div className='app'>
      <Container className="app-container">
        <Row>
          <Navbar expand="lg" variant="light" bg="transparent">
            <Container>
              <Navbar.Brand href="#">Markdown Previewer</Navbar.Brand>
            </Container>
          </Navbar>
        </Row>
        <Row>
          <Col lg={6}>
            <Card className="app-card editor">
              <Card.Header className='card-header'>
                <div className='left-header'>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <p>Editor</p>
                </div>
                <div className='right-header'>
                  <Button variant="outline-dark" onClick={handleToggle} className={`custom-btn ${isActive ? "toggle-btn" : null}`}>
                    <FontAwesomeIcon icon={faMaximize} />
                  </Button>
                  <Button variant="outline-dark" onClick={handleToggle} className={`custom-btn ${isActive ? null :"toggle-btn"}`}>
                    <FontAwesomeIcon icon={faMinimize} />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className='p-0'>
                <Card.Text className='card-text'>
                  <textarea className={`text-area ${isActive ? "maximize" : ""}`} id='editor' value={text} onChange={(e) => setText(e.target.value)} placeholder='Write here!'>
                  </textarea>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="app-card preview">
              <Card.Header className='card-header'>
                <div className='left-header'>
                  <FontAwesomeIcon icon={faEye} />
                  <p>Preview</p>
                </div>
              </Card.Header>
              <Card.Body className='p-0'>
                <Card.Text className='card-text m-0' id='preview' 
                  dangerouslySetInnerHTML={{__html:markdownText}}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
