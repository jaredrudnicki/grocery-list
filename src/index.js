// import axios from "axios"
import ReactDOM from 'react-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './index.css'

import React, { useEffect } from 'react'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Container, Row, Col } from 'react-bootstrap';
//import $ from 'jquery';
//import Popper from 'popper.js';

const shops = [
  {
    name: 'petes coffee',
    menu: {
      latte: 5,
      espresso: 5
    }
  },
  {
    name: 'starbucks',
    menu: {
      latte: 3,
      espresso: 3
    }
  }
]

const section1 = ["apples", "bananas", "grapes", "onions", "lettuce", "spinach"]
const section2 = ["chicken", "steak", , "pork", "brisket"]
const section3 = ["shredded cheese", "butter", "eggs", "sour cream"]


/*class Table extends Component {
  render() {
    console.log(shops);
    return (
      <div>
        
        {shops.map((coffeeshop) => {
          return (
            <CoffeeShop name={coffeeshop.name} latte={coffeeshop.menu.latte} espresso={coffeeshop.menu.espresso}/>
          )
        })}
        <h1>Add New Coffee Shop</h1> 
        <Form />

        {Data.map((metadata, index) => {
          return (
            <div>
            <h3>{metadata.id}</h3>
            <h3>{metadata.todo}</h3>
            </div>
        )})}
      </div>
    )
  }
}*/

function FoodItem(props) {
  const { name, id, section } = props;

  function handleDelete(event) {
    fetch('https://jr-grocery-list.herokuapp.com/groceryList/' + id, {
      method: 'DELETE',
    })
    window.location.reload();
  }

  return (
    <Row>
      <Col><p>{section}: {name}</p></Col>
      <Col xs={8}><CloseButton onClick={handleDelete} /></Col>
    </Row>
  )
}

function CoffeeShop(props) {
  const { name, latte, espresso } = props;
  return (
    <div id={name}>
      <h1 id={name}>{name}</h1>
      <p>latte: {latte}</p>
      <p>espresso: {espresso}</p>
      <hr />
    </div>
  )

}


function App() {
  //var myHeaders = new Headers();
  //myHeaders.append("Authorization", "Token ffbe36852c8f3ce3e01b72301fb15f8e48a26a1b");
  //myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  //myHeaders.append("Cookie", "csrftoken=eIG0BPZIJTrVLfqhWYlaB4TpyMDKCZRgKGMAihOcA8zGglO4YkrpvWqepuQrjeWg");

  var requestOptions = {
    method: 'GET',
    //headers: myHeaders,
    //redirect: 'follow',
  };

  function getSection(item) {
    if (produceSection.includes(item)) {
      console.log('produce');
      return 'produce';
    } else if (meatSection.includes(item)) {
      console.log('meat');
      return 'meat';
    } else if (dairySection.includes(item)) {
      console.log('dairy');
      return 'dairy';
    } else {
      console.log('misc.');
      return 'misc';
    }
  }




  const [list, setList] = React.useState(shops);
  const [produceSection] = React.useState(section1);
  const [meatSection] = React.useState(section2);
  const [dairySection] = React.useState(section3);

  const [shoppingItem, setShoppingItem] = React.useState('');
  const [groceryList, setGroceryList] = React.useState([]);
  //change to axios call to get Coffee Shops
  const [shopName, setShopName] = React.useState('');
  const [lattePrice, setLattePrice] = React.useState('');
  const [espressoPrice, setEspressoPrice] = React.useState('');

  function getSectionPage(event) {
    event.preventDefault();
    let url = "https://jr-grocery-list.herokuapp.com/groceryList?section=" + event.target.innerHTML;
    if (event.target.innerHTML === "all") {
      url = "https://jr-grocery-list.herokuapp.com/groceryList"
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then((data) => {
        setGroceryList(data)
        //setGroceryList([...this.groceryList, data])
        /*const json = JSON.stringify(data)

        const o = JSON.parse(json)
        for (let i = 0; i < data.length; i++) {
          console.log(o[i].item)
          groceryList.push(o[i].item)
        }*/

      });
  }

  useEffect(() => {
    fetch("https://jr-grocery-list.herokuapp.com/groceryList?_sort=section", requestOptions)
      .then(response => response.json())
      .then((data) => {
        setGroceryList(data)
        //setGroceryList([...this.groceryList, data])
        /*const json = JSON.stringify(data)

        const o = JSON.parse(json)
        for (let i = 0; i < data.length; i++) {
          console.log(o[i].item)
          groceryList.push(o[i].item)
        }*/

      });
  }, []);


  function handleAdd(event) {
    //change to axios api call adding a user
    //no need to reset current list
    //event.preventDefault();
    //get section 
    let section = getSection(shoppingItem);
    //create body
    const groceryBody = {
      item: shoppingItem,
      section: section
    }
    //make post request
    fetch('https://jr-grocery-list.herokuapp.com/groceryList', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(groceryBody)
    })

    /*const newList = list.concat({ 
      name: shopName,
      menu: {
        latte: lattePrice,
        espresso: espressoPrice
      } 
    });
    setList(newList);
    //clear text input
    setShopName('');
    setEspressoPrice('');
    setLattePrice('');
    console.log(newList)*/
  }

  function handleChange(event) {
    if (event.target.id === 'shopNameInput') {
      setShopName(event.target.value);
    } else if (event.target.id === 'lattePriceInput') {
      setLattePrice(event.target.value);
    } else if (event.target.id === 'espressoPriceInput') {
      setEspressoPrice(event.target.value);
    } else if (event.target.id === 'shoppingItem') {
      setShoppingItem(event.target.value);
    }
  }


  return (
    <Container>
      <Row>
        <FoodItem name='salmon' id='33' section='meat' />
      </Row>

      <div>
        <DropdownButton id="dropdown-basic-button" title="Grocery Section">
          <Dropdown.Item href="" onClick={getSectionPage}>all</Dropdown.Item>
          <Dropdown.Item href="produce-section" onClick={getSectionPage}>produce</Dropdown.Item>
          <Dropdown.Item href="dairy-section" onClick={getSectionPage}>dairy</Dropdown.Item>
          <Dropdown.Item href="meat-section" onClick={getSectionPage}>meat</Dropdown.Item>
          <Dropdown.Item href="misc-section" onClick={getSectionPage}>misc</Dropdown.Item>
        </DropdownButton>
        {Object.keys(groceryList).map(key => {
          return <FoodItem name={groceryList[key].item} id={groceryList[key].id} section={groceryList[key].section} />
        })}

        {list.map((coffeeshop) => {
          return (
            <CoffeeShop name={coffeeshop.name} latte={coffeeshop.menu.latte} espresso={coffeeshop.menu.espresso} />
          )
        })}
        <form>
          <label>add grocery item</label>
          <input type='text' value={shoppingItem} id='shoppingItem' onChange={handleChange}></input>
          {/*<label>shop-name</label> <br />
        <input type='text' value={shopName} id='shopNameInput' onChange={handleChange}></input><br />
        <label>latte price</label><br />
        <input type='text' value={lattePrice} id='lattePriceInput' onChange={handleChange}></input><br />
        <label>espresso price</label><br />
        <input type='text' value={espressoPrice} id='espressoPriceInput' onChange={handleChange}></input><br />
        */}
          <input type='submit' id='btnSubmit' onClick={handleAdd}></input><br />
        </form>
      </div>
    </Container>
  )
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))