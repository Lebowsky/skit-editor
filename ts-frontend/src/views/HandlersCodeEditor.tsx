import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';


interface HandlersCodeEditorProps {
  content: string
  language: string
  onChange(value: string): void 
}

export default function HandlersCodeEditor({ content, language, onChange}: HandlersCodeEditorProps) {
  const [code, setCode] = useState(content);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    const value = e.target.value
    setCode(value)
    onChange(value)
  }
  return (
    <CodeEditor
      value={code}
      language={language}
      onChange={(evn) => handleChange(evn)}
      padding={15}
      placeholder='press code here'
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: 350,
        width: '100%',
        maxWidth: 740,
        fontSize: '0.9rem',
        overflow: 'auto',
        height: 600
      }}
    />
  );
}