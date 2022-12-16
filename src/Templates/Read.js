import React, {useState, useEffect} from 'react';
import '../App.css';

export default function Read(){
    const [code, setcode] = React.useState({code: "", text: ""})
    const [original, setdata] = useState("");

    function copy(){
        var Text = document.getElementById("fakeText");
        navigator.clipboard.writeText(Text.textContent);
        console.log(Text.textContent);
    }

    // const print = () => {console.log(code)}
    function print (e) {
        e.preventDefault();
        // setcode(e.target.value)
        //console.log(e.target.value)
        var c =  document.getElementById("codeText").value
        var t =  document.getElementById("sentenceText").value
        document.getElementById("fake").hidden = false;
        //console.log("T: ", t)
        setcode(() => {
            return {code: c, text: t}
        })
        console.log(code)
        fetch("http://127.0.0.1:5000/read", {
     
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify(code),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        
        // Converting to JSON
        .then((res) => res.json()).then((resJson) => {
            setdata(resJson)
            console.log(resJson)
        })

    }

    useEffect(() =>{
        console.log(code);
        /*fetch("http://127.0.0.1:5000/send").then((res) => res.json()).then((resJson) => {
        //setdata(resJson.data);
        console.log(resJson)
        })*/
        //console.log(original)
    }, [code, original]);


    return ( 
        <div className="read">
            <h1>Lets see what you got there🤔</h1>
            <form onSubmit={print} >
            <div className="form-group" id="readForm">
                <div className="label">
                    <label for="sentenceText">Secret Code:
                    </label>
                    <div className="help-tip">
                        <p>This is where you place your secret code you desire for your partner in crime.</p>
                    </div>
                </div>
                <input type="text" className="form-control" id="codeText" placeholder="Code" required/>
            </div>
            <div className="form-group">
                <div className="label">
                    <label for="sentenceText">Fake Sentance:
                    </label>
                    <div className="help-tip">
                        <p>This is where you place your real sentence to make a dummy one.</p>
                    </div>
                </div>
                <input type="text" className="form-control" id="sentenceText" placeholder="Sentance" required/>
            </div>
            <button id="submit" type="submit" className="btn btn-dark">Reveal Secret</button>
            </form>
            <div className="card" id="fake" hidden>
            <div className="bd-clipboard">
                <button className="btn-clipboard" onClick={copy}>copy</button>
            </div>
            <div className="card-body">
            <p id="fakeText">{original}</p>
            </div>
            </div>
        </div>
     );
}
