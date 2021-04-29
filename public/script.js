const inp = document.querySelector('#inp');
const btn = document.querySelector('#btn');
const table = document.querySelector('#table');

const refreshPage = async() => {
    console.log(inp);

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
  

    const res = await axios.post('/query',{queryString:inp.value});


    let tableBody = "<tbody>";
    let tableHead = "<thead>";
    let s = "";
    for (let h in res.data[0]) {
        s += `<th>${h}</th>`;
    }
    tableHead = tableHead + s + '</thead>';
    table.innerHTML += tableHead;
    for (let row of res.data) {
        // console.log(row);
        tableBody += '<tr>'
        let str = "";
        for (let col in row) {
            console.log(row[col]);
            str += `<td>${row[col]}</td>`
        }
        tableBody += str;
        tableBody += '</tr>'
    }
    tableBody += "<tbody>";
    table.innerHTML += tableBody;
    console.log(tableBody);


    console.log("Query Done");
    
    // console.log(res);
}

btn.addEventListener('click', () => {
    refreshPage();
})

