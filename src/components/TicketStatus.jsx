import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Icon,
    CircleIconButton,
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
    Badge
} from "playbook-ui";

export class TicketStatus extends React.Component{

    ticketList = (tickets) => {
        let showTickets = tickets.slice(0, 5);
        let lastItem = <div></div>;
        if(tickets.length > 5 ){
            lastItem =  <ListItem>
                            <Button
                            display="block" 
                            text="Show More"
                            variant="link"
                            size="sm"
                            />
                        </ListItem>
        }
        return (
            <List>
                {showTickets.map(ticket => (
                    <ListItem>
                        <Flex 
                            orienatation="row" 
                            spacing="between" 
                            align="center" 
                            gap="md">
                            <FlexItem>
                                <Avatar
                                 name={ticket.AssignedName}
                                 imageUrl={ticket.AssignedUrl}
                                 size="xs">
                                </Avatar>
                            </FlexItem>
                            <FlexItem>
                                {ticket.title}
                            </FlexItem>
                            <FlexItem>
                                <Icon icon="angle-right"></Icon>
                            </FlexItem>
                        </Flex>
                      
                    </ListItem>
                ))}
                {lastItem}
            </List>
        )
       
    }
    
    render() {
        //console.log(this.props.data);
        return(
            <React.Fragment>
                <Flex orienatation="row" spacing="between" columnGap="lg" align="stretch" justify="center">
                    {this.props.data.map(obj => (
                    <FlexItem flex={2}>
                        <card></card>
                        <Table size="sm" collapse="sm" maxWidth="xl">
                            <tbody>
                                <TableRow sideHighlightColor={obj.category} className="ticketHeader">
                                    <td>
                                        <Flex orientation="row" spacing="between"> 
                                            <FlexItem>
                                            <Title size={4} text={obj.status}></Title> 
                                            </FlexItem>
                                           <FlexItem>
                                               <Badge 
                                               rounded
                                               text={obj.tickets.length}
                                               variant={obj.category} ></Badge>
                                           </FlexItem>
                                        </Flex>
                                    </td>
                                </TableRow>
                                <TableRow>
                                    {this.ticketList(obj.tickets)}
                                </TableRow>
                            </tbody>
                        </Table>
                        
                    </FlexItem>
                   
                    ))}
                </Flex>
                
            </React.Fragment>
        );
               
           
    }
   

}

export default TicketStatus