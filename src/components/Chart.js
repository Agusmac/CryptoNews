import React, { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2';


const Chart = ({ history }) => {
    const [pricesArray, setPricesArray] = useState(null)
    const [labelsArray, setLabelsArray] = useState(null)

    useEffect(() => {
        let tempPrice = []
        let tempLabel = []
        for (let i = 0; i < history?.history?.length; i+=10) {
            tempPrice.push(history.history[i].price)
            tempLabel.push(new Date(Number(new Date(history.history[i].timestamp) * 1000)).toLocaleDateString())
        }
        setPricesArray(tempPrice.reverse())
        setLabelsArray(tempLabel.reverse())
    }, [history])

    const data = {
        labels: labelsArray || [1, 54, 16, 378, 77, 31, 53, 36],
        datasets: [
            {
                label: 'Price in usd',
                data: pricesArray || [1, 54, 16, 378, 77, 31, 53, 36],
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            }
        ],
    };
    const options = {
        responsive: true,
    };

    return (
        <div className="chartDiv">
            <Line data={data} options={options} />
        </div>

    )
}

export default Chart