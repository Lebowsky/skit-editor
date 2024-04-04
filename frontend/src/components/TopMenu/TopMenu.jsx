import './TopMenu.css'
export default function TopMenu() {
  return (
    <div className="top-menu">
      <a href="#" className="logo">Simple UI</a>
      <nav>
      <ul>
        <li><a href="#">File</a>
          <ul>
            <li><a href="#">New</a></li>
            <li><a href="#">Open</a></li>
            <li><a href="#">Save</a></li>
          </ul>
        </li>
        <li><a href="#">Tools</a>
          <ul>
            <li><a href="#">SQL Query</a></li>
            <li><a href="#">Preview</a></li>
            <li><a href="#">Serarch</a></li>
            <li><a href="#">QR-Settings</a></li>
          </ul>
        </li>
        <li><a href="#">Configuration</a>
          <ul>
            <li><a href="#">Common</a></li>
            <li><a href="#">Properties</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    </div>
  )
}
