import React from 'react';
import * as d3 from 'd3';

export default class Chart extends React.Component {

    constructor(props){
        super(props);
        this.drawChart = this.drawChart.bind(this);
        this.dataStructure = {
            date: 0,
            close: 4
        };
    }

    componentDidMount(){
        this.setState({
            data: []
        });
    };

    componentDidUpdate(prevProps){
        if(prevProps.company !== this.props.company){
            this.fetchData();
        }
    }

    fetchData =  () => {
        const API_KEY = 'wnRxqnqKYLh6zyeMcS5a';
        let eodEndpoint = 'https://www.quandl.com/api/v3/datasets/EOD/'+this.props.company+'.json?api_key=' + API_KEY;

        fetch(eodEndpoint)
            .then(res => res.json())
            .then(result =>
                {
                    if(result.dataset){
                        console.log(result,this);
                        let date = this.dataStructure.date;
                        let close = this.dataStructure.close;
                        let data = result.dataset.data.map(function (element) {
                            return {
                                date: new Date(element[date]),
                                value: element[close]
                            }
                        });
                        this.setState({
                            data: data
                        });

                        this.drawChart();
                    }
                }
            )
    };

   drawChart =  () => {
       let svg = d3.select(this.node);
       svg.selectAll("*").remove();

       let data = this.state.data;

       data.map(function (element) {
          return element.date = new Date(element.date);
       });

       let [svgWidth, svgHeight] = [900, 500];
       let margin = { top: 20, right: 20, bottom: 30, left: 50 };
       let width = svgWidth - margin.left - margin.right;
       let height = svgHeight - margin.top - margin.bottom;


       svg.attr("width", svgWidth)
           .attr("height", svgHeight);

       //graph

       let g = svg.append("g")
           .attr("transform",
               "translate(" + margin.left + "," + margin.top + ")"
           );

       //scale

       let x = d3.scaleTime().rangeRound([0, width]);
       let y = d3.scaleLinear().rangeRound([height, 0]);

       ///the line

       let line = d3.line()
           .x(function(d) { return x(d.date)})
           .y(function(d) { return y(d.value)})
       x.domain(d3.extent(data, function(d) { return d.date }));
       y.domain(d3.extent(data, function(d) { return d.value }));

       g.append("g")
           .attr("transform", "translate(0," + height + ")")
           .call(d3.axisBottom(x))
           .select(".domain")
           .remove();

       g.append("g")
           .call(d3.axisLeft(y))
           .append("text")
           .attr("fill", "#000")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text("Price ($)");

       g.append("path")
           .datum(data)
           .attr("fill", "none")
           .attr("stroke", "steelblue")
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", 1.5)
           .attr("d", line);

    };

    render (){
        return (
           <div>
               <svg ref={node => this.node = node}/>
           </div>
        )
    }
}