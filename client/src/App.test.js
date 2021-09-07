// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"
import store from './Store/store';
import Card from './Components/Card/Card';
import Filter  from './Components/Filter/Filter';

  const poke = {
    
    name: "pikachu",
    height:100,
    weight:100,
    types:['fire', 'normal']
  }
describe("Order Pokemon By Name ASC and DESC", () => {
  it("It has one element to order from A to Z called az and from Z to A za", () => {
    render(
      <Provider store={store}>
        <Router>
          <Filter />
        </Router>
      </Provider>
    );
    const asc = screen.getByText("A - Z");
    const desc = screen.getByText("Z - A");
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });
  it("Cards component shows pokemons info", () => {
    render(
      <Provider store={store}>
        <Router>
        <Card  name={poke.name} height={poke.height} weight={poke.weight} types={poke.types}/>
        </Router>
      </Provider>
    );
    const Name = screen.getByText("pikachu")
    expect(Name).toBeInTheDocument();
  })
});


