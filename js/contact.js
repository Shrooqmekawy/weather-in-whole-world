var navLink=document.querySelector("#navLink");
var navExtra=document.querySelector("#extralink")
var btn= document.querySelector("#btn")
// var homeLink= document.querySelector(".homeLink")
// var homeLink1= document.querySelector(".homeLink1")
 var form=document.querySelector("#formp")
console.log(navLink,navExtra,btn)

    window.addEventListener("resize", function(){
        if(window.innerWidth<=960){
            navLink.classList.add("d-none")
            
            btn.classList.remove("d-none")
        }
        else{
            navLink.classList.remove("d-none")
       
            btn.classList.add("d-none")
            navExtra.classList.add("d-none")
        }
    }) 
     window.addEventListener("load", function(){
        if(window.innerWidth<=960){
            navLink.classList.add("d-none")
            btn.classList.remove("d-none")
        }
        else{
            navLink.classList.remove("d-none")
       
            btn.classList.add("d-none")
            navExtra.classList.add("d-none")
        }
    })
    // btn.addEventListener("click",function(){
    //     navExtra.classList.toggle("d-none")
    // })
    // homeLink.addEventListener("click",function(){
    //     location.href="index.html"
    // })
    // homeLink1.addEventListener("click",function(){
    //     location.href="index.html"
    // })
    // .......................................
    document.addEventListener("click",function(e){
        if(e.target.id=="btn"){
            navExtra.classList.toggle("d-none")
        }
         if(e.target.id=="homeLink"||e.target.id=="homeLink1"){
            location.href="index.html"
        }
        
    })
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
       
    });