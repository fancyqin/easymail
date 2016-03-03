UE.registerUI('addbr', function(editor, addbr) {
    //editor.registerCommand(addbr, {
    //    execCommand: function() {
    //        alert('execCommand:' + addbr)
    //    }
    //});
    var btn = new UE.ui.Button({
        name: addbr,
        title: '换行（不同于回车，加br不换段）',
        cssRules: 'background-position: -900px 0;',
        onclick: function() {
            editor.execCommand('insertHtml','<br>')
        }
    });

    return btn;
});