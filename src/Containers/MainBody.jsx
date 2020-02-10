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
    height: fit-content;
`

const StyledCloseButton = styled.div`
    cursor: pointer;
`

export default class MainBody extends Component {
    state = {
        // fake data
        dataArr: data,
        // months for header
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
    createRows = tdData => (
        <React.Fragment>
            <StyledTd>
                {tdData.item}
            </StyledTd>
            <StyledTd>
                {tdData.description}
            </StyledTd>
            <StyledTd>
                {tdData.cost}
            </StyledTd>
            <StyledTd>
                {tdData.price}
            </StyledTd>
            <StyledTd last={true}>
                {tdData.itemId}
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
    createYearsRows = tdData => (
        <React.Fragment>
            {
                tdData.map((x, i, arr) => {
                    return (
                        <StyledTd last={arr.length - 1 === i} key={x.month.toString() + x.year.toString() + i.toString()}>
                            {x.total}
                        </StyledTd>
                    );
                })
            }
        </React.Fragment>
    );

    // closed years header top
    createYearsHeaderTopClosed = year => (
        <StyledThTop zindex={3} last={true}>
            <StyledCloseButton onClick={this.handleCloseYear(year)}>
                + {year}
            </StyledCloseButton>
        </StyledThTop>
    );

    // right tables bottom header closed
    createYearsHeaderClosed = () => <StyledTh top='20px' last={true} zindex={3} />;

    // right tables rows closed
    createYearsRowsClosed = () => (
        <StyledTd last={true}>
            <div style={{width: 75}} />
        </StyledTd>
    );

    // opens / closes year table
    handleCloseYear = year => () => {


        // stop from closing all year tables if only year table is left open
        if (this.getOpenYearData().length === 1 && !this.state.closedTableYears.includes(year)) {
            return;
        }

        // add or remove year from list of years that have closed tables
        const closedTableYears = this.state.closedTableYears.includes(year) ?
            this.state.closedTableYears.filter(x => x !== year).sort((a, b) => a - b) :
            [...this.state.closedTableYears, year].sort((a, b) => a - b);

        this.setState({
            closedTableYears
        });
    };

    // gets list of years that should have open tables
    getOpenYearData = () => {
        // all years from my data
        const allYears = this.state.dataArr[0].dataByMonth.map(x => x.year);
        // removes duplicates and sorts
        const sortedYears = [...new Set(allYears)].sort((a, b) => a - b);
        // years list minus the closed table years
        return sortedYears.filter(x => this.state.closedTableYears.includes(x) ? false : true);
    };

    render() {
        return (
            <Wrapper>
                <LeftStyle>
                    {/* high level table data */}
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
                                    // closed years table data
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
                    this.getOpenYearData().map((x, i) => {
                        // pull out data separated and sorted by years to fill in table values
                        const rowData = this.state.dataArr.map(y => {
                            return y.dataByMonth
                                .filter(z => z.year === x)
                                .sort((a, b) => a.month - b.month);
                        });

                        return (
                            // open years table data
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
