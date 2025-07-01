import './App.css';
import React from "react";
import * as d3 from "d3";
import images_data from "./Data/data.csv?raw";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Gallery from './Gallery.jsx';
import { FormGroup, FormControl, FormLabel, FormControlLabel, Checkbox, Stack, Alert, Radio, RadioGroup } from '@mui/material';
import Legend from './Legend.jsx';

const App = (props) => {
  const [idata, setIData] = React.useState([])
  const [filtered, setFilteredData] = React.useState([])
  const [courses, setCourses] = React.useState([])
  const [vis, setVis] = React.useState([])
  const [mean, setMean] = React.useState("all")
  const [consensus, setConsensus] = React.useState("all")
  const coursesData = [
    {value: "A", label: "Course A"},
    {value: "B", label: "Course B"},
    {value: "C", label: "Course C"},
    {value: "D", label: "Course D"},
    {value: "E", label: "Course E"},
    {value: "F", label: "Course F"},
    {value: "G", label: "Course G"},
    {value: "H", label: "Course H"},
    {value: "I", label: "Course I"},
    {value: "J", label: "Course J"},
  ]
  const visData = [
    {value: "diverging stacked bar chart", label: "Diverging Stacked Bar Chart"},
    {value: "heatmap", label: "Heatmap"},
    {value: "pie chart", label: "Pie Chart"},
    {value: "grouped bar chart", label: "Grouped Bar Chart"},
    {value: "waffle chart", label: "Waffle Chart"},
    {value: "scatter plot", label: "Scatter Plot"},
  ]
  const meanData = [
    {value: 'low', label: 'less than 3'},
    {value: 'high', label: 'greater than or equal 3'},
    {value: 'all', label: 'all'},
  ]
  const consensusData = [
    {value: 'low', label: 'less than 0.5'},
    {value: 'high', label: 'greater than or equal 0.5'},
    {value: 'all', label: 'all'},
  ]

  React.useEffect(() =>{
    setIData(d3.csvParse(images_data))
    setFilteredData(d3.csvParse(images_data))
  }, [])

  const handleCoursesChange = (event) =>{
    if(event.target.getAttribute("name")){
      event.preventDefault();
      let val = event.target.getAttribute("name")
      let arr = [...courses]
      if (arr.indexOf(val) != -1){
        arr = arr.filter(item => item !== val)
      }
      else{
        arr.push(val)
      }
      setCourses(arr)
    }
  }

  const handleVisChange = (event) =>{
    if(event.target.getAttribute("name")){
      event.preventDefault();
      let val = event.target.getAttribute("name")
      let arr = [...vis]
      if (arr.indexOf(val) != -1){
        arr = arr.filter(item => item !== val)
      }
      else{
        arr.push(val)
      }
      setVis(arr)
    }
  }

  const handleMeanChange = (event) => {
    setMean(event.target.value);
  };

  const handleConsensusChange = (event) => {
    setConsensus(event.target.value);
  }

  React.useEffect(() => {
    let temp = [...idata]
    if(vis.length > 0){
      temp = temp.filter(item => vis.indexOf(item.chart_type) !== -1)
    }

    if(courses.length > 0){
      temp = temp.filter(item => courses.indexOf(item.course) !== -1)
    }

    if(mean !== "all"){
      if(mean == "low"){
        temp = temp.filter(item => item.mean_threshold == "low")
      }
      else{
        temp = temp.filter(item => item.mean_threshold == "high")
      }
    }

    if(consensus !== "all"){
      if(consensus == "low"){
        temp = temp.filter(item => item.consensus_threshold == "low")
      }
      else{
        temp = temp.filter(item => item.consensus_threshold == "high")
      }
    }


    setFilteredData(temp)
  }, [idata, vis, courses, mean, consensus])

  return (
      <Stack direction="column">
        <Typography variant="h4" gutterBottom sx={{color:'#9e9e9e'}}> Course Evaluation Visualization Gallery </Typography>
        <Stack direction="row">
          <Stack direction="column">
            <Legend />
            <FormControl sx={{ m: 1, p:0}} component="fieldset" variant="standard">
              <FormLabel component="legend" sx={{ m: 0, p:0}}>Select Courses:</FormLabel>
              <FormGroup sx={{pl: 1}}>
                {coursesData.map((element) => {
                  return(
                    <FormControlLabel
                      key={element.value}
                      control={
                          <Checkbox sx={{ m: 0, p:0 }} size="small" onChange={handleCoursesChange} name={element.value} />
                      }
                      label={element.label}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 1, p:0}} component="fieldset" variant="standard">
              <FormLabel component="legend">Select Visualizations:</FormLabel>
              <FormGroup sx={{pl: 1}}>
                {visData.map((element) => {
                  return(
                    <FormControlLabel
                      key={element.value}
                      control={
                          <Checkbox sx={{ m: 0, p:0 }} size="small" onChange={handleVisChange} name={element.value} />
                      }
                      label={element.label}
                    />
                  )
                })}
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 1, p:0}} component="fieldset" variant="standard">
              <FormLabel component="legend">See Mean Ratings (0-4):</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={mean}
                onChange={handleMeanChange}
                sx={{ pl:1 }}
              >
                {meanData.map((element) => {
                  return(
                    <FormControlLabel
                      key={element.value}
                      value={element.value}
                      control={ <Radio sx={{ m: 0, p:0 }} size="small"/> }
                      label={element.label}
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1, p:0}} component="fieldset" variant="standard">
              <FormLabel component="legend">See Consensus (0-1):</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={consensus}
                onChange={handleConsensusChange}
                sx={{ pl:1 }}
              >
                {consensusData.map((element) => {
                  return(
                    <FormControlLabel
                      key={element.value}
                      value={element.value}
                      control={ <Radio sx={{ m: 0, p:0 }} size="small"/> }
                      label={element.label}
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>
            <Alert variant="outlined" severity='info'>Click on an image to view it in more detail</Alert>
          </Stack>
          <Gallery data={filtered} />
        </Stack>
      </Stack>
  )
}

export default App
