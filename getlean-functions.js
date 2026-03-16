// Service worker
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js");
}

// Tabs
function tab(id){document.querySelectorAll(".section").forEach(s=>s.classList.remove("active")); document.getElementById(id).classList.add("active");}

// Daily motivation
let motivations=["Consistency beats motivation","Stay disciplined","Progress happens daily","Focus on your goal","Small steps every day"];
document.getElementById("motivation").innerText = motivations[Math.floor(Math.random()*motivations.length)];

// Global variables
let calories=0, water=0, steps=0, streakCount=0;
let weights=[], stepsArray=[];

// Weight Chart
let weightCtx=document.getElementById('weightChart').getContext('2d');
let weightChart=new Chart(weightCtx,{type:'line',data:{labels:[],datasets:[{label:"Weight (lbs)",data:[],borderColor:"#007AFF",fill:false}]},options:{responsive:true,animation:false}});

// Steps Chart
let stepCtx=document.getElementById('stepChart').getContext('2d');
let stepChart=new Chart(stepCtx,{type:'line',data:{labels:[],datasets:[{label:"Steps",data:[],borderColor:"#FF9500",fill:false}]},options:{responsive:true,animation:false}});

// Program Timer
function startProgram(){let start=new Date(document.getElementById("startDate").value); let today=new Date(); let diff=Math.floor((today-start)/(1000*60*60*24)); document.getElementById("dayDisplay").innerText="Day "+(diff+1)+" of 43";}

// Meal Tracker
function addMeal(){
    let chicken=Number(document.getElementById("chicken").value)*60;
    let rice=Number(document.getElementById("brownRice").value)*215;
    let broccoli=Number(document.getElementById("broccoli").value)*50;
    let juice=Number(document.getElementById("juice").value);
    let custom=Number(document.getElementById("custom").value);
    calories+=chicken+rice+broccoli+juice+custom;
    document.getElementById("calories").innerText="Calories: "+calories;
    document.getElementById("calRing").innerText=calories;
}

// Water Tracker
const maxWater=16;
let waterTimes=["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];
function updateWater(){if(water>maxWater) water=maxWater; document.getElementById("water").innerText=water; document.getElementById("waterRing").innerText=water;}
function addWater(){if(water<maxWater) water++; updateWater();}
function removeWater(){if(water>0) water--; updateWater();}
function startWaterNotifications(){setInterval(()=>{let now=new Date(); let h=String(now.getHours()).padStart(2,"0"); let m=String(now.getMinutes()).padStart(2,"0"); let currentTime=`${h}:${m}`; if(waterTimes.includes(currentTime)){if(Notification.permission==="granted") new Notification("Time to drink a glass of water! 💧");}},60000);}
function enableNotifications(){if(Notification.permission!=="granted"){Notification.requestPermission().then(p=>{if(p==="granted") startWaterNotifications();});}else{startWaterNotifications();}}

// Streak
function completeDay(){streakCount++; document.getElementById("streaks").innerText=streakCount+" days completed";}

// 10-Minute Workout
function startWorkout(){let t=600; let timerEl=document.getElementById("timer"); let workoutTimer=setInterval(()=>{let min=Math.floor(t/60); let sec=t%60; timerEl.innerText=min+"m "+sec+"s remaining"; t--; if(t<0){clearInterval(workoutTimer); timerEl.innerText="Workout Complete!"; if(Notification.permission==="granted") new Notification("Workout Complete! Great job!");}},1000);}

// Steps Tracker
function updateSteps(){steps=Number(document.getElementById("steps").value); document.getElementById("stepsDisplay").innerText="Steps: "+steps; let label=new Date().toLocaleTimeString(); stepsArray.push(steps); stepChart.data.labels.push(label); stepChart.data.datasets[0].data.push(steps); stepChart.update(); document.getElementById("stepRing").innerText=steps;}

// Weight Tracker
function addWeight(){let w=Number(document.getElementById("weightInput").value); weights.push(w); document.getElementById("weightList").innerText=weights.join(", "); let label="Day "+weights.length; weightChart.data.labels.push(label); weightChart.data.datasets[0].data.push(w); weightChart.update();}

// Body Fat
function saveBodyFat(){let bf=document.getElementById("bodyfat").value; document.getElementById("bfList").innerText=bf;}

// BMI
function calcBMI(){let h=Number(document.getElementById("height").value); let w=Number(document.getElementById("bmiWeight").value); let bmi=(w/(h*h))*703; document.getElementById("bmi").innerText="BMI: "+bmi.toFixed(1);}

// Fat Loss Simulator
function simulate(){let current=Number(document.getElementById("currentWeight").value); let goal=Number(document.getElementById("goalWeight").value); let loss=current-goal; document.getElementById("result").innerText="You need to lose "+loss+" lbs";}

// Macro Calculator
function calcMacros(){let c=Number(document.getElementById("macroCalories").value); let p=Math.round(c*0.3/4); let carb=Math.round(c*0.4/4); let fat=Math.round(c*0.3/9); document.getElementById("macroResult").innerText="Protein:"+p+"g Carbs:"+carb+"g Fat:"+fat+"g";}

// Meal Plan Generator
function mealPlan(){let c=Number(document.getElementById("planCalories").value); document.getElementById("plan").innerText="Lunch: Chicken + Brown Rice + Broccoli\nDinner: Chicken + Brown Rice + Vegetables\nCalories:"+c;}
