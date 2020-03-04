// Define constants
const height = 768
const width = 1024
var margin = {top: 50, right: 20, bottom: 50, left: 120},
    innerwidth = width - margin.left - margin.right,
    innerheight = height/2 - margin.top - margin.bottom;
const dur1 = 6000
const dur2 = 1000
const path = 'https://raw.githubusercontent.com/LSQI15/MSiA-411_Final_Project/master/mirrored_%20histogram.csv?token=AGDCZM6FABUKWPRTTX7VV6S6MWSPG'

// Difine svgs

const G = d3.select("body").append("g")
    .attr("width", width)
    .attr("height", height)

const svg1 = d3.select("g").append("svg")
    .attr("width", width)
    .attr("height", height/2)

const svg2 = d3.select("g").append("svg")
.attr("width", width)
.attr("height", height/2)

// Draw bar chart
const render1 = (myData,svg) => {
    //set chart position
    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`);      
        
    //x Axis
    const xValue = d => d.yearmonth;
    const xScale = d3.scaleBand()
        .domain(myData.map(xValue))
        .range([0,innerwidth])
    
    //y Axis    
    const yValue = d => d.Nvictim;
    const yScale = d3.scaleLinear()
        .domain([2000,4685])
        .range([0,innerheight]);

    const yAxisG = g.append('g').call(d3.axisLeft(yScale))

    yAxisG.selectAll('.domain, .tick line').remove();

    //y Axis label
    yAxisG.append('text')
    .attr("class","axis-label")
    .attr("y", - margin.left/2)
    .attr("x", - (innerheight/3))
    .attr("transform", "rotate(-90)")
    .text("# of VICTIMS");

    //Draw bars
    g.selectAll('rect').data(myData)
    .enter().append('rect')
    .attr('x', d => xScale(d.yearmonth))
    .attr('width',xScale.bandwidth())
    .attr("fill", "#BD2D28")
    // no bar at the beginning thus:
    .attr('height', d => yScale(2000))
    //.attr("stroke","#BD2D28");


    g.append('text')
    .attr('class','innertext')
    .attr('transform',`translate(${margin.left},${innerheight + margin.bottom/2})`)
    .text("The BLOODY FACT")
    .attr("fill", "#BD2D28")

    g.append('text')
    .attr('class','innertext')
    .attr('transform',`translate(${margin.left + 375},${innerheight + margin.bottom/2})`)
    .text("of")
    .attr("fill", "#C8C6C6")

    // Animation
    g.selectAll("rect")
    .transition()
    .duration(dur1)
    .attr("height", d => yScale(d.Nvictim))
    //.delay((d,i) => i*100)
    .delay(dur1)

}


const render2 = (myData,svg) => {
    //set chart position
    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`);
            
        
    //x Axis
    const xValue = d => d.yearmonth;
    const xScale = d3.scaleBand()
        .domain(myData.map(xValue))
        .range([0,innerwidth])

    const xAxis = d3.axisBottom(xScale)

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform',`translate(0,${innerheight})`)
    
    xAxisG.selectAll('.domain').remove();
    //x Axis label
    xAxisG.append('text')
        .attr("class","axis-label")
        .attr("y", margin.bottom/1.2)
        .attr("x",innerwidth/2);
        
    xAxisG
        .selectAll('text')
        .attr('transform', 'rotate(45) translate(7, -8)')
        .style('text-anchor', 'start');

    //y Axis    
    const yValue = d => d.n_guns_involved;
    const yScale = d3.scaleLinear()
        .domain([0,7446])
        .range([innerheight,0]);

    const yAxisG = g.append('g').call(d3.axisLeft(yScale))

    yAxisG.selectAll('.domain, .tick line').remove();

    //y Axis label
    yAxisG.append('text')
    .attr("class","axis-label")
    .attr("y", - margin.left/2)
    .attr("x", - (innerheight/4))
    .attr("transform", "rotate(-90)")
    .text("# of GUNS INVOLOVED");

    //Draw bars
    g.selectAll('rect').data(myData)
    .enter().append('rect')
    .attr('x', d => xScale(d.yearmonth))
    .attr('width',xScale.bandwidth())
    .attr("fill", "#000000")
    .attr('y', d => yScale(d.n_guns_involved))
    .attr('height', d => innerheight-yScale(d.n_guns_involved))
    //no bar at the beginning thus:
    .attr('y', d => yScale(0))
    .attr('height', d => innerheight-yScale(0))
    .attr("stroke","#000000");

    g.append('text')
    .attr('class','innertext')
    .attr('transform',`translate(${margin.left},-${margin.top/2.5})`)
    .text("GUN VIOLENCE")
    .attr("fill", "#000000")

    // Animation
    g.selectAll("rect")
    .transition()
    .duration(dur2)
    .attr("y", d => yScale(d.n_guns_involved))
    .attr("height", d => innerheight - yScale(d.n_guns_involved))
    .delay((d,i) => i*100)
    //.delay(0)
}

//import data

//svg1
d3.csv(path).then(myData => {
    myData.forEach(d => {
        d.Nvictim = + d.Nvictim
        d.n_guns_involved = +d.n_guns_involved     
    });
    myData.sort(function(a, b) {
        return d3.ascending(a.yearmonth, b.yearmonth)
    });
    render1(myData,svg1)
})

//svg2
d3.csv(path).then(myData => {
    myData.forEach(d => {
        d.Nvictim = + d.Nvictim
        d.n_guns_involved = +d.n_guns_involved     
    });
    myData.sort(function(a, b) {
        return d3.ascending(a.yearmonth, b.yearmonth)
    });
    render2(myData,svg2)
})
