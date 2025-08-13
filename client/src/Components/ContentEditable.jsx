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
      // Se aplican estilos predeterminados y se combinan con las clases pasadas
      className={`
        w-full 
        p-2 
        border-2 
        border-gray-300 
        rounded-lg 
        outline-none 
        focus:border-blue-500 
        transition-colors 
        resize-none
        ${className}
      `}
    />
  );
};

export default ContentEditable;

