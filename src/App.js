import logo from './logo.svg';
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  CircleIconButton,
  Title,
  Flex,
  FlexItem,
  Background,
  Caption,
  Icon,
  Badge,
  Nav,
  NavItem,
  User,
  Avatar,
  Button,
  Card,
  StatChange,
  SectionSeparator,
  IconStatValue
} from "playbook-ui";
import { KpiDashboard } from "./components/KpiDashboard";
import { TicketStatus } from "./components/TicketStatus";
import { PipelineChart } from './components/PipelineChart';
import ticketsApi from "./tickets.json";

const kpiRevenue = [
  {
    label: "5/1",
    value: 45000
  },
  {
    label: "6/1",
    value: 50000
  },
  {
    label: "7/1",
    value: 60000
  },
  {
    label: "8/1",
    value: 70000
  },
  {
    label: "9/1",
    value: 75000
  },
  {
    label: "10/1",
    value: 80000
  },
  {
    label: "11/1",
    value: 90000
  },
  {
    label: "12/1",
    value: 100000
  }
];
const kpiOrders = [
  {
    label: "5/1",
    value: 5000
  },
  {
    label: "6/1",
    value: 5100
  },
  {
    label: "7/1",
    value: 5500
  },
  {
    label: "8/1",
    value: 5000
  },
  {
    label: "9/1",
    value: 4900
  },
  {
    label: "10/1",
    value: 4850
  },
  {
    label: "11/1",
    value: 4900
  },
  {
    label: "12/1",
    value: 4800
  }
];

const kpiOptions = [
  {
    title: "Revenue",
    value: 26,
    change: "increase",
    data: kpiRevenue
  },
  {
    title: "Orders",
    value: 2,
    change: "decrease",
    data: kpiOrders
  },
  {
    title: "Profit",
    value: null,
    change: "",
    data: kpiOrders
  },
  {
    title: "Average Check",
    value: 5,
    change: "increase",
    data: kpiRevenue
  },
  {
    title: "Cancelled",
    value: 18,
    change: "decrease",
    data: kpiRevenue
  },
  {
    title: "Repeat Sales",
    value: null,
    change: "",
    data: kpiRevenue
  }
];

