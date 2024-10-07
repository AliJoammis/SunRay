import { BarChart } from '@mui/x-charts/BarChart';
import React, { useEffect, useState } from 'react'
import { getAllVacations } from '../../../services/vacationsServices';
import { getAllUsersFollowingParticularVacation } from '../../../services/followersServices';
import './vacationsChart.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

interface NumOfFollowersForEachVacation {
  destination: string;
  numOfFollowers: number;
}

export const VacationsChart = () => {
  
  const navigate = useNavigate();
  const [destinationsFollowers, setDestinationsFollowers] = useState<NumOfFollowersForEachVacation[]>([]);

  useEffect(() => {

    const getNumOfFollowersForEachVacation= async () =>{
      
        const allVacations = await(getAllVacations());

        const numOfFollowersForEachVacation = allVacations.map(async vacation => ({
          destination: vacation.destination,
          numOfFollowers: (await (getAllUsersFollowingParticularVacation(`${vacation.id}`))).length
        }));
      
        const resolvedNumOfFollowersForEachVacation = await Promise.all(numOfFollowersForEachVacation);
        setDestinationsFollowers(resolvedNumOfFollowersForEachVacation);
    };
    getNumOfFollowersForEachVacation();

  },[]);

  const allDestinationsArray = destinationsFollowers.map(vacation => vacation.destination);
  const numOfFollowersForEachVacationArray = destinationsFollowers.map(vacation => vacation.numOfFollowers);
  
  const allDestinationsArraySplit = allDestinationsArray.map(destination => destination.split('-')[0]);
  const createCSVContent = () =>{
    const transformedData = destinationsFollowers.flatMap(({ destination, numOfFollowers }) => 
                              [destination, numOfFollowers]);
  
    const resultString = JSON.stringify(transformedData).slice(1, -1).replace(/(\d+),/g, '$1\n');
    const csvFileContent = "Destination, Followers\n" + resultString;
    return csvFileContent;

  }

  function downloadCsvFile() {
    // Create content for the file
    const fileContent = createCSVContent();
    
    // Create a Blob from the content
    const blob = new Blob([fileContent], { type: 'text/plain' });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create an anchor element and set its href to the Blob URL
    const a = document.createElement('a');
    a.href = url;
  
    // Set the file name
    a.download = 'followersStatistics.csv';
  
    // Append the anchor to the document body
    document.body.appendChild(a);
  
    // Simulate a click on the anchor to trigger the download
    a.click();
  
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // make array of bar colors, highlighting max/min
  const minVal = Math.min(...numOfFollowersForEachVacationArray);
  const maxVal = Math.max(...numOfFollowersForEachVacationArray);
  const barColors = numOfFollowersForEachVacationArray.map((val) => {
    if (val === minVal) {
      return "red";
    } else if (val === maxVal) {
      return "green";
    } else {
      return "gray"; 
    }
  });

  const handleBackToAdminClick = () =>{
    navigate("/admin"); 
  }
   
  return (
    <>
      <div className="chart-div">
      <BarChart className='BarChart' 
        xAxis={[
          {
            label : 'Destinations',
            labelStyle: { fontWeight: 'bold', fontSize: '32px',},
            id: 'barCategories',
            data: allDestinationsArraySplit,
            scaleType: 'band',
            colorMap: {
              type: "ordinal",
              values: allDestinationsArraySplit,
              colors: barColors,
            },
            tickPlacement: "middle",
            tickLabelStyle: { fontWeight: 800, fontSize: '14px' },
          },
        ]}
        series={[
          {
            data: numOfFollowersForEachVacationArray,
            color:'gray',
          },
        ]}
        yAxis={[
          {
            label:'Followers',
            labelStyle: { fontWeight: 'bold', fontSize: '28px' },
          }
        ]}

        width={2500}
        height={600}
        margin={{
          left: 80,
          right: 80,
          top: 80,
          bottom: 80,
        }}
       
      />
      </div>      
      <div className="AdminActions">
        <Stack className="stack-buttons" direction="row" spacing={2}>
            <Button onClick= {handleBackToAdminClick} variant="outlined" size="large" endIcon={<AdminPanelSettingsIcon />}>
              Admin Panel
            </Button>
            <Button onClick={downloadCsvFile}variant="contained" size="large" endIcon={<CloudDownloadIcon/>}>
              .CSV Report
            </Button>
        </Stack>
      </div>  
    </> 
  );
}
