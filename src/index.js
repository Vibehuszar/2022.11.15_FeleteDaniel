import './style.css';

function allQuotes(quoteLista){
    let lista = document.getElementById('quotes');
    for(let q of quoteLista){
        let li = document.createElement('li');
        li.innerHTML = "Idézet: " + q.quote + "<br>" +  " Szerző: " + q.author + "<br>";
        lista.appendChild(li);
    }

}


document.addEventListener('DOMContentLoaded', async ()=>{
    document.getElementById('all').addEventListener('click', async ()=>{
        let lista = document.getElementById('quotes');
        lista.innerHTML = "";
        let response = await fetch ("/quotes.json");
        let eredmeny = await response.json();
        let result = eredmeny.quotes.sort((a , b) =>{
            if(a.author < b.author){
                return -1;
            }
            else if(a.author > b.author){
                return 1;
            }
            else{
                return 0;
            };
            
        })
        allQuotes(result);
    })

    document.getElementById('the').addEventListener('click', async ()=>{
        let quotes = [];
        let lista = document.getElementById('quotes');
        lista.innerHTML = "";
        let lista_two = document.getElementById('quotes_two')
        lista_two.innerHTML = "";
        let response = await fetch ("/quotes.json");
        let eredmeny = await response.json();
        console.log(eredmeny);
        for(let e of eredmeny.quotes){
            let idezet = e.quote;
            idezet = idezet.replace("The ", "<b>The </b>");
            idezet = idezet.replace("the ", "<b>the </b>");
            quotes.push(idezet);
        }
        for(let e of quotes){
            let li = document.createElement('li');
            li.innerHTML = e;
            lista_two.appendChild(li);
        }

        
        
    })

    document.getElementById('length').addEventListener('click', async ()=>{
        let lista = [];
        let p = document.getElementById('plength');
        let response = await fetch ("/quotes.json");
        let eredmeny = await response.json();
        for(let e of eredmeny.quotes){
            let number = parseInt(e.quote.length);
            lista.push(number);
            lista.join(',');
        }
        p.innerHTML = lista;
    })

    document.getElementById('count').addEventListener('click', async ()=>{
        let countinput = document.getElementById('countinput');
        let textinput = document.getElementById('textinput');
        let lista = document.getElementById('quotes');
        lista.innerHTML = "";
        let response = await fetch ("/quotes.json");
        let eredmeny = await response.json();
        let result = eredmeny.quotes.filter(e => e.author == textinput.value);
        let count = result.length;
        countinput.value = parseInt(count);
    })
})
