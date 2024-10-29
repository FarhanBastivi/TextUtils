import React, { useState } from "react";

// const [text , setText] = useState('Enter Text Here'); cannot be defined outside function

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("UpperCase was clicked");
    let newText = text.toUpperCase();
    // setText("U have clicked on handleUpClick")
    setText(newText); 
    props.showAlert("Converted to UpperCase","success")
  };
  const handleDownClick = () => {
    let newText2 = text.toLowerCase();
    setText(newText2);
    props.showAlert("Converted to LowerCase","success")
  };
  const handleClearClick = () => {
    let newText2 = "";
    setText(newText2);
    props.showAlert("Text Cleared","success")
  };
  const handleSpeakClick = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    props.showAlert("Speaking out the text","success")
  }
  const handleSpaceClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "))
    props.showAlert("Extra spaces removed","success")
  }
  
  const handleCopy = () => {
    // console.log("I am copy");
    var text = document.getElementById("myBox");
    text.select();
    text.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(text.value);
    document.getSelection().removeAllRanges()
    props.showAlert("Copied to Clipboard!", "success");
  }

  const handleInverseClick = () => {
    // console.log("inverse click is triggered");
    let newtext = "";
    for (let i = text.length - 1; i >= 0; i--) {
      newtext += text[i];
    }
    setText(newtext);
    props.showAlert("Text Inversed Successfully","success")

  }; 

  const handleCapitalize = () => {
    let newText = text.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ");
    setText(newText);
    props.showAlert("Text Capitalized","success")

}

  const handleOnChange = (event) => {
    // console.log("On change");
    setText(event.target.value);
  };
  // const [index, setIndex] = useState(0);  SYNTAX
  const [text, setText] = useState("");
  // setText("New Text");
  
  return (
    <>
    <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>

      <h1>{props.heading}</h1>
      <div className="mb-3">
        {/* <label for="myBox" className="form-label">Example TextArea</label> */}
        <textarea className="form-control" style={{backgroundColor: props.mode==='light'?'white':'#414c56',color:props.mode==='dark'?'white':'black'}} onChange={handleOnChange} value={text} id="myBox" rows="10">
        </textarea>
      </div>
      <center>
        <br />
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to UpperCase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleDownClick}>Convert to LowerCase</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleSpeakClick}>Speak</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleSpaceClick}>Remove Extra Space</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleInverseClick}>Inverse Text</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCapitalize}>Capitalize Text</button>

      </center>
    </div>
    <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
      <h2>Your text summary</h2>
                                         {/* THIS  */}
      <p>{text.split(" ").filter((element) => {return element.length!==0}).length} Words and {text.length} characters</p>
      {/* <p>{props.extraSpace(text)} Words and {text.length} characters</p> */}
      {/* BOLD TAG  <b> */}
      <b> 
      <p>{0.008*text.split(" ").filter((element) => {return element.length!==0}).length} Minutes read</p>
      {/* <p>{0.008*props.extraSpace(text)} Minutes read</p> */}
                                       {/* TILL THIS  */}
      </b> 
      <h2>Preview</h2>
      <p>{text.length>0?text:"Nothing to Preview!"}</p>
      {/* <p>{text}</p> */}
    </div>
    </>
  );
}
