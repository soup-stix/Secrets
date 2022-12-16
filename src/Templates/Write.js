import React, {useState, useEffect} from 'react';
import '../App.css';

export default function Write(){
    const [code, setcode] = React.useState({code: "", text: ""})
    const [fake, setfake] = React.useState("")

    function copy(){
        var Text = document.getElementById("fakeText");
        navigator.clipboard.writeText(Text.textContent);
        console.log(Text.textContent);
    }

    async function print (e) {
        e.preventDefault();
        var c =  document.getElementById("codeText").value
        var t =  document.getElementById("sentenceText").value
        document.getElementById("fake").hidden = false;
        //console.log("T: ", t)
        setcode((code) => {
            return {code: c, text: t}
        })
        console.log(code)
        await fetch("http://127.0.0.1:5000/write", {
     
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
            setfake(resJson)
            console.log(resJson)
        })

    }

    useEffect(() => {
        console.log(code)
    }, [code])

    return ( 
        <div className="read">
            <h1>Time to make a new Secret😉</h1>
            <form onSubmit={print} >
            <div className="form-group" id="readForm">
                <div className="label">
                    <label for="codeText">Secret Code:
                    </label>
                    <div className="help-tip">
                        <p>This is where you place your secret code given by your partner in crime.</p>
                    </div>
                </div>
                <input type="text" className="form-control" id="codeText" placeholder="Code" required/>
            </div>
            <div className="form-group">
                <div className="label">
                    <label for="sentenceText">Secret Sentance:
                    </label>
                    <div className="help-tip">
                        <p>This is where you place your fake sentence to reveal the hidden message.</p>
                    </div>
                </div>
                <input type="text" className="form-control" id="sentenceText" placeholder="Sentance" required/>
            </div>
            <button id="submit" type="submit" className="btn btn-dark">Fake Secret</button>
            </form>
            <div className="card" id="fake" hidden>
            <div className="bd-clipboard">
                <button className="btn-clipboard" onClick={copy}>copy</button>
            </div>
            <div className="card-body">
            <p id="fakeText">{fake}</p>
            </div>
            </div>
        </div>
     );
}
