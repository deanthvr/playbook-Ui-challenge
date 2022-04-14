import React, { useEffect, useState } from "react";
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
  LineGraph,
  BarGraph
} from "playbook-ui";

export class KpiDashboard extends React.Component {
  render() {
    console.log("data", this.props.data);
    return (
      <Card padding="none">
        <Card.Body padding="xs">
          <Flex orientation="row" align="center" spacing="between">
            <FlexItem>
              <Title text="Key Performance Indicators" tag="h4" size={4} />
            </FlexItem>
            <FlexItem>
              <CircleIconButton icon="ellipsis-h" variant="secondary" />
            </FlexItem>
          </Flex>
        </Card.Body>
        <SectionSeparator variant="card" />
        <Card.Body>
          <Flex orientation="row">
            <FlexItem flex={3}>
              <Nav orientation="vertical">
                {this.props.options.map((option, index) => {
                  //console.log("index", index);
                  const active = index === this.props.selected ? true : false;
                  return (
                    <NavItem
                      active={active}
                      link="#"
                      onClick={() => this.props.handleKpiSelect(index)}
                    >
                      <Flex orientation="row">
                        <Title size={4} text={option.title} />
                        <StatChange
                          change={option.change}
                          value={option.value}
                        />
                      </Flex>
                    </NavItem>
                  );
                })}
              </Nav>
            </FlexItem>
            <FlexItem flex={8}>
              <LineGraph
                chartData={this.props.data}
                id="line-test-2"
                xAxisCategories={this.props.lables}
                yAxisMin={0}
                height="50%"
              />
            </FlexItem>
          </Flex>
        </Card.Body>
      </Card>
    );
  }
}
