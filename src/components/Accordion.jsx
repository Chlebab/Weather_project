import React from 'react'
import DailyRecommendation from './DailyRecommendation'
import styled from 'styled-components'
import { render } from 'react-dom' // high chart libr
import Highcharts from 'highcharts' // high chart libr
import HighchartsReact from 'highcharts-react-official' // high chart libr

const Card = styled.div`
    border: 3px;
    border-color: #354f52;
    border-style: solid;
    border-radius: 10px;
    padding: 10px;
`

const Accordion = ({title, content, accordionDisplayToggle, day}) => {
    const toggleAccordion = () => {
        accordionDisplayToggle(day)
    }

    console.log("Day:", day)

    const chartData = day.hour.map((hour) => {
        return {
            time: hour.time,
            temp: hour.temp_c
        }
    })
    console.log("This is the data for the hourly graph", chartData)

    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: `Hourly Temperatures`,
        },
        xAxis: {
            categories: chartData.map((time) => time.time.substring(11,16)),
            title: {
                text: `Hour`
            }
        },
        yAxis: {
            title: {
                text: '°C',
            },
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f} °C'
                }
            }
        },
        series: [
            {
                name: '°C',
                data: chartData.map((data) => data.temp),
            },
        ],
    };
    


    return (
        <>
            <div className="accordion">
                <div className="accordion-header" onClick={toggleAccordion}>
                    <Card>
                        <h4>{title}</h4>
                        <DailyRecommendation day={day} />
                    </Card>
                </div>
                {day.accordionDisplay && (
                <div className="accordion-content">
                    <div>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </div>
                    {content}
                </div>
                )}
            </div>
        </>
    )
}
export default Accordion;