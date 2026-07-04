// =========================================
// ABES SGPA & CGPA Predictor
// Part 1
// =========================================

// ------------------------------
// DOM Elements
// ------------------------------

const theoryCards = document.querySelectorAll(".subject-card.theory");
const labCards = document.querySelectorAll(".subject-card.lab");

const TOTAL_CREDITS = 23;

// ------------------------------
// Grade Calculator
// (Temporary ABES Mapping)
// ------------------------------

function getGrade(total){

    if(total>=90){

        return{
            grade:"A+",
            gp:10
        };

    }

    else if(total>=80){

        return{
            grade:"A",
            gp:9
        };

    }

    else if(total>=70){

        return{
            grade:"B+",
            gp:8
        };

    }

    else if(total>=60){

        return{
            grade:"B",
            gp:7
        };

    }

    else if(total>=50){

        return{
            grade:"C",
            gp:6
        };

    }

    else if(total>=40){

        return{
            grade:"P",
            gp:5
        };

    }

    else{

        return{
            grade:"F",
            gp:0
        };

    }

}


// ------------------------------
// Calculate Theory Subject
// ------------------------------

function calculateTheory(card){

    const mt1 =
        Number(card.querySelector(".mt1").value) || 0;

    const mt2 =
        Number(card.querySelector(".mt2").value) || 0;

    const end =
        Number(card.querySelector(".end").value) || 0;

    const internal =
        Number(card.querySelector(".internal").value) || 0;


    // External Marks

    const external =
        mt1 + mt2 + end;


    // Total Marks

    let total =
        external + internal;

    if(total>100){

        total=100;

    }


    // Grade

    const result =
        getGrade(total);


    // Display

    card.querySelector(".external").textContent =
        external;

    card.querySelector(".total").textContent =
        total;

    card.querySelector(".grade").textContent =
        result.grade;

    card.querySelector(".gp").textContent =
        result.gp;

}
// =========================================
// Part 2
// Lab + SGPA + CGPA
// =========================================

// ------------------------------
// Calculate Lab
// ------------------------------

function calculateLab(card){

    const practical =
        Number(card.querySelector(".practical").value) || 0;

    const internal =
        Number(card.querySelector(".internalLab").value) || 0;

    let total = practical + internal;

    if(total > 100){

        total = 100;

    }

    const result = getGrade(total);

    card.querySelector(".total").textContent =
        total;

    card.querySelector(".grade").textContent =
        result.grade;

    card.querySelector(".gp").textContent =
        result.gp;

}



// ------------------------------
// Calculate SGPA & CGPA
// ------------------------------

function calculateResult(){

    let totalCreditPoints = 0;


    // ---------- Theory ----------

    theoryCards.forEach(card=>{

        calculateTheory(card);

        const credit =
            Number(card.dataset.credit);

        const gp =
            Number(card.querySelector(".gp").textContent);

        totalCreditPoints += credit * gp;

    });


    // ---------- Labs ----------

    labCards.forEach(card=>{

        calculateLab(card);

        const credit =
            Number(card.dataset.credit);

        const gp =
            Number(card.querySelector(".gp").textContent);

        totalCreditPoints += credit * gp;

    });


    // ---------- SGPA ----------

    let sgpa =
        totalCreditPoints / TOTAL_CREDITS;

    if(isNaN(sgpa))
        sgpa = 0;



    // ---------- Previous Semester ----------

    const previousSGPA =
        Number(document.getElementById("previousSGPA").value) || 0;

    const previousCredits =
        Number(document.getElementById("previousCredits").value) || 23;



    // ---------- Overall CGPA ----------

    let cgpa =
        (
            (previousSGPA * previousCredits)
            +
            (sgpa * TOTAL_CREDITS)
        )
        /
        (previousCredits + TOTAL_CREDITS);



    // ---------- Percentage ----------

    let percentage =
        (cgpa - 0.75) * 10;



    // ---------- Display ----------

    document.getElementById("sgpa").textContent =
        sgpa.toFixed(2);

    document.getElementById("cgpa").textContent =
        cgpa.toFixed(2);

    document.getElementById("percentage").textContent =
        percentage.toFixed(2) + "%";

}// =========================================
// Part 3
// Events & Validation
// =========================================

// ---------- Auto Calculate While Typing ----------

document.querySelectorAll("input").forEach(input => {

    input.addEventListener("input", () => {

        // Validation

        if(input.type === "number"){

            let value = Number(input.value);

            let max = Number(input.max);

            let min = Number(input.min);

            if(input.value !== ""){

                if(!isNaN(max) && value > max){

                    input.value = max;

                }

                if(!isNaN(min) && value < min){

                    input.value = min;

                }

            }

        }

        calculateResult();

    });

});



// ---------- Calculate Button ----------

document.getElementById("calculateBtn")
.addEventListener("click", () => {

    calculateResult();

});



// ---------- Reset Button ----------

document.getElementById("resetBtn")
.addEventListener("click", () => {

    // Clear all inputs

    document.querySelectorAll("input").forEach(input=>{

        if(input.id==="previousCredits"){

            input.value=23;

        }

        else{

            input.value="";

        }

    });


    // Reset Theory Cards

    theoryCards.forEach(card=>{

        card.querySelector(".external").textContent="0";
        card.querySelector(".total").textContent="0";
        card.querySelector(".grade").textContent="--";
        card.querySelector(".gp").textContent="0";

    });


    // Reset Lab Cards

    labCards.forEach(card=>{

        card.querySelector(".total").textContent="0";
        card.querySelector(".grade").textContent="--";
        card.querySelector(".gp").textContent="0";

    });


    // Reset Result Cards

    document.getElementById("sgpa").textContent="0.00";

    document.getElementById("cgpa").textContent="0.00";

    document.getElementById("percentage").textContent="0.00%";

});



// ---------- First Time Load ----------

calculateResult();
// =========================================
// Part 4
// Extra Features
// =========================================


// ------------------------------
// Grade Colors
// ------------------------------

function updateGradeColors(){

    document.querySelectorAll(".grade").forEach(grade=>{

        switch(grade.textContent){

            case "A+":
                grade.style.color="#16a34a";
                break;

            case "A":
                grade.style.color="#22c55e";
                break;

            case "B+":
                grade.style.color="#2563eb";
                break;

            case "B":
                grade.style.color="#ea580c";
                break;

            case "C":
                grade.style.color="#d97706";
                break;

            case "P":
                grade.style.color="#9333ea";
                break;

            case "F":
                grade.style.color="#dc2626";
                break;

            default:
                grade.style.color="#6b7280";
        }

    });

}



// ------------------------------
// Result Card Colors
// ------------------------------

function updateResultColor(){

    const sgpa =
        Number(document.getElementById("sgpa").textContent);

    const sgpaCard =
        document.getElementById("sgpa");

    if(sgpa>=9){

        sgpaCard.style.color="#22c55e";

    }

    else if(sgpa>=8){

        sgpaCard.style.color="#3b82f6";

    }

    else if(sgpa>=7){

        sgpaCard.style.color="#f59e0b";

    }

    else{

        sgpaCard.style.color="#ef4444";

    }

}



// ------------------------------
// Fail Detection
// ------------------------------

function checkFail(){

    let failed=false;

    document.querySelectorAll(".grade").forEach(grade=>{

        if(grade.textContent==="F"){

            failed=true;

        }

    });

    if(failed){

        alert("⚠️ One or more subjects are Failed.\nSGPA may not be considered passed.");

    }

}



// ------------------------------
// Improve calculateResult()
// ------------------------------

const oldCalculateResult = calculateResult;

calculateResult = function(){

    oldCalculateResult();

    updateGradeColors();

    updateResultColor();

}



// ------------------------------
// Keyboard Shortcut
// Ctrl + Enter
// ------------------------------

document.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key==="Enter"){

        calculateResult();


    }
    

});

const toggleBtn = document.getElementById("theme-toggle");

// Previous theme load
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    toggleBtn.innerHTML = "☀️ Light Mode";
}

// Toggle Theme
toggleBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");
        toggleBtn.innerHTML="☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");
        toggleBtn.innerHTML="🌙 Dark Mode";

    }

});



// ------------------------------
// Welcome Message
// ------------------------------

console.log("ABES SGPA & CGPA Predictor Loaded Successfully");