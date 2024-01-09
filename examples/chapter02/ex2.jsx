// p.144
var Aquarium = (props) => {
  var fish = getFish(props.species);
  return <Tank>{fish}</Tank>;
};

var Aquarium = ({ species }) => <Tank>{getFish(species)}</Tank>;