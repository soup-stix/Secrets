import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
    return ( 
        <div className="home">
            <h1>Top-po Secreto🤫</h1>
            <h4>To Write a Secret Message:</h4>
            <p>
            Want to tell your friends something in secrecy but wanna make it into something unsuspecting?
            <br/>
            We got your back 😉,
            <br/>
            Just type a secret key word or phrase into the secret code and
            <br/>
            the message you wanna pass inconspicuously to your partner in crime.
            </p>
            <h4>To Read a Secret Message:</h4>
            <p>
            Its really easy as well,
            <br/>
            Just type in your secret code and the fake message you recieved.
            <br/>
            Voila! thats it only you can read the secretly coded message.
            </p>
            <h5>🤭Keep your Secret Code safe🤭</h5>
            <Link to="/Write" className="btn btn-dark"
            role="button"
            id="Write_btn"
            >Write</Link>
            <Link to="/Read" className="btn btn-dark"
            role="button"
            id="Read_btn"
            >Read</Link>
        </div>
     );
}
 