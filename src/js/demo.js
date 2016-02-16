$(function(){


    var settings = {
        toolbar: [
            'undo redo',//撤销
            '|',
            'bold', //加粗
            'italic', //斜体
            'underline', //下划线
            '|',
            'cleardoc', //清空文档
            '|',
            'link', //超链接
            '|',
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            '|',
            'unlink',  //取消链接
            'source', //源代码
            'fontfamily', //字体
            'fontsize' //字号
            //'paragraph' //段落格式

        ]
    };
    var um = UM.getEditor('container',settings);


    var text = $('#mail-txt').html();

    um.setContent(text);


    //window.um = UM.getEditor('container', {
    //    /* 传入配置参数,可配参数列表看umeditor.config.js */
    //    toolbar: ['undo redo | bold italic underline']
    //});



});