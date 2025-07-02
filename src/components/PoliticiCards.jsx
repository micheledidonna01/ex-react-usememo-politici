import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
const PoliticiCards = () => {

    const [politici, setPolitici] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    function getPolitici(){
        setLoading(true);
        axios.get("http://localhost:3333/politicians")
        .then((res) => setPolitici(res.data))
        .catch((err) => {
            setError(true);
            setMessage(err.message);
        })
        .finally(() => setLoading(false));
    }

    useEffect(getPolitici, []);

    if(loading) {
        return <div>Loading...</div>;
    }

    if(error){
        setMessage("An error occurred while fetching data.");
        return <div>Error: {message}</div>;
    }

    return <>
        <h1>Politicians</h1>
        <div className="d-flex justify-content-center">


        <div className="politici-cards p-3 row col-6 flex-wrap gap-3">
        {politici.map((p,i) => (
            <div className="card " key={i}>
                <img src={p.image} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                        <h3>{p.name}</h3>
                        <h4>{p.position}</h4>
                        <hr />
                        <p className="card-text">{p.biography}</p>
                    </div>
            </div>
        ))}
        </div>
        </div>
    </>

}

export default PoliticiCards;