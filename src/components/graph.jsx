import React from 'react';
import {Line} from 'react-chartjs-2';

export default function Graph({ xValues, yValues }) {
        
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(9, 82, 237, 1)');   
    gradient.addColorStop(1, 'rgba(81, 220, 224, 0)'); 
    
    return (
        <div>
            <article>
                <Line
                    data={ {
                        labels: xValues.reverse(),
                        datasets: [
                            {
                                data: yValues.reverse(),
                                backgroundColor: gradient,
                                borderWidth: 2,
                                reponsive: true
                            }
                        ]
                    } }
                    options={{
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    display: false
                                }
                            }],
                        },
                        title:{
                            display: false
                        },
                        legend:{
                            display: false
                        }
                    }}
                    width={10}
                    height={8}
                />
            </article>
        </div>
    )
}
