

const drumpads = [
  {id:'Q',text:'Q',src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {id:'W',text:'W',src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
  {id:'E',text:'E',src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
  {id:'A',text:'A',src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
  {id:'S',text:'S',src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
  {id:'D',text:'D',src:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
  {id:'Z',text:'Z',src:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
  {id:'X',text:'X',src:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},
  {id:'C',text:'C',src:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'},
]

const SoundButton = ({children,id,src,encoding="audio/mpeg",buttonPressed,display}) => {
  const ref = React.useRef();
  const parentRef = React.useRef();
  const handleClick = React.useCallback(() => {
    if (ref.current === undefined) return;
    ref.current.play();
    display(ref.current.id);
  }, []);
  
  React.useEffect(()=>{
    const loweredRefId =ref.current.id.toLowerCase();
    const checkKey = buttonPressed == ref.current.id || buttonPressed == loweredRefId;
    if(buttonPressed && checkKey) {
      if(ref.current.paused){
        console.log(parentRef.current.click());
      }
    }
  },[buttonPressed]);
  
  return (
      <button className="drum-pad" id={id} ref={parentRef} onClick={handleClick} >
        {children}
        <audio className="clip" src={src} ref={ref} id={id}/> 
      </button>
  )
}


const App = () => {
  const [currentKey,setCurrentKey] = React.useState("");
  const [displayText,setDisplayText] = React.useState("None");
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  
  const handleKeyUp = e => {
    setCurrentKey("");
  }
  const handleKeyDown = e => {
    setCurrentKey(e.key);
  }

  return (
    <div id="drum-machine">
      <div id="drum-items-container">
        <h2>DRUM MACHINE</h2>
        <div id="display">{displayText}</div>
        <div id="button-container"> 
          {drumpads.map( (el,idx)=> 
                   <SoundButton id={el.id} src={el.src} key={idx} buttonPressed={currentKey} display={setDisplayText}> {el.text}</SoundButton> )}
        </div>
      </div>
    </div>
  )
}



ReactDOM.render(<App/>,document.getElementById("root"));