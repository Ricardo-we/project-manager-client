import styled from "styled-components";

export const ContainerFlex = styled.div`
    margin: auto;
    width: ${props => props.width || '100%'};
    height: auto;
    display: flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    align-items: ${props => props.alignment || 'center'} ;
    justify-content: ${props => props.justify || 'space-around'};
    flex-wrap: wrap;
`