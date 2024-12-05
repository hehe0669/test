//variable
let daInsertPlace = document.getElementById("insert");

let move = 0;

let insertObj = document.getElementById("insert");

let bino1 = document.getElementById("inputB1");

let bino2 = document.getElementById("inputB2");

let exampleLetterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let example = document.getElementById("example");

let term1LetterOrNot = null;

let exampleTerm1 = null;

let exampleTerm2 = null;

let maxValue = null;

let randomExampleValue = null;

let inputPlace = document.getElementById("input");


//event listener
document.addEventListener("keydown", (event) =>
{
    if(event.key == "Enter")
    {
        createPascalTriangle();
    }
    else if(event.key == "Tab")
    {
        event.preventDefault();
        document.getElementById("input").focus();
    }
    else if(event.key == "ArrowRight" || event.key == "ArrowLeft")
    {
        event.preventDefault();
        move += event.key == "ArrowRight" ? 1 : -1;
    }

    insertObj.style.transform = `translate(${move * -30}px, 0px)`;
});

document.addEventListener('contextmenu', (event) =>
{
    event.preventDefault();
});


//function
function factorial(num)
{
    if(num === 1 || num === 0)
    {
        return 1;
    }

    return num * factorial(num - 1);
}

function combination(numOfOption, pickAmount)
{
    return factorial(numOfOption) / (factorial(pickAmount) * factorial(numOfOption - pickAmount));
}

function pascalTriangle(layer)
{
    let result = "";

    for (let i = 0; i < layer; i++)
    {
        let newline = document.createElement("div");
        daInsertPlace.appendChild(newline);
        newline.setAttribute("class", "insert");

        for (let count = 0; count < i + 1; count++)
        {
            result += Math.round(combination(i, count));

            newline.appendChild(document.createElement("span"));
            let thePlace = newline.lastChild;

            thePlace.innerHTML = result;

            if(/^[+-]?[a-z]$/.test(bino1.value))
            {
                thePlace.innerHTML = thePlace.innerHTML.concat(`${bino1.value}<sup>${i - count}</sup>`);
            }
            else if(/^[+-]?\d+$/.test(bino1.value))
            {
                if((Number(bino1.value) === 0) && ((i - count) === 0))
                {
                    thePlace.innerHTML = thePlace.innerHTML.concat("0<sup>0</sup>");
                }
                else
                {
                    thePlace.innerHTML = thePlace.innerHTML.concat(`(${Number(bino1.value) ** (i - count)})`);
                }
            }

            if(/^[+-]?[a-z]$/.test(bino2.value))
            {
                thePlace.innerHTML = thePlace.innerHTML.concat(`${bino2.value}<sup>${count}</sup>`);
            }
            else if(/^[+-]?\d+$/.test(bino2.value))
            {
                if((Number(bino2.value) === 0) && ((count) === 0))
                {
                    thePlace.innerHTML = thePlace.innerHTML.concat("0<sup>0</sup>");
                }
                else
                {
                    thePlace.innerHTML = thePlace.innerHTML.concat(`(${Number(bino2.value) ** (count)})`);
                }
            }

            newline.lastChild.title = `Row ${i + 1}: ${i}C${count}`;
            result = "";
        }
        
    }
}

