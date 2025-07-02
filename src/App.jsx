
import { useEffect, useState, memo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const CardsStyle = memo(({ p }) => {
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
});



function App() {

  useEffect(() => { 
    fetchPoliticians();
  }, []);

  const [politici, setPolitici] = useState([]);
  const position = [...new Set(politici.map(p => p.position))];
  position.unshift("All");
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


  const handleSubmit = (e)=>  {
    e.preventDefault();
    fetchPoliticians();

    // Reset the search input after submission
  }


  const filteredPolitici = politici.filter(p => {
    if(p.name.toLowerCase().includes(name.toLowerCase()) &&
    p.biography.toLowerCase().includes(name.toLowerCase()) &&  p.position === filterPosition)
      return p;
  });




  return <>
    <div className="d-flex justify-content-between mt-5">
      <h1>Politicians</h1>
      <div>
        <select value={filterPosition} onChange={e => setFilterPosition(e.target.value)}>
        {/* <option value="All">All Positions</option> */}
        {position.map((pos, i) => <option key={i} value={pos}>{pos}</option>)}
      </select>
      <form onSubmit={handleSubmit} className="d-flex align-items-center">

        <label htmlFor="search" className="visually-hidden">Cerca Politici</label>
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />

      </form>
      </div>
    </div>
    <div className="d-flex justify-content-center">


      <div className="politici-cards p-3 row col-6 flex-wrap gap-3">
        {name === "" && filterPosition === "All" ? politici.map((p, i) => <CardsStyle p={p} key={i} />) :
          filteredPolitici.map((p, i) => <CardsStyle p={p} key={i} />)}
        

      </div>
    </div>
  </>
}

export default App