function App() {
  //lets initialize some data for the kpi graph
  const kpiDataInit = [
    {
      name: "data",
      data: kpiRevenue.map((data) => data.value)
    }
  ];
  const [weather, setWeather] = useState({})
  const [selectedKpiIndex, setSelectedKpiIndex] = useState(0);
  const [kpiData, setKpiData] = useState(kpiDataInit);
  const [kpiLabels, setKpiLables] = useState(
    kpiRevenue.map((data) => data.label)
  );
  //const [tickets, setTickets] = useState();
  const handleKpiSelect = (index) => {
    setSelectedKpiIndex(index);
  };


  const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      let coords = {lat: 39, lon: -78}
      if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
          coords.lat = position.coords.latitude;
          coords.lon = position.coords.longitude;
          resolve(coords)
        }) 
      } else {
        resolve(coords);
        
      }
    });  
  }

   const getWeather = async() => {
      getCoordinates()
      .then(coords => {
        fetch('https://fcc-weather-api.glitch.me/api/current?lat='+coords.lat+'&lon='+coords.lon+'139')
        .then((result) => {
          if (result.status === 200) {
          result.json().then(res =>{
            setWeather(res);
          })

        }})   
      });
  }

  useEffect(() => {
    getWeather()
  }, []);

  return (
    <div className="App">
      <Background
        shadow="deep"
        backgroundColor="white"
        paddingLeft="md"
        paddingY="xs"
      >
        <Flex
          className="container"
          orientation="row"
          spacing="between"
          justify="center"
          align="center"
        >
          <Flex justify="center" align="center" gap="2">
            <FlexItem marginRight="sm">
              <Icon icon="sandwich" variant="primary" />
            </FlexItem>
            <div>
              <Title className="toolbar-title" marginBottom="" text="PB&J" />
              <Caption size="sm" text="International" />
            </div>
          </Flex>
          <Flex justify="center" align="center">
            <Icon icon="bell" />
            <Badge rounded text="4" variant="primary" marginRight="md" />
            <Icon icon="inbox" />
            <Badge rounded text="2" variant="primary" />
            <Flex marginLeft="md" justify="center" align="center">
              <Nav variant="subtle">
                <NavItem iconRight="angle-down">
                  <Flex justify="center" align="center">
                    <User name="Indria Shree" paddingRight="xs" size="sm" />
                    <Avatar
                      size="sm"
                      imageUrl="https://randomuser.me/api/portraits/women/44.jpg"
                      name="Indria Shree"
                    />
                  </Flex>
                </NavItem>
              </Nav>
            </Flex>
          </Flex>
        </Flex>
      </Background>
      <SectionSeparator />
      <Background backgroundColor="white" paddingBottom="none">
        <Flex
          className="container"
          paddingLeft="xl"
          paddingRight="md"
          spacing="between"
        >
          <FlexItem>
            <Nav link="#" marginLeft="sm" orientation="horizontal">
              <NavItem active link="#" text="Dashboards" />
              <NavItem link="#" text="Products" />
              <NavItem link="#" text="In Progress" />
              <NavItem link="#" text="Settings" />
            </Nav>
          </FlexItem>
        </Flex>
      </Background>
      <Flex
        className="container"
        orientation="column"
        padding="xl"
        align="stretch"
      >
        <FlexItem>
          <Caption text="Dashboard" />
          <Title text="Commerce Dashboard" />
        </FlexItem>
        <FlexItem grow>
          <KpiDashboard
            options={kpiOptions}
            selected={selectedKpiIndex}
            data={kpiData}
            labels={kpiLabels}
            handleKpiSelect={handleKpiSelect}
          ></KpiDashboard>
        </FlexItem>
      </Flex>
      <Flex
        className="container"
        orientation="column"
        padding="none"
        align="center"
      >
        <FlexItem>
          <Caption text="This Weeks Ticked Ecalations" />
        </FlexItem>
        <FlexItem>
          <TicketStatus data={ticketsApi}/>
        </FlexItem>
      </Flex>
      <Flex
        className="container"
        orientation="row"
        padding="md"
        align="center"
        gap="lg"
      >
        <FlexItem flex={6} padding="none"> 
          <PipelineChart></PipelineChart>
        </FlexItem>
        <FlexItem flex={6} padding="none"> 
        <Flex orientation="row" gap="none" align="stretch">
            <FlexItem flex={6} padding="none">
              <Card className="statCard" borderRadius="none"  padding="lg">
                <IconStatValue 
                  icon="ticket"
                  text="Tickets(TYD)"
                  value={1426}
                  size="lg"
                  variant="green"
                  />
              </Card>
            </FlexItem>
            <FlexItem flex={6} padding="none">
              <Card className="statCard" borderRadius="none" padding="lg">
                <IconStatValue 
                  icon="times"
                  text="Overdue(TYD)"
                  value={25}
                  size="lg"
                  variant="red"
                  />
              </Card>
            </FlexItem>
          </Flex>
          <Flex orientation="row" align="stretch">
            <FlexItem flex={6} padding="none">
              <Card className="statCard" borderRadius="none"  padding="lg" >
                <IconStatValue 
                  icon="clipboard"
                  text="Closed Without Action (TYD)"
                  value={97}
                  size="lg"
                  variant="blue"
                  />
              </Card>
            </FlexItem>
            <FlexItem flex={6} padding="none">
              <Card className="statCard" borderRadius="none"  padding="lg">
              <IconStatValue 
                  icon="triangle"
                  text="Escalated(TYD)"
                  value={896}
                  size="lg"
                  variant="yellow"
                  />
              </Card>
            </FlexItem>
          </Flex>
        </FlexItem>
      </Flex>
      <Flex
        className="container"
        orientation="column"
        padding="none"
        align="center"
      >
        <Title text="Curent Temp:"></Title>
        {weather.main ? weather.main.temp : ""}
      </Flex>
    </div>
  );
}

export default App;
