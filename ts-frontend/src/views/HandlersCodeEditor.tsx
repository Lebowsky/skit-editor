import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';


interface HandlersCodeEditorProps {
  content: string
  language: string
}

export default function HandlersCodeEditor({ content, language}: HandlersCodeEditorProps) {
  const [code, setCode] = useState(
    content
  );
  return (
    <CodeEditor
      value={code}
      language={language}
      onChange={(evn) => setCode(evn.target.value)}
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