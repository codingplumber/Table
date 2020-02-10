import React from 'react'
import styled from 'styled-components';

const StyledTable = styled.table`
    border-collapse: collapse;
    border: 1px solid gray;
    // position: ${props => props.tableposition ? props.tableposition : 'static'};
    // z-index: ${props => props.tablezindex ? props.tablezindex : 0};
    // left: ${props => props.tableleft >= 0 ? props.tableleft : null};
    // right: ${props => props.tableright >= 0 ? props.tableright : null};
    // box-shadow: ${props => props.tableboxshadowright ? '5px 0 5px -5px #333' : props.tableboxshadowleft ? '-5px 0 5px -5px #333' : null}
`

const StyledTableRow = styled.tr`
    height: 40px;
    white-space: nowrap;
    font-size: 12px;
    background: ${props => props.index % 2 === 0 ? 'white' : 'lightgray'};
`

const StyledTableHeadRow = styled.tr`
    height: 40px;
    background: skyblue;
    font-size: 12px;
`

const StyledDoubleTableHeadRow = styled.tr`
    height: 20px;
    background: ${props => props.top ? '#c2ecfd' : 'skyblue'};
    font-size: 11px;
`

// export and use outside
export const StyledTh = styled.th`
    vertical-align: middle;
    border-right: ${props => props.last ? null : '1px solid gray'};
    background: skyblue;
    padding: 0 5px;
    position: sticky;
    top: ${props => props.top ? props.top : 0};
    box-shadow: 0 5px 5px -5px #333;
    z-index: ${props => props.zindex ? props.zindex : 0};
`

// export and use outside
export const StyledThTop = styled.th`
    vertical-align: middle;
    border-right: ${props => props.last ? null : '1px solid gray'};
    background: #c2ecfd;
    padding: 0 5px;
    position: sticky;
    top: 0;
    z-index: ${props => props.zindex ? props.zindex : 0};
`

// export and use outside
export const StyledTd = styled.td`
    vertical-align: middle;
    border-right: ${props => props.last ? null : '1px solid gray'};
    padding: 0 5px;
`

const TableHead = props => (
    <thead>
        <StyledTableHeadRow>
            {
                props.getHead(props.headData)
            }
        </StyledTableHeadRow>
    </thead>
);

const DoubleTableHead = props => (
    <thead>
        <StyledDoubleTableHeadRow top={true}>
            {
                props.getHeadTop(props.topHeadData)
            }
        </StyledDoubleTableHeadRow>
        <StyledDoubleTableHeadRow>
            {
                props.getHead(props.headData)
            }
        </StyledDoubleTableHeadRow>
    </thead>
);

const TableBody = props => (
    <tbody>
        {
            props.dataArr.map((x, i) => {
                return (
                    <StyledTableRow index={i} key={i}>
                        {
                            props.getBody(x)
                        }
                    </StyledTableRow>
                );
            })
        }
    </tbody>
    );

// export and use outside
export default function table(props) {
    return(
        <StyledTable
            // tableposition={props.tablePosition}
            // tablezindex={props.tableZIndex}
            // tableleft={props.tableLeft}
            // tableright={props.tableRight}
            // tableboxshadowright={props.tableBoxShadowRight}
            // tableboxshadowleft={props.tableBoxShadowLeft}
        >
            {
                // if you pass a getHeadTop function it will split the table head rows in two
                // will possibly need a colSpan or rowSpan attribute on your th tag
                props.getHeadTop ? <DoubleTableHead {...props} /> : <TableHead {...props} />
            }
            <TableBody {...props} />
        </StyledTable>
    );
}
