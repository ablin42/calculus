window.addEventListener("keyup", function(event) {
    let keyPressed = event.keyCode;
    if (keyPressed >= 96 && keyPressed <= 111)
        insert(event.key);
    if (keyPressed === 13)
        equal();
    if (keyPressed === 8)
        back();
})

let textview = document.getElementById("textview");

function evil(exp) { /* caqlc func  (eval alternative) */
    return new Function('return ' + exp)();
}

function calculator(exp) {
    return ;
}

function equal(){
    try {
        var exp = document.getElementById("textview").value;
        if (exp){
            document.getElementById("textview").value = evil(exp);
            //document.getElementById("textview").value = eval(exp);
        }
    } catch (err) {
        console.log("An error occured:", err.message);
        clean();
        var alert = `
                <div id="alert" class="alert" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" onclick="dismissAlert(this)">x</span></button>
                    <b>${err.message}</b>
                </div>`;
        addAlert(alert, "#header")   
    }
}

function insert(num){
    document.getElementById("textview").value = document.getElementById("textview").value + num;
}

function clean(){
    document.getElementById("textview").value = "";
}

function back(){
    var exp = document.getElementById("textview").value;
    document.getElementById("textview").value = exp.substring(0,(exp.length - 1));
}

function dismissAlert(closeBtn)
{
    var alert = closeBtn.parentElement,
    wrap = document.getElementById("alertwrapper");
    if (wrap)
        wrap.remove();
    alert.remove();
}

function addAlert(alert, where)
{
    let node = document.createElement('div'),
        alertDiv = document.getElementById("alert"),
        wrap = document.getElementById("alertwrapper");

    node.setAttribute("id", "alertwrapper");
    if (alertDiv){
        if (wrap) 
            wrap.remove();
        alertDiv.remove();
    }
    node.innerHTML += alert;
    $(where).after(node);   
}

$('.button').on('click', function() {
    let target = this;
    $(this).toggleClass('clicked');
    setTimeout(function(){ $(target).toggleClass('clicked') }, 250);
});