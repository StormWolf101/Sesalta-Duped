import React from "react";
import SelectCountryFromFlag from "../components/quiz_questions/SelectCountryFromFlag";
import LinearDeterminate from '../components/LinearDeterminate';

interface Country {
  name: string;
  iso_a2: string;
}

interface P {}

interface S {
  gameID: string;
  optionsList: Country[];
  countryExpected?: Country;
  needNext: boolean;
  selectedIndex: number | undefined;
}

export default class GamePlayPageFlag extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      gameID: "",
      optionsList: [],
      countryExpected: undefined,
      needNext: false, // need to get next question or not
      selectedIndex: undefined
    };
  }

  getCountries(optionlist: any) {
    let res: any[] = [];
    optionlist.forEach((item: { name: string; iso_a2: string }) => {
      res.push({
        name: item.name,
        iso_a2: item.iso_a2
      });
    });
    return res;
  }

  async componentDidMount() {
    try {
      const id: string = await this.getGameID();
      console.log(id);
      this.setState({ gameID: id });

      const ops: [] = await this.getRandomCountryOptions();
      const countrylist: Country[] = this.getCountries(ops);
      console.log(countrylist);
      this.setState({
        optionsList: countrylist,
        countryExpected: countrylist[this.getRandomIndex(countrylist)]
      });
    } catch (e) {
      console.log(e);
    }
  }

  /*
    get game id for this game
  */
  getGameID(): Promise<string> {
    const url = "http://127.0.0.1:5000/api/country/new_game/";
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        console.log(response);
        return response;
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*
    get random options
  */
  getRandomCountryOptions() {
    const url = `http://127.0.0.1:5000/api/country/random/?amount=4&id=${this.state.gameID}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        console.log(response);
        return response;
      })
      .catch(e => {
        console.log(e);
      });
  }

  nextQuestionPlsCallback = async () => {
    // this.setState({ needNext: next })
    try {
      const ops: [] = await this.getRandomCountryOptions();
      const countrylist: Country[] = this.getCountries(ops);
      console.log(countrylist);
      this.setState({
        optionsList: countrylist,
        countryExpected: countrylist[this.getRandomIndex(countrylist)],
        selectedIndex: undefined
      });
    } catch (e) {
      console.log(e);
    }
  };

  indexCallback = (selectedIndex: number | undefined) => {
    console.log("oh");
    this.setState({ selectedIndex: selectedIndex });
  };

  getRandomIndex(countryList: Country[]) {
    return Math.floor(Math.random() * countryList.length);
  }

  render() {
  
    if (this.state.gameID !== "") {
      return (
        <div>
          <LinearDeterminate/>
          <SelectCountryFromFlag
            selectedIndex={this.state.selectedIndex}
            gameID={this.state.gameID}
            countryExpected={this.state.countryExpected}
            optionsList={this.state.optionsList}
            callback={this.nextQuestionPlsCallback}
            indexCallback={this.indexCallback}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
