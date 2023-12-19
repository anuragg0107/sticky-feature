import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import Draggable from "react-draggable";
import "./App.css";

const StickNote = ({ color, text, onNoteClick, onNoteTextChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const [, drag] = useDrag(() => ({
    type: "NOTE",
    item: { color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const textareaRef = useRef(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const textarea = textareaRef.current;
      const currentFontSize = parseFloat(
        window.getComputedStyle(textarea).fontSize
      );
      const maxHeight = 200;
      const maxWidth = 200;

      while (
        textarea.scrollHeight > maxHeight ||
        textarea.scrollWidth > maxWidth
      ) {
        textarea.style.fontSize = `${currentFontSize - 1}px`;
      }
    };

    adjustFontSize();
  }, [text]);

  const handleInputChange = (e) => {
    onNoteTextChange(e.target.value);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  return (
    <Draggable onStart={handleDragStart} onStop={handleDragStop}>
      <div
        className={`note ${isDragging ? "dragging" : ""}`}
        ref={drag}
        style={{ backgroundColor: color, width: "200px", height: "200px" }}
        onClick={onNoteClick}
      >
        <textarea
          ref={textareaRef}
          className="note-text"
          value={text}
          onChange={handleInputChange}
          placeholder="You can type here"
        />
        <div className="resize-handle" />
      </div>
    </Draggable>
  );
};

export default StickNote;
