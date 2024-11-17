import React, { useRef, useEffect } from 'react';

const ContentEditable = ({ value, onChange, className }) => {
  const contentEditableRef = useRef(null);

  useEffect(() => {
    if (contentEditableRef.current.textContent !== value) {
      contentEditableRef.current.textContent = value;
    }
  }, [value]);

  const handleInput = (event) => {
    onChange(event.target.textContent);
  };

  return (
    <div
      ref={contentEditableRef}
      contentEditable
      onInput={handleInput}
      suppressContentEditableWarning={true}
      className={className}
    />
  );
};

export default ContentEditable;

