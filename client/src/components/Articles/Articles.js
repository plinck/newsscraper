import React from 'react';
import Article from './Article/Article';

class Articles extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [
                {
                    url: "./images/bamazon275x200.PNG",
                    title: "Swim Buoy",
                    body: "New Wave Swim Buoy"
                },
                {
                    url: "./images/BurgerLog275x200.PNG",
                    title: "Swim Buoy 2",
                    body: "New Wave Swim Buoy 2"
                }
            ]
        };
          
    }

    render() {
        return (
            <div className="row">
            {this.state.articles.map((info, i) => {
                return(<Article key={i} url={info.url} title={info.title} body={info.body} />);
            })}
            </div>
        );
    }
}

export default Articles;