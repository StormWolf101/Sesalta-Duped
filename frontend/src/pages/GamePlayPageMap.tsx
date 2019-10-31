// import QuizElement from '../components/quiz_questions/QuizElement';
import React from 'react';
import SelectCountryOnMap from '../components/quiz_questions/SelectCountryOnMap'
// import AnswerComponent from "../components/quiz_questions/AnswerComponent";


interface P {

}

interface S {
  gameID: string,
  optionsList: string[],
  needNext: boolean,
}

export default class GamePlayPage extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      gameID: "",
      optionsList: [],
      needNext: false, // need to get next question or not
    }
  }

  getCountries(optionlist: any) {
    let res: any[] = []
    optionlist.forEach((item: { name: any; }) => {
      res.push(item.name);
    })
    return res;
  }

  async componentDidMount() {
    try {
      const id: string = await this.getGameID();
      console.log(id);
      this.setState({ gameID: id });
      
      const ops: [] = await this.getRandomCountryOptions();
      const countrylist: string[] = this.getCountries(ops);
      console.log(countrylist);
      this.setState({ optionsList: countrylist });
    } catch (e) {
      console.log(e);
    }
  }

  /*
    get game id for this game
  */
  getGameID(): Promise<string> {
    const url = "http://127.0.0.1:5000/api/country/new_game/"
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response: any) => response.json())
    .then((response: any) => {
      console.log(response);
      return response;
    })
    .catch((e) => {
      console.log(e);
    });
  }

  /*
    get random options
  */
  getRandomCountryOptions() {
    const url = `http://127.0.0.1:5000/api/country/random/?amount=4&id=${this.state.gameID}`
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response: any) => response.json())
    .then((response: any) => {
      console.log(response);
      return response;
    })
    .catch((e) => {
      console.log(e);
    });
  }

  nextQuestionPlsCallback = async() => {
    // this.setState({ needNext: next })
    try {
      const id: string = await this.getGameID();
      console.log(id);
      this.setState({ gameID: id });
      
      const ops: [] = await this.getRandomCountryOptions();
      const countrylist: string[] = this.getCountries(ops);
      console.log(countrylist);
      this.setState({ optionsList: countrylist });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (this.state.gameID !== "") {
      return (
        <div>
          <SelectCountryOnMap />
        </div>
      )
    } else {
      return null
    }
  }
}
