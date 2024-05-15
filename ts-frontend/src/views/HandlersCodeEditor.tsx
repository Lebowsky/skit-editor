import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';

export default function HandlersCodeEditor() {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <CodeEditor
      value={code}
      language="python"
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        // backgroundColor: "#f5f5f5",
        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}