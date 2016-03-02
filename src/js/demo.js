$(function () {


    $.extend({
        'demoLoad': function (name) {
            var num = name.length;
            if (num > 0) {
                for (var i = 0; i < num; i++) {
                    var thisName = name[i];
                    var box = $(".mod-space[data-name=" + thisName + "]");
                    var type = box.attr('data-type');
                    var place = $('#' + thisName);

                    var titleZh = place.siblings('.form-title:first').text();
                    box.attr('data-titleZh',titleZh);
                    switch (type) {
                        case 'img':
                            newImg(box, place);
                            break;
                        case 'txt':
                            newTxt(box, place);
                            break;
                        case 'richTxt':
                            var EditorId = thisName + '-edit';
                            newEditor(box, EditorId);
                            break;
                        case 'btn':
                            newBtn(box, place);
                            break;
                    }
                }
            }
        }
    });


    //富文本

    function newEditor(box, placeholderID) {
        var settings = {
            toolbars: [
                [   'undo','redo','|','bold', 'italic',  'underline',  'forecolor', '|', 'cleardoc',    '|','link',  '|', 'justifyleft', 'justifyright',  'justifycenter', '|', 'unlink'],
                ['source', 'fontfamily', 'fontsize' ,'addbr']
            ]
            ,wordCount:false
        };
        var um = UE.getEditor(placeholderID, settings);
        var text = box.html().trim();
        text = text.replace(/\s+|\n/g, " ").replace(/>\s</g, "><");
        um.ready(function(){
            um.setContent(text);
            um.addListener('contentChange', function (um) {
                var inner = this.getContent();
                box.html(inner);
                var $links = box.find('a');
                if ($links) {
                    $links.css({color: '#246bb3', textDecoration: 'none'})
                }
            })
        })
    }


    //图片

    function newImg(box, place) {
        var imgTpl = $("#imgPlaceTpl").html();
        var tplPlace = template(imgTpl);
        place.append(tplPlace);

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
        var $inputLink = place.find('.imgLink');
        if ($link.length > 0) {
            var linkUrl = $link.attr('href');
            $inputLink.val(linkUrl);
        }
        $inputLink.blur(function () {
            var val = $(this).val();
            var img = $img.prop('outerHTML');
            isHttp($inputLink, function () {
                box.html('');
                box.html('<a href="' + val + '">' + img + '</a>');
                $link.attr('href', val);
            });

        });
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


    //按钮

    function newBtn(box, place) {

        //设置按钮编辑模板
        var btnTpl = $("#btnPlaceTpl").html();
        var tplPlace = template(btnTpl);
        place.append(tplPlace);


        //设置按钮模板
        function btnTplSet(box, place, tplData) {
            var tplIdName = place.attr('id') + "-tpl";
            var tpl = $("#" + tplIdName).html();
            var tplItem = template(tpl, tplData);
            box.find('.btnWrap').html("").append(tplItem);
        }

        var btnDetail = box.find('.btnDetail');
        var btnVal = JSON.parse(btnDetail.val());
        var link = btnVal.link;
        var text = btnVal.title;
        var _width = btnVal.width;
        var tplData = {
            btnLink: link,
            btnTxt: text,
            btnWidth: _width
        };
        btnTplSet(box, place, tplData);

        var $btn = box.find('.btnBase');
        var btnTxt = $btn.text().trim();
        var btnLink = $btn.attr('href');

        var $inputTxt = place.find('.btnTxt');
        var $inputLink = place.find('.btnLink');

        $inputTxt.val(btnTxt);
        $inputLink.val(btnLink);

        $inputTxt.blur(function () {
            var val = $(this).val();
            $btn.text(val);
            var newWidth = $btn[0].offsetWidth + 'px';

            tplData.btnTxt = val;
            btnVal.title = val;
            tplData.btnWidth = newWidth;
            btnVal.width = newWidth;

            btnDetail.val(JSON.stringify(btnVal));
            btnTplSet(box, place, tplData);
        });
        $inputLink.blur(function () {
            var val = $(this).val();
            //$btn.attr('href',val);

            isHttp($inputLink, function () {
                tplData.btnLink = val;
                btnVal.link = val;

                btnDetail.val(JSON.stringify(btnVal));
                btnTplSet(box, place, tplData);
            })


        });

    }

    //文本

    function newTxt(box, place) {

        var txtTpl = $("#txtPlaceTpl").html();
        var tplPlace = template(txtTpl);
        place.append(tplPlace);

        var $txtBox = box.find('.txtBox');
        var txt = $txtBox.text().trim();
        var $inputTxt = place.find('.inputTxt');
        $inputTxt.val(txt);

        $inputTxt.blur(function () {
            var val = $inputTxt.val();
            $txtBox.text(val);
        })
    }


    //WEB版地址

    var $inputWEBUrl = $('#inputWEBUrl');
    $inputWEBUrl.val($('#WEBUrl').attr('href'));
    $inputWEBUrl.blur(function () {
        var val = $(this).val();
        isHttp($inputWEBUrl, function () {
            $('#WEBUrl').attr('href', val);
        })
    });




    function gethtmlCode() {
        var mailTitle = $('#mailTitle').val();
        var mailTable = $('#tableInner').html().trim().replace(/\s+|\n/g, " ").replace(/>\s</g, "><");
        var htmlCode = '<html>' +
                            '<head>' +
                                '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
                                '<title>' + mailTitle + '</title>' +
                                '<style type="text/css">body{margin: 0 auto}</style>' +
                            '</head>' +
                            '<body>' + mailTable + '</body>' +
                       '</html>';
        return htmlCode;
    }

    //导出html

    $('#exportMail').click(function () {
        var mailTitle = $('#mailTitle').val();
        var htmlCode = gethtmlCode();
        var codePop = $('.code-pop');
        if (mailTitle === '') {
            alert('邮件主题不能为空')
        }
        else {
            codePop.show();
            $('#codeCopy').val(htmlCode);
        }
        codePop.find('.close').click(function () {
            codePop.hide()
        });
    });

    $('#save').click(function () {
        var htmlCode = gethtmlCode();
        var priew = window.open('', '');
        priew.document.write(htmlCode);

    });

    //切换mod

    $('.mod-space').click(function () {
        var id = $(this).attr('data-name');
        var $thisBox = $('#' + id).parents('.form-item:first');
        $('.form-item').removeClass('open');
        $thisBox.addClass('open');
    });


    //校验网址
    function isHttp(input, cb) {
        var val = input.val();
        var httpReg = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        input.removeClass('error');
        if (val) {
            if (!httpReg.test(val)) {
                alert('请输入正确的地址');
                input.addClass('error').focus();
            } else {
                input.removeClass('error');
                cb();
            }
        }

    }


    window.onbeforeunload = function (e) {
        var msg = '您正准备离开此页，您未保存的编辑数据将会丢失！！！！慎重啊，小主~';
        e.returnValue = msg;
        return msg;
    };

    function changeMailType(){
        var $mBox = $('#mailType');
        var $inputMailType = $('#mailHFType');
        var $type = $mBox.find('.type');
        var $lang = $mBox.find('.lang');
        var mailType = JSON.parse($inputMailType.val());
        function modtype (modType,lang){
            var lang_header = lang+'_header';
            var lang_footer = lang+'_footer';
            var header = modType[lang_header];
            var footer = modType[lang_footer];
            var webURL = $inputWEBUrl.val();
            $('#header').html('').html(header);
            $('#footer').html('').html(footer);

            $('#WEBUrl').attr('href',webURL)
        }
        function setChange(mailType){
            var Type = mailType.type;
            var Lang = mailType.lang;
            var modType;
            switch (Type){
                case '1a':
                    modType = tpl.mail_1a;
                    $lang.show();
                    modtype(modType,Lang);
                    break;
                case '1b':
                    $lang.hide();
                    modType = tpl.mail_1b;
                    modtype(modType,'en');
                    break;
                case '1c':
                    modType = tpl.mail_1c;
                    $lang.show();
                    modtype(modType,Lang);
                    break;
                case '2a':
                    modType = tpl.mail_2a;
                    modtype(modType,Lang);
                    break;
                case '2b':
                    modType = tpl.mail_2b;
                    modtype(modType,Lang);
                    break;
                case '2c':
                    modType = tpl.mail_2c;
                    modtype(modType,Lang);
                    break;
            }
            $type.find('span').removeClass('on').siblings('span[data-type='+ Type +']').addClass('on');
            $lang.find('span').removeClass('on').siblings('span[data-lang='+ Lang +']').addClass('on');
        }
        setChange(mailType);

        $type.on('click','span',function(e){
            var $target = $(e.target);
            var typeVal = $target.attr('data-type');
            mailType.type = typeVal;
            if (typeVal === '1b'){
                mailType.lang = 'en';
            }
            $inputMailType.val(JSON.stringify(mailType));
            setChange(mailType);
        });
        $lang.on('click','span',function(e){
            var $target = $(e.target);
            var langVal = $target.attr('data-lang');
            mailType.lang = langVal;
            $inputMailType.val(JSON.stringify(mailType));
            setChange(mailType);
        });
    }
    changeMailType()





});