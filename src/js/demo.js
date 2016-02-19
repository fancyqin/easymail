$(function () {


    function demoLoad(name) {
        var num = name.length;
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                var thisName = name[i];
                var box = $(".mod-space[data-name=" + thisName + "]");
                var type = box.attr('data-type');
                var place = $('#' + thisName);
                switch (type) {
                    case 'img':
                        newImg(box, place);
                        break;
                    case 'richTxt':
                        newEditor(box, thisName);
                        break;
                    case 'btn':
                        newBtn(box,place)
                }
            }
        }
    }


    function newEditor(box, placeholderID) {
        var settings = {
            toolbar: [
                'undo redo', //撤销
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
        var um = UM.getEditor(placeholderID, settings);
        var text = box.html().trim();
        text = text.replace(/\s+|\n/g, " ").replace(/>\s</g,"><");
        um.setContent(text);
        um.addListener('contentChange', function (um) {
            var inner = this.getContent();
            box.html(inner);
        })
    }


    function newImg(box, place) {
        var $img = box.find('img');
        var imgSrc = $img.attr('src');
        var imgTitle = $img.attr('title');
        var imgAlt = $img.attr('alt');

        var $inputSrc = place.find('.imgSrc');
        var $inputTitle = place.find('.imgTitle');
        var $inputAlt = place.find('.imgAlt');

        $inputSrc.val(imgSrc);
        $inputTitle.val(imgTitle);
        $inputAlt.val(imgAlt);


        var $link = box.find('a');
        if ($link.length > 0) {
            var linkUrl = $link.attr('href');
            var $inputLink = place.find('.imgLink');
            $inputLink.val(linkUrl);

            $inputLink.blur(function () {
                var val = $(this).val();
                $link.attr('href', val);
            })

        }
        $inputSrc.blur(function () {
            var val = $(this).val();
            $img.attr('src', val);
        });
        $inputTitle.blur(function () {
            var val = $(this).val();
            $img.attr('title', val);
        });
        $inputAlt.blur(function () {
            var val = $(this).val();
            $img.attr('alt', val);
        });

    }


    function btnTplSet(box,place,tplData){
        var tplIdName =  place.attr('id') + "-tpl";
        var tpl = $("#"+tplIdName).html();
        var tplItem = template(tpl, tplData);
        box.find('.btnWrap').html("").append(tplItem);
    }

    function newBtn(box,place){
        var link = 'http://';
        var text = "I'm a button";
        var _width = '150px';
        var tplData = {
            btnLink:link,
            btnTxt:text,
            btnWidth: _width
        };
        btnTplSet(box,place,tplData);

        var $btn = box.find('.btnBase');
        var btnTxt = $btn.text().trim();
        var btnLink = $btn.attr('href');

        var $inputTxt = place.find('.btnTxt');
        var $inputLink = place.find('.btnLink');

        $inputTxt.val(btnTxt);
        $inputLink.val(btnLink);

        $inputTxt.blur(function(){
            var val = $(this).val();
            $btn.text(val);
            var newWidth = $btn[0].offsetWidth + 'px';
            tplData.btnTxt = val;
            tplData.btnWidth =newWidth;
            btnTplSet(box,place,tplData);
        });
        $inputLink.blur(function(){
            var val = $(this).val();
            //$btn.attr('href',val);
            tplData.btnLink = val;
            btnTplSet(box,place,tplData);
        });

    }


    var $WEBUrl = $('#WEBUrl');
    var $inputWEBUrl = $('#inputWEBUrl');
    $inputWEBUrl.val($WEBUrl.attr('href'));
    $inputWEBUrl.change(function () {
        var val = $inputWEBUrl.val();
        $WEBUrl.attr('href', val)
    });


    //exportMail

    $('#exportMail').click(function(){
        var $mailTitle = $('#mailTitle');
        var mailTable = $('.demo .demo-fixed').html().trim();
        var codePop = $('.code-pop')
        if ($mailTitle.val() ===''){
            alert('邮件主题不能为空')
        }
        else {
            codePop.show();
            $('#codeCopy').val(mailTable);
        }
        codePop.find('.close').click(function(){codePop.hide()});
    });




    demoLoad(['festival-banner', 'festival-inner', 'festival-prod4-title', 'festival-prodImg-1', 'festival-prodImg-2', 'festival-prodImg-3', 'festival-prodImg-4', 'festival-btn']);

});