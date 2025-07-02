
import { useEffect, useState, memo, useMemo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const CardsStyle = ({ p }) => {
  console.log("card");
  return <>
    <div className="card ">
      <img src={p.image} className="card-img-top" alt={p.name} />
      <div className="card-body">
        <h3>{p.name}</h3>
        <h4>{p.position}</h4>
        <hr />
        <p className="card-text">{p.biography}</p>
      </div>
    </div>
  </>
};

const MemorizedPoliticiansCard = memo(CardsStyle);


function App() {

  useEffect(() => {
    fetchPoliticians();
  }, []);



  const [politici, setPolitici] = useState([]);
  const position = useMemo(() => { return politici.reduce((acc, politico) => {
    if(!acc.includes(politico.position)){
      return [...acc, politico.position];
    }
    return acc;
  },[])}, [politici]);
  console.log(position);

  const [filterPosition, setFilterPosition] = useState("");
  const [name, setName] = useState("");



  async function fetchPoliticians() {


    try {
      let prendiPolitici = await fetch(`http://localhost:3333/politicians`);
      let politiciResult = await prendiPolitici.json();

      setPolitici(politiciResult);

    } catch (error) {
      console.error("Error fetching politicians:", error);

      setPolitici([]);
    }


  }

  // fetchPoliticians()
  //   .then(res => res)
  //   .catch(err => {
  //     console.error("Error:", err);
  //   });

  // Reset the search input after submission



  const filteredPolitici = useMemo(() => {
    return politici.filter((p) => {
      const isInName = p.name.toLowerCase().includes(name.toLowerCase());
      const isInBiography = p.biography.toLowerCase().includes(name.toLowerCase());
      const isPositionValid = filterPosition === "" || p.position === filterPosition;
      //const isInFilterPosition = p.position === filterPosition;

      return (isInBiography || isInName) && isPositionValid;
    })
  }, [politici, name, filterPosition]);






  return <>
    <div className="d-flex justify-content-between mt-5">
      <h1>Politicians</h1>
      <div>
        <select value={filterPosition} onChange={e => setFilterPosition(e.target.value)}>
        <option value="">All Positions</option>
         {position.map((pos, i) => <option key={i} value={pos}>{pos}</option>)}
      </select>

        <label htmlFor="search" className="visually-hidden">Cerca Politici</label>
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Cerca Politici o biografia"
        />

      </div>
    </div>
    <div className="d-flex justify-content-center">


      <div className="politici-cards p-3 row col-6 flex-wrap gap-3">
        
          {filteredPolitici.map((p, i) => <MemorizedPoliticiansCard p={p} key={i} />)}


      </div>
    </div>
  </>
}

export default App

