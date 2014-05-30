$(document).ready(function() {
    
    $('#textbox').on('keyup', function(e){
        if(e.keyCode == 13 && this.value){
            var item = this.value;
            addItem(item);
            this.value='';
        }
    });

    $('.todo_list').on('click', 'li', function() {
        if(this.className) {
            $(this).removeClass();
        } else {
            $(this).addClass('item_done');
        }
    });

    $('.todo_list').on('dblclick', 'li', function() {
        $(this).remove();
    });

    function addItem() {
        var item = '<li>' + arguments[0] + '</li>';
        $('.todo_list').append(item);
    };

});