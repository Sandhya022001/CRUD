let cl=console.log;

//CRUD >> Create , Read , Update and delete.

const stdForm = document.getElementById('stdForm');
const fnameControl = document.getElementById('fname');
const lnameControl = document.getElementById('lname');
const emailControl = document.getElementById('email');
const contactControl = document.getElementById('contact');
const stdInfoContainer = document.getElementById('stdInfoContainer');
const subBtn= document.getElementById('subBtn')
const updateBtn = document.getElementById('updateBtn')

let stdArray =[]
function setStddataInstorage(arr){
    localStorage.setItem('setStdInfo',JSON.stringify(stdArray))
}

const onEditHandler = (ele) =>{
    cl("edittedd", ele)
    let getId = ele.getAttribute('data-id');
    localStorage.setItem('updateId' ,getId);
    cl(getId);
    let getObj = stdArray.find(std => std.id === getId);
    cl(getObj);
    fnameControl.value = getObj.fname;
    lnameControl.value = getObj.lname;
    emailControl.value = getObj.email;
    contactControl.value=getObj.contact;

    subBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
} 

const onDeleteHandler =(ele) =>{
    // cl(ele)
    let deleteId = ele.dataset.id;
    cl(deleteId);
    let getindex = stdArray.findIndex(std => std.id === deleteId);
    stdArray.splice(getindex, 1);
    // localStorage.setItem('setStdInfo',JSON.stringify(stdArray))
    setStddataInstorage()
    cl(ele.parentElement.parentElement)
    ele.parentElement.parentElement.remove()
}

const templating = (arr) =>{
     
    let result='';
   arr.forEach((std,i )=>{
        result += `
                     <tr>
                           <td> ${i+1} </td>
                           <td> ${std.fname} </td>
                           <td>  ${std.lname} </td>
                           <td> ${std.email} </td>
                           <td> ${std.contact} </td>
                            <td>
                                <button class="btn btn-info" data-id='${std.id}' onClick='onEditHandler(this)'>Edit</button>
                            </td>
                            <td>
                                <button class="btn btn-danger" data-id='${std.id}' onClick='onDeleteHandler(this)'>Delete</button>
                            </td>
                       </tr>
                 `
    })
    stdInfoContainer.innerHTML = result;
}

if(localStorage.getItem('setStdInfo')){
    stdArray = JSON.parse(localStorage.getItem('setStdInfo'))
    templating(stdArray)
}



const onStdSubmit =(eve) =>{
    eve.preventDefault();
    // cl('submitted !!!')
    let obj ={
    fname : fnameControl.value,
    lname : lnameControl.value,
    email : emailControl.value,
    contact : contactControl.value,
     id : uuid()
    }
    // cl(obj);
    stdArray.push(obj)
    cl(stdArray);
    // localStorage.setItem('setStdInfo',JSON.stringify(stdArray))
    setStddataInstorage()
    templating(stdArray)
   stdForm.reset()
}

const onStdupdate = (e) =>{
//    cl("updated")
   let getUpdateId = localStorage.getItem('updateId');
   cl(getUpdateId)
   stdArray.forEach(std =>{
    if(getUpdateId === std.id){
        std.fname = fnameControl.value;
        std.lname = lnameControl.value;
        std.email = emailControl.value;
        std.contact = contactControl.value;
    }
   })
   localStorage.setItem('setStdInfo',JSON.stringify(stdArray))
    templating(stdArray)
    stdForm.reset()

    subBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none')
}

stdForm.addEventListener('submit' , onStdSubmit)
updateBtn.addEventListener('click' , onStdupdate)
// const btnEdit = [...document.querySelectorAll('#stdInfoContainer .btn-info')]

// btnEdit.forEach(btn => {
//     btn.addEventListener('click' ,function(eve){
//         cl(eve.target)
//     })
// })

function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() *16 | 0, v = c == 'x' ? r :(r & 0x3 | 0x8);
        return v.toString(16);
    });
}