function createPascalTriangle()
{
    move = 0;

    insertObj.style.transform = `translate(${move * -30}px, 0px)`;

    let value = Number(inputPlace.value);

    document.getElementById("insert").innerHTML = "";

    let valid = true;

    let invalidType = null;

    //making sure that the input value in the first input box is higher than 0,
    if(!(value > 0))
    {
        valid = false;
        invalidType = 1;
    }
    //making sure that the input value in the first input box is lower than 172,
    else if(value > 171)
    {
        valid = false;
        invalidType = 6;
    }
        //are not a decimal,
        else if(!(Number.isInteger(value)))
    {
        valid = false;
        invalidType = 2;
    }
    //making sure that both term actually passed the regular expression of either a number with one or multiple char, with 1 minus, or not, in the front; or 1 letter with 1 minus sign, or not, in the front;
    else if (!(bino1.value === "" && bino2.value === ""))
    {
        if(!(/^[+-]?\d+$/.test(bino1.value) || /^[+-]?[a-zA-Z]$/.test(bino1.value) || bino1.value === ""))
        {
            valid = false;
            invalidType = 3;
        }
        else if(!(/^[+-]?\d+$/.test(bino2.value) || /^[+-]?[a-zA-Z]$/.test(bino2.value) || bino2.value === ""))
        {
            valid = false;
            invalidType = 3;
        }
    }
    //making sure that both binomial term are not both number,
    else if(/^[+-]?\d+$/.test(bino1.value) && /^[+-]?\d+$/.test(bino2.value))
    {
        valid = false;
        invalidType = 4;
    }
    //making sure that not same letter is used for variable.
    else if(/^[+-]?[a-zA-Z]$/.test(bino1.value) && /^[+-]?[a-zA-Z]$/.test(bino2.value))
    {
        if(bino1.value.replace(/-/g, '') === bino2.value.replace(/-/g, ''))
        {
            valid = false;
            invalidType = 5;
        }
    }
    
    //making sure that term1, if not a number, doesn't have uppercased letter
    if (/^[+-]?[a-zA-Z]$/.test(bino1.value) && /^[+-]?[A-Z]$/.test(bino1.value))
    {
        valid = false;
        invalidType = 7;
    }

    //making sure that term2, if not a number, doesn't have uppercased letter
    if (/^[+-]?[a-zA-Z]$/.test(bino2.value) && /^[+-]?[A-Z]$/.test(bino2.value))
    {
        valid = false;
        invalidType = 7;
    }

    if(valid)
    {
        pascalTriangle(value);
    }
    else
    {
        daInsertPlace.appendChild(document.createElement("p"));
        let errorReportPlace = daInsertPlace.lastChild;

        errorReportPlace.style.textAlign = "center";
        errorReportPlace.style.fontFamily = "sans-serif";
        errorReportPlace.style.fontWeight = "900";
        errorReportPlace.style.color = "red";

        let errorMess = null;

        switch(invalidType)
        {
            case 1:
                errorMess = "The number of layer of the Pascal's Triangle must be higher than 0.";
                break;

            case 2:
                errorMess = "The number of layer of the Pascal's Triangle must not be a decimal.";
                break;
            
            case 3:
                errorMess = "Invalid value inputed for binomial term.";
                break;
            
            case 4:
                errorMess = "Both binomial term can't be a number.";
                break;
            
            case 5:
                errorMess = "Both binomial term can't have the same variable name.";
                break;

            case 6:
                errorMess = "The number of layer of the Pascal's Triangle can not be higher than 171 (this is to prevent the program breaking).";
                break;
            
            case 7:
                errorMess = "Variable name in binomial term can't be an UPPERCASED letter.";
                break;

            default:
                return;
        }

        errorReportPlace.textContent = errorMess;
    }
}


//preload code
maxValue = 10;

randomExampleValue = Math.floor(Math.random() * (maxValue - 1 + 1) + 1);

inputPlace.value = randomExampleValue;
inputPlace.setAttribute("placeholder", `Suggestion: ${randomExampleValue}`);
createPascalTriangle()

term1LetterOrNot = Math.round(Math.random()) === 1;

if(term1LetterOrNot)
{
    if(Math.round(Math.random()) === 1)
    {
        exampleTerm1 = exampleLetterList[Math.floor(Math.random() * ((exampleLetterList.length - 1) - 0 + 1) + 0)];
    }
    else
    {
        exampleTerm1 = "-" + exampleLetterList[Math.floor(Math.random() * ((exampleLetterList.length - 1) - 0 + 1) + 0)];
    }
}
else
{
    exampleTerm1 = Math.floor(Math.random() * (9 - (-9) + 1) + (-9));

    while(exampleTerm1 !== 0)
    {
        exampleTerm1 = Math.floor(Math.random() * (9 - (-9) + 1) + (-9));
    }
}

if(term1LetterOrNot)
{
    if(Math.round(Math.random()) === 1)
    {
        while(String(exampleTerm1).replace(/-/g, '') === String(exampleTerm2).replace(/-/g, '') || exampleTerm2 === null)
        {
            if(Math.round(Math.random()) === 1)
            {
                exampleTerm2 = exampleLetterList[Math.floor(Math.random() * ((exampleLetterList.length - 1) - 0 + 1) + 0)];
            }
            else
            {
                exampleTerm2 = "-" + exampleLetterList[Math.floor(Math.random() * ((exampleLetterList.length - 1) - 0 + 1) + 0)];
            }
        }
    }
    else
    {
        exampleTerm2 = Math.floor(Math.random() * (9 - (-9) + 1) + (-9));
        
        while(exampleTerm2 !== 0)
        {
            exampleTerm2 = Math.floor(Math.random() * (9 - (-9) + 1) + (-9));
        }
    }
}
else
{
    while(String(exampleTerm1).replace(/-/g, '') === String(exampleTerm2).replace(/-/g, '') || exampleTerm2 === null)
    {
        if(Math.round(Math.random()) === 1)
        {
            exampleTerm2 = exampleLetterList[Math.floor(Math.random() * ((exampleLetterList.length - 1) - 0 + 1) + 0)];
        }
        else
        {
            exampleTerm2 = "-" + exampleLetterList[Math.floor(Math.random() * ((exampleLetterList.length - 1) - 0 + 1) + 0)];
        }
    }
}

example.textContent = `(EX: ${exampleTerm1} and ${exampleTerm2})`;

document.getElementById("inputB1").setAttribute("placeholder", `Suggestion: ${exampleTerm1}`);

document.getElementById("inputB2").setAttribute("placeholder", `Suggestion: ${exampleTerm2}`);