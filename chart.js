let data = []
let label = [];

let chart = {
    type: 'line',
    data: {
        labels: label,
        datasets: [{
            label: '#',
            data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, chart);

const firebaseConfig = {
    apiKey: "AIzaSyBZh-BQ3ho5QlCc1eYZX6B-EbBpQpdlXyg",
    authDomain: "rasplm35.firebaseapp.com",
    databaseURL: "https://rasplm35-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rasplm35",
    storageBucket: "rasplm35.appspot.com",
    messagingSenderId: "74939215528",
    appId: "1:74939215528:web:1c0b4c4c8221040d085c9d",
    measurementId: "G-23J6SYGBQT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
setInterval(()=>{

    const timeSpeed = firebase.database().ref('realtime').child('nhietdo');
          timeSpeed.on('value',snap =>{
        console.log("Time : "+snap.val());

        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     
        // data = [...data,snap.val().split('.')[0]]

        // console.log(label);
        myChart.data.labels.push(date +" "+ time);
        myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(snap.val().split('.')[0]);
             

        });
        myChart.update();
    });

},5000)
