// import axios from 'axios';

// const url = 'http://localhost:9000/api/getTotalData';

const monthlydata = [
    {
        totalConfirmed: 100,
        totalDeaths: 10,
        totalRecovered: 50,
        reportDate: 'mars 2020'
    },
    {
        totalConfirmed: 600,
        totalDeaths: 400,
        totalRecovered: 100,
        reportDate: 'avril 2020'
    },
    {
        totalConfirmed: 10000,
        totalDeaths: 5000,
        totalRecovered: 500,
        reportDate: 'mai 2020'
    },
    {
        totalConfirmed: 10564650,
        totalDeaths: 101231,
        totalRecovered: 55674650,
        reportDate: 'juin 2020'
    },
    {
        totalConfirmed: 100857453,
        totalDeaths: 105413,
        totalRecovered: 501351,
        reportDate: 'juillet 2020'
    },
    {
        totalConfirmed: 100867513132,
        totalDeaths: 105432185,
        totalRecovered: 50546463,
        reportDate: 'aout 2020'
    },
    {
        totalConfirmed: 100854543879641,
        totalDeaths: 102163546543,
        totalRecovered: 5052121,
        reportDate: 'sept 2020'
    },
    {
        totalConfirmed: 4105431345564560,
        totalDeaths: 145451631,
        totalRecovered: 5546541,
        reportDate: 'oct 2020'
    },
    {
        totalConfirmed: 10045646454185,
        totalDeaths: 1056464564,
        totalRecovered: 554687,
        reportDate: 'nov 2020'
    },
    {
        totalConfirmed: 100,
        totalDeaths: 10,
        totalRecovered: 50,
        reportDate: 'dec 2020'
    }
]

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

export const fetchMonthlyData = async () => {
    // try {
        const { data } = monthlydata
        console.log(data)
        console.log(monthlydata)
        const modifiedData = monthlydata.map((dailyData) => ({
            confirmed: dailyData.totalConfirmed,
            deaths: dailyData.totalDeaths,
            recovered: dailyData.totalRecovered,
            date: dailyData.reportDate
        }));
        return modifiedData;
    // } catch (error) {
    // }
}
