UE.registerUI('addbr', function(editor, addbr) {
    //editor.registerCommand(addbr, {
    //    execCommand: function() {
    //        alert('execCommand:' + addbr)
    //    }
    //});
    var btn = new UE.ui.Button({
        //按钮的名字
        name: addbr,
        //提示
        title: '换行（不同于回车，加br不换段）',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -900px 0;',
        //点击时执行的命令
        onclick: function() {
            //这里可以不用执行命令,做你自己的操作也可
            editor.execCommand('insertHtml','<br>')
        }
    });

    return btn;
});