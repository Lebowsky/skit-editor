import Button, { ButtonGroup } from "../../components/inputs/Button";
import { askFile } from "../../eelExpose";

export default function StartScreen() {
  async function fileOpenClick(){
    const result = await askFile('simple_ui')
    console.log(result)
  }

  return (
    <div style={{ width: '500px' }}>
      <div 
        style={{ 
          padding: 10, 
          borderBottom: '10px solid #ccc', 
          marginBottom: 30
        }}>
        <h1
          style={{
            textAlign: 'center',
          }}>
          Welcome to Simple UI
        </h1>
      </div>

      <div style={{padding:15, display:'flex', justifyContent: 'space-around'}}>
        <Button>New project</Button>
        <Button onClick={fileOpenClick}>Open</Button>
      </div>
    </div>
  )
}