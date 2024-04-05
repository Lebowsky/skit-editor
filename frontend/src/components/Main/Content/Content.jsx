/* eslint-disable jsx-a11y/anchor-is-valid */
import './Content.css'
import Preview from './Preview/Preview.jsx'
import Tabs from './Tabs/Tabs.jsx'

export default function Content() {
  return (
    <div className='content'>
      <Tabs />
      <div className="params-wrapper">
        <Params />
        <Preview />
      </div>
    </div>
  )
}

function Params() {
  return (
    <div className="params">
      <div className="main-params">
        <label className="w" for="Name">
          <span>Name</span>
          <input type="text" name="Name" id="Name" data-param-name="Name" value="Документы" title="" />
        </label>
        <label for="Timer">
          <input type="checkbox" name="Timer" id="Timer" data-param-name="Timer" title="" />
          <span>Screen handler on timer</span>
        </label>
        <label for="hideToolBarScreen">
          <input type="checkbox" name="hideToolBarScreen" id="hideToolBarScreen" data-param-name="hideToolBarScreen" title="" />
          <span>Hide top bar</span>
        </label>
        <label for="hideBottomBarScreen">
          <input type="checkbox" name="hideBottomBarScreen" id="hideBottomBarScreen" data-param-name="hideBottomBarScreen" title="" />
          <span>Hide top bar</span>
        </label>
        <label for="noScroll">
          <input type="checkbox" name="noScroll" id="noScroll" data-param-name="noScroll" title="" />
          <span>Hide top bar</span>
        </label>
        <label for="handleKeyUp">
          <input type="checkbox" name="handleKeyUp" id="handleKeyUp" data-param-name="handleKeyUp" title="" />
          <span>Hide top bar</span>
        </label>
        <label for="noConfirmation">
          <input type="checkbox" name="noConfirmation" id="noConfirmation" data-param-name="noConfirmation" title="" />
          <span>Hide top bar</span>
        </label>
        <div className="btn-wrap">
          <button className="btn color save-element">Save</button>
        </div>
      </div>
      <div className="elements">
        <div className="list-wrapper">
          <h3 className="list-header">Elements (<span className="cnt">2</span>)<i className="fa fa-chevron-up" aria-hidden="true"></i></h3>
          <div className="btn-wrap">
            <button className="btn color add-element">Add</button>
            <button className="btn color paste-element">Paste</button>
          </div>
          <ul className="list">
            <li><a href="#">LinearLayout</a></li>
            <li><a href="#">barcode</a></li>
          </ul>
        </div>
      </div>
      <div className="handlers">
        <div className="list-wrapper">
          <h3 className="list-header">Handlers (<span className="cnt">2</span>)<i className="fa fa-chevron-up" aria-hidden="true"></i></h3>
          <div className="btn-wrap">
            <button className="btn color add-element">Add</button>
            <button className="btn color paste-element">Paste</button>
          </div>
          <ul className="list">
            <li><a href="#">onStart</a><i className="info">docs_on_start</i></li>
            <li><a href="#">onInput</a><i className="info">docs_on_select</i></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

