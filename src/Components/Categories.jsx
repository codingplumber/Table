import React from 'react'
import styled from 'styled-components';

// MANDATORY:
// tableWidth
// rowArr
// tableArr
// overflowX
// overflowY


const TableWrapper = styled.div`
// TODO: width may need to adjust
    // // width: ${props => props.tablewidth ? props.tablewidth : null};
    // display: flex;
    // overflow-x: ${props => props.overflowx ? props.overflowx : null};
    // overflow-Y: ${props => props.overflowY ? props.overflowx : null};
    // position: ${props => props.position ? props.position : 'static'};
    // top: ${props => props.tabletop ? props.tabletop : null};
    // left: ${props => props.tableleft ? props.tableleft : null};
    // right: ${props => props.tableright ? props.tableright : null};
    // z-index: ${props => props.tablezindex ? props.tablezindex : 1};
`

const RowContainer = styled.div`
    // height: 40px;
    // // padding: 5px;
    // display: flex;
    // // justify-content: center;
    // // align-items: center;
    // font-size: 12px;
`

const Row = styled(RowContainer)`
    // display: flex;
    // // width: 100%;
    // // background: ${props => props.index % 2 ? 'lightgray' : 'white'};
    // // z-index: ${props => props.rowzindex ? props.rowzindex : 1};
`

const RowWrapper = styled(Row)`
    // display: flex;
    // flex-direction: column;

    // // width: ${props => props.tablearr ? 100 / props.tablearr.length + '%' : null };
`


const RowItem = styled.div`
    // width: 100%;
    // height: 100%;
`

const Header = styled(RowContainer)`
    // width: 100%;
    // // width: ${props => props.headerwidth ? props.headerwidth : '100%'};
    // // justify-content: center;
    // // align-items: center;
    // background: skyblue;
    // // position: sticky;
    // // top: 0;
    // // z-index: ${props => props.headerzindex ? props.headerzindex : 2};
`;

const HeaderItem = styled.div`
    // height: 100%;
    // width: 100%;
`




const TableHeader = props => {
    return (
        <Header className='header' headerzindex={props.headerZIndex}>
            {
                props.headerArr.map((x, i) => {
                    return (
                        <HeaderItem>
                            {
                                x
                            }
                        </HeaderItem>
                    );
                })
            }
        </Header>
    );
}

const CategoryRow = props => {
    return (
        <Row overflowx={props.overflowX} overflowy={props.overflowY} rowzindex={props.rowZIndex}>
            {
                props.rowArr.map((x, i) => {
                    return (
                        <RowItem key={i} className='row' index={i}>
                            {
                                x
                            }
                        </RowItem>
                    )

                })
            }
        </Row>
    );
}

const TableRow = props => {
    return (
        <RowWrapper className='column' tablearr={props.tableArr}>
            <CategoryRow {...props} />
        </RowWrapper>
    );
}

const categories = props => {
    return (
        <TableWrapper
            className='table'
            tablewidth={props.tableWidth}
            position={props.position}
            tabletop={props.tableTop}
            tableleft={props.tableLeft}
            tableright={props.tableRight}
            tablezindex={props.tableZIndex}
        >
            <TableHeader {...props} />
            <RowWrapper {...props} />

            {/* {
                props.tableArr.map((x, i) => <TableRow key={i} {...props} header={x} />)
            } */}
        </TableWrapper>
    );
};

export default categories;
