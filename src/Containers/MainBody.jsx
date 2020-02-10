import React, { Component } from 'react'
import styled from 'styled-components';
import { data } from '../data.js';


import Table from '../Components/Table';
import { StyledTd, StyledTh, StyledThTop } from '../Components/Table';


const Wrapper = styled.div`
    width: 90%;
    height: 60%;
    border: 1px solid black;
    overflow: auto;
    display: flex;
    position: relative;
`

const LeftStyle = styled.div`
    display: flex;
    position: sticky;
    left: 0;
    z-index: 4;
    box-shadow: 5px 0 5px -5px #333;
`

const StyledCloseButton = styled.div`
    cursor: pointer;
`

export default class MainBody extends Component {
    state = {
        dataArr: data,
        headData: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        // array of closed table years
        closedTableYears: [],
    };

    // left table header
    createHeader = () => {
        const headerData = Object.keys(this.state.dataArr[0]);
        headerData.pop();

        return (
            <React.Fragment>
                {
                    headerData.map((x, i, arr) => (
                        <StyledTh last={arr.length - 1 === i} key={i}>
                            {x}
                        </StyledTh>
                    ))
                }
            </React.Fragment>
        )
    };

    // left table rows
    createRows = x => (
        <React.Fragment>
            <StyledTd>
                {x.item}
            </StyledTd>
            <StyledTd>
                {x.description}
            </StyledTd>
            <StyledTd>
                {x.cost}
            </StyledTd>
            <StyledTd>
                {x.price}
            </StyledTd>
            <StyledTd last={true}>
                {x.itemId}
            </StyledTd>
        </React.Fragment>
    );
    
    // right tables top header
    createYearsHeaderTop = year => (
        <StyledThTop rowSpan='1' colSpan='12' zindex={3} last={true}>
            <StyledCloseButton onClick={this.handleCloseYear(year)}>
                   - {year}
            </StyledCloseButton>
        </StyledThTop>
    );

    // right tables bottom header
    createYearsHeader = () => (
        <React.Fragment>
            {
                this.state.headData.map((x, i, arr) => (
                    <StyledTh top='20px' last={arr.length - 1 === i} key={i + x.toString()} zindex={3}>
                        {x}
                    </StyledTh>
                ))
            }
        </React.Fragment>
    );

    // right tables rows
    createYearsRows = x => (
        <React.Fragment>
            {
                x.map((x, i, arr) => {
                    return (
                        <StyledTd last={arr.length - 1 === i} key={x.month.toString() + x.year.toString() + i.toString()}>
                            {x.total}
                        </StyledTd>
                    );
                })
            }
        </React.Fragment>
    );

    createYearsHeaderTopClosed = year => (
        <StyledThTop zindex={3} last={true}>
            <StyledCloseButton onClick={this.handleCloseYear(year)}>
                + {year}
            </StyledCloseButton>
        </StyledThTop>
    );

    // right tables bottom header
    createYearsHeaderClosed = () => <StyledTh top='20px' last={true} zindex={3} />;

    // right tables rows
    createYearsRowsClosed = x => (
        <StyledTd last={true}>
            <div style={{width: 75}} />
        </StyledTd>
    );

    handleCloseYear = year => () => {
        const closedTableYears = this.state.closedTableYears.includes(year) ?
            this.state.closedTableYears.filter(x => x !== year).sort((a, b) => a - b) :
            [...this.state.closedTableYears, year].sort((a, b) => a - b);

        this.setState({
            closedTableYears
        });
    };

    render() {
        const allYears = this.state.dataArr[0].dataByMonth.map(x => x.year);
        const sortedYears = [...new Set(allYears)];
        const years = sortedYears.filter(x => this.state.closedTableYears.includes(x) ? false : true);

        return (
            <Wrapper>
                <LeftStyle>
                    <Table
                        dataArr={this.state.dataArr}
                        getBody={this.createRows}
                        getHead={this.createHeader}
                    />
                    {
                        this.state.closedTableYears.length > 0 ?
                            this.state.closedTableYears.map((x, i, arr) => {
                                // pull out data separated and sorted by years to get number of closed rows
                                const rowData = this.state.dataArr.map(y => {
                                    return y.dataByMonth
                                        .filter(z => z.year === x)
                                        .sort((a, b) => a.month - b.month);
                                });

                                return (
                                    <Table
                                        key={i}
                                        dataArr={rowData}
                                        getHead={this.createYearsHeaderClosed}
                                        getHeadTop={this.createYearsHeaderTopClosed}
                                        getBody={this.createYearsRowsClosed}
                                        topHeadData={x}
                                    />
                                );
                            }) : null
                    }
                </LeftStyle>
                {
                    years.map((x, i) => {
                        // pull out data separated and sorted by years to fill in table values
                        const rowData = this.state.dataArr.map(y => {
                            return y.dataByMonth
                                .filter(z => z.year === x)
                                .sort((a, b) => a.month - b.month);
                        });

                        return (
                            <Table
                                key={i}
                                dataArr={rowData}
                                getHead={this.createYearsHeader}
                                getHeadTop={this.createYearsHeaderTop}
                                getBody={this.createYearsRows}
                                rowSpanTop={1}
                                colSpanTop={12}
                                topHeadData={x}
                            />
                        );
                    })
                }
            </Wrapper>
        );
    }
}
