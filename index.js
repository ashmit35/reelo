import express from "express";
import arr from "./data.js"

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

const app = express();
app.use(express.json())

const fetchData = (marks,easy,medium,hard) => {
    //Easy marks-->3
    //Medium marks---> 4
    //Hard marks---> 5
    if(marks<0) return "Marks cannot be negative";
    if(parseInt(easy)+parseInt(medium)+parseInt(hard)!==100) return "Sum of percentages not equal to 100";


    let easyMarks = (easy/100)*marks
    let mediumMarks = (medium/100)*marks
    let hardMarks = (hard/100)*marks

    let result = []

    for(let i=0;i<arr.length && (easyMarks>0 || mediumMarks>0 || hardMarks>0);i++){
        if(arr[i].difficulty === "Easy" && easyMarks>0){
            easyMarks-=3;
            result.push(arr[i])
        }
        else if(arr[i].difficulty === "Medium" && mediumMarks>0){
            mediumMarks-=4;
            result.push(arr[i])
        }
        else if(arr[i].difficulty === "Hard" && hardMarks>0){
            hardMarks-=5;
            result.push(arr[i])
        }
    }

    if(easyMarks || mediumMarks || hardMarks){
        return "Cannot create questions for the given constraints";
    }

    return result;
}

app.get("/get", (req, res) => {
    try {
        const { marks, difficulty } = req.body;
        const result = fetchData(marks, difficulty.easy, difficulty.medium, difficulty.hard);
        res.status(200).send({ result });
    } catch (err) {
        res.status(404).send("Code failiure in /get api")
    }
})
app.listen(PORT, HOSTNAME, () => {
    console.log(`The backend is running on port ${PORT}`);
})
