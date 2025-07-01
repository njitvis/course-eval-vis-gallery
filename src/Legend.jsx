import React from "react";
import * as d3 from "d3";
import { Stack, Typography } from '@mui/material';

const Legend = (props) => {
    const svgRef = React.useRef(null);
    const svg2Ref = React.useRef(null);
    var keys = ["Excellent", "Good", "Satisfactory", "Fair", "Poor"]
    var colors = ["#4E79A7", "#A0CBE8", "#BAB0AC", "#FF9D9A", "#E15759"]
    var keys2 = ["100%", "80%", "60%", "40%", "20%"]
    var colors2 = ["#59504e", "#786f6d", "#98908c", "#bab1ac", "#dcd4d0"]

    React.useEffect(() => {
        var svg = d3.select(".legend_container")
        var colorScale = d3.scaleOrdinal()
                            .domain(keys)
                            .range(colors);
        
        var size = 20
        svg
        .selectAll(".mydots")
        .data(keys)
        .join("rect")
        .attr("id", "mydots")
        .attr("class", "mydots")
            .attr("x", 20)
            .attr("y", function(d,i){ return 10 + i*(size+5)})
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d){ return colorScale(d)})

        svg
        .selectAll(".mylabels")
        .data(keys)
        .join("text")
        .attr("id", "mylabels")
        .attr("class", "mylabels")
            .attr("x", 17 + size*1.2)
            .attr("y", function(d,i){ return 13 + i*(size+5) + (size/2)})
            .style("fill", function(d){ return colorScale(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

    }, [svgRef])

    React.useEffect(() => {
        var svg = d3.select(".legend2_container")
        var colorScale = d3.scaleOrdinal()
                            .domain(keys2)
                            .range(colors2);
        
        var size = 20
        svg
        .selectAll(".mydots2")
        .data(keys2)
        .join("rect")
        .attr("id", "mydots2")
        .attr("class", "mydots2")
            .attr("x", 20)
            .attr("y", function(d,i){ return 10 + i*(size+5)})
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d){ return colorScale(d)})

        svg
        .selectAll(".mylabels1")
        .data(["100%"])
        .join("text")
        .attr("id", "mylabels1")
        .attr("class", "mylabels1")
            .attr("x", 17 + size*1.2)
            .attr("y", 13 + (size/2))
            .style("fill", "gray.500")
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

        svg
        .selectAll(".mylabels2")
        .data(["0%"])
        .join("text")
        .attr("id", "mylabels2")
        .attr("class", "mylabels2")
            .attr("x", 17 + size*1.2)
            .attr("y", 13 + 4*(size+5) + (size/2))
            .style("fill", "gray.500")
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

    }, [svg2Ref])

    return (
        <Stack direction="row" id="legend">
            <Stack direction="column">
                <Typography sx={{fontSize: "1em", color:'#757575'}}>Response Categories</Typography>
                <svg
                    ref={svgRef}
                    id="legend_container"
                    className={"legend_container"}
                    style={{ width: "170px", height: "100%" }}
                ></svg>
            </Stack>
            <Stack direction="column">
                <Typography sx={{fontSize: "1em", color:'#757575'}}>Responses (%)</Typography>
                <svg
                    ref={svg2Ref}
                    id="legend2_container"
                    className={"legend2_container"}
                    style={{ width: "170px", height: "100%" }}
                ></svg>
            </Stack>
        </Stack>
    )
}

export default Legend
