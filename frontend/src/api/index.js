// import axios from 'axios';

// const url = 'http://localhost:9000/api/getTotalData';

export const fetchTotalData = async () => {
    const totalData = [{
        numberOfHospitalized: 10670743,
        numberOfPeopleInRea: 1454888,
        numberOfDeaths: 15347957,
        numberOfRecovered: 64606679,
        lastUpdateDate: '2021-01-31'
    }];
    // try {
    //     totalData = await axios.get(url)
    //     console.log(totalData)
    // } catch (error) {
    //     console.log(error)
    // }
    // console.log(totalData)
    return totalData;
};
