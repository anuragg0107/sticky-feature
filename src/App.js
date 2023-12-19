import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StickNote from './StickyNotes';
import './App.css';

const App = () => {
  const [note, setNote] = useState({ id: 1, color: 'yellow', text: '' });

  const handleNoteTextChange = (newText) => {
    setNote((prevNote) => ({ ...prevNote, text: newText }));
  };

  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <StickNote
          color={note.color}
          text={note.text}
          onNoteTextChange={handleNoteTextChange}
        />
      </div>
    </DndProvider>
    </>
  
  );
};

export default App;
