
window.onload = function() {
    if(localStorage.getItem('savedlists')) {
    $('.persistent').html(localStorage.getItem('savedlists'));
    }
};

function saveToLocalStorage() {
    var lists = $('.persistent').html();
    localStorage.setItem('savedlists', lists);
}

function addListItem() {
    var text = $("#new-text").val();
    if (text){ // checking if anything was entered
        if (!text.replace(/\s/g, '').length) {
            alert("To-do items cannot be blank =)") // string only contained whitespace
        }else{
            $("#todolist").append('<li>'+text+'<button class="delete button button3">&#10060</button><button class="complete button button2">&#10004</button</li>');
            $("#new-text").val('');
        }
    }else{
        alert("Please enter a new to-do =)");
    }
    saveToLocalStorage();
}

function undoCompletion(todoitem) {
    var text = todoitem;
    $("#todolist").append('<li>'+text+'<button class="delete button button3">&#10060</button><button class="complete button button2">&#10004</button></li>');
    $("#new-text").val('');
}

function moveToComplete(todoitem) {
    var text = todoitem;
    $("#completedlist").append('<li>'+text+'<button class="delete button button3">&#10060</button><button id="undo" class="undo button button4">Undo</button></li>');
    $("#new-text").val('');
}

function deleteItem() {
    $(this).parent().remove();
    saveToLocalStorage();
}

function undoItem() {
    var lrm = $(this).parent().contents().get(0).nodeValue;
    undoCompletion(lrm);
    $(this).parent().remove();
    saveToLocalStorage();
}

function completeItem() {
    var lrm = $(this).parent().contents().get(0).nodeValue;
    if (lrm) {
        moveToComplete(lrm);
        $(this).parent().remove();
    }else{
        $(this).parent().remove();
    }
    saveToLocalStorage();
}

function deleteToDoList() {
    $("#todolist").empty();
    saveToLocalStorage();
}

function deleteCompletedList() {
    $("#completedlist").empty();
    saveToLocalStorage();
}

$(function() {
    $("#add").on('click', addListItem);

    $(document).on('click', '.complete', completeItem);
    $(document).on('click', '.delete', deleteItem);
    $(document).on('click', '.undo', undoItem);
    $(document).on('click', '.cleartodo', deleteToDoList);
    $(document).on('click', '.clearcompleted', deleteCompletedList);
});

$(document).keypress(function(e){   //  Binds ENTER to ADD button
    if (e.which == 13){
        $("#add").click();
    }
});
