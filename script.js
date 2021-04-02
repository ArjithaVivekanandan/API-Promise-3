
    
    apiCall();

//List of Characters in Game of Thrones
 async function apiCall()
 {
content.innerHTML="";
  var data= await (await fetch("https://game-of-thrones-quotes.herokuapp.com/v1/houses")).json();
  return handleResponse(data);  
}

 function handleResponse(response) { 
  
  try{

  for(var i=0;i<response.length;i++)
  {
    var Cards=document.createElement("div");
    Cards.setAttribute("class","card");

    var House_Title=document.createElement("div");
    House_Title.setAttribute("class","card-header text-primary h4");
    House_Title.innerHTML=response[i].name;

    Cards.append(House_Title);
    var memberDiv=document.createElement("div");
    memberDiv.setAttribute("class","card-body");

   

    response[i].members.forEach(function(member){

        var memberName=document.createElement("a");
        memberName.setAttribute("class","card-title text-danger h5");
        memberName.innerHTML="<br>"+member.name;
      
        memberName.onclick=function(){ViewQuotes(member.slug,member.name)};

        memberDiv.append(memberName);
        Cards.append(memberDiv);
    })
    var br=document.createElement("br");

    document.getElementById("content").append(br,Cards);
          
    
    
  }
 
      
    }
    
  catch{
    
    document.getElementById("content").innerHTML = "No records Exist";
  
  }
  
}



//View Quotes of a Character
async function ViewQuotes(charName,author){

  console.log(charName,author);
  var quotesData=await (await fetch("https://game-of-thrones-quotes.herokuapp.com/v1/character/"+charName)).json();
  console.log(quotesData);
  return handlequotesData(quotesData,author);
}

function handlequotesData(quotesresponse,author)
{
try{
  content.innerHTML="";

  var Author=document.createElement("div");
  Author.setAttribute("class","card-header text-primary text-center h4");
  Author.innerHTML=author+"'s Quotes";

  var brk=document.createElement("br");
  document.getElementById("content").append(Author,brk);

  quotesresponse[0].quotes.forEach(function(eachquote){

    var quote=document.createElement("div");
    quote.setAttribute("class","card-body text-dark h5");
      quote.innerHTML=eachquote+"<hr>"; 
      document.getElementById("content").append(quote); 

 })

 var back=document.createElement("a");
 back.setAttribute("class","btn btn-primary text-center")
 back.innerHTML="Back to Home Page";
 back.onclick=function(){ apiCall()};

 document.getElementById("content").append(back);
}
catch{
  document.getElementById("content").innerHTML="No Quotes Found!!"
}

}