import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Icon,
    CircleIconButton,
    Caption,
    Title,
    Flex,
    FlexItem,
    Nav,
    NavItem,
    Card,
    StatChange,
    SectionSeparator,
    LineGraph,
    Table,
    TableRow,
    SelectableList,
    List,
    ListItem,
    Badge,
    ProgressSimple,
    StatValue
} from "playbook-ui";

// already sorted -- real implementaion would dynamizlly sore
const fixedData = [
    {
        title: "Add to Cart",
        value: 2577
    },
    {
        title: "Shopping Cart",
        value: 2023
    },
    {
        title: "Pyment Methods",
        value: 1567
    },
    {
        title: "Delivery Methods",
        value: 1252
    },
    {
        title: "Confirm",
        value: 1182
    },
    {
        title: "Delivery",
        value: 1098
    }
]
const max = 2577

export class PipelineChart extends React.Component{

    getWidth(value) {
        let perc = Math.round(value/max * 100);
        return perc.toString() + '%';
    }
    
    render() {
        //console.log(this.props.data);
        return(
            <React.Fragment>
               <Card padding="none">
                    <Card.Body padding="sm">
                       <Title text="Pipeline Chart" size={4}></Title>
                    </Card.Body>
                    <SectionSeparator variant="card" />
                    <Card.Body padding="none">
                        <Table size="sm" padding="none">
                            <tbody>
                            {fixedData.map(obj => (  
                                <tr>
                                    <td nowrap width="30%">
                                        {obj.title}
                                    </td>
                                    <td width="60%">
                                        <ProgressSimple 
                                            percent={100}
                                            width={this.getWidth(obj.value)}
                                        ></ProgressSimple>
                                        <Caption align="end" text={this.getWidth(obj.value)}></Caption>
                                    </td>
                                    <td width="10%">
                                        <Title 
                                        size={4}
                                        text={obj.value.toLocaleString("en-US")}/>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card.Body>
               </Card>
                
            </React.Fragment>
        );       
           
    }
}

export default PipelineChart