$(function () {
    xoso.init();
});
var xosoconfig = {
    rootPath: '/'
}
var isrunning = false;
var xoso = {
    variables: {
        lotMsgListMN: 0,
        lotMsgListMT: 0,
        currentPage: 1,
        previousPrize6: null // Lưu kết quả thứ 2 của giải 6 lần trước
    },
    init: function() {
        // Load previousPrize6 from localStorage if exists
        this.variables.previousPrize6 = localStorage.getItem('previousPrize6');
        this.events();
    },
    events: function() {
        $(document).on("mouseenter mouseleave",
            "#hover-number td",
            function(e) {
                var id = $(this).parent().attr("data"), value = $(this).text();
                if (e.type == "mouseenter") {
                    $('#table-' + id + ' tbody tr td span').each(function(index, element) {
                        if ($(element).children('span').length == 0) {
                            var txt = $(element).html();
                            if (txt[txt.length - 1] == value || txt[txt.length - 2] == value)
                                $(element).html(txt.slice(0, txt.length - 2) +
                                    '<mark>' +
                                    txt.slice(txt.length - 2, txt.length) +
                                    '</mark>');
                        }
                    });
                } else {
                    $('#table-' + id + ' tbody tr td span').each(function(index, element) {
                        if ($(element).children('span').length == 0) {
                            var txt = $(element).html();
                            var res = txt.split('<mark>');
                            $(element).html(res);
                        }
                    });
                }
            });
        $(document).on('click',
            '#thongKe0145',
            function () {
                var df = $("#datepicker").datepicker({ dateFormat: "dd-mm-yy" }).val();
                var dt = $("#datepicker1").datepicker({ dateFormat: "dd-mm-yy" }).val();
                var datefr = new Date(df.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
                var datet = new Date(dt.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
                if (datefr >= datet) {
                    alert('Ngày chọn không hợp lệ (Vui lòng nhập ngày kết thúc lớn hơn ngày bắt đầu).');
                }
                dateFrom = df;
                dateTo = dt;
                $.xosoAjax('/ThongKeXSMega/ThongKe0145Ajax',
                    'Post',
                    { dateFrom: dateFrom, dateTo: dateTo },
                    function(resp) {
                        if (resp.length > 0) {
                            $("#thongKe0145Text").html("Thống kê số lần về của các cặp số <a href='/xo-so-tu-chon-mega-645'>XS Mega</a> từ ngày " + dateFrom + " đến ngày " + dateFrom);
                            $('#thongKe0145Kq').html(resp);
                        }
                    });
            });
        $(document).on('click',
            '#thongKeMegaNhieuIt',
            function() {
                var df = $("#datepicker").datepicker({ dateFormat: "dd-mm-yy" }).val();
                var dt = $("#datepicker1").datepicker({ dateFormat: "dd-mm-yy" }).val();
                var datefr = new Date(df.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
                var datet = new Date(dt.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
                if (datefr >= datet) {
                    alert('Ngày chọn không hợp lệ (Vui lòng nhập ngày kết thúc lớn hơn ngày bắt đầu).');
                }
                dateFrom = df;
                dateTo = dt;
                $.xosoAjax('/ThongKeXSMega/ThongKeMegaNhieuItAjax',
                    'Post',
                    { dateFrom: dateFrom, dateTo: dateTo },
                    function(resp) {
                        if (resp.length > 0) {
                            $("#thongKeMegaNhieuItText").html("Thống kê số lần về của các cặp số <a href='/xo-so-tu-chon-mega-645'>XS Mega</a> từ ngày " + dateFrom + " đến ngày " + dateFrom);
                            $('#thongKeMegaNhieuItKq').html(resp);
                        }
                    });
            });
        $(document).on('click',
            '#thongKeTanSuatTheoNgay',
            function () {
                var df = $("#datepicker").datepicker({ dateFormat: "dd-mm-yy" }).val();
                var dt = $("#datepicker1").datepicker({ dateFormat: "dd-mm-yy" }).val();
                var datefr = new Date(df.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
                var datet = new Date(dt.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
                if (datefr >= datet) {
                    alert('Ngày chọn không hợp lệ (Vui lòng nhập ngày kết thúc lớn hơn ngày bắt đầu).');
                    return;
                }
                var diffDate = datet - datefr,
                    years = Math.floor(diffDate / 31536000000),
                    months = Math.floor((diffDate % 31536000000) / 2628000000);
                if (years > 1 || years == 1 && months >= 1) {
                    alert('Vui lòng chọn khoảng thời gian cần thống kê tối đa là 12 tháng.');
                    return;
                }
                dateFrom = df;
                dateTo = dt;
                $.xosoAjax('/ThongKeXSMega/ThongKeTanSuatTheoNgayAjax',
                    'Post',
                    { dateFrom: dateFrom, dateTo: dateTo },
                    function (resp) {
                        if (resp.length > 0) {
                            $("#thongKeTanSuatTheoNgayText").html("Thống kê tần suất <a href='/xo-so-tu-chon-mega-645'>XS Mega</a> từ ngày " + dateFrom + " đến ngày " + dateFrom);
                            $('#thongKeTanSuatTheoNgayKq').html(resp);
                        }
                    });
            });
        $(document).on('click',
            '#btnSend_g2grs21ohg',
            function () {
                var lotoNumber = $('#LotoNumber_20fjd54l5n'),
                    prizeType = $("input[name='PrizeType_pucp5ou6xm']:checked"),
                    lotteryId = $("#LotteryId_dahq1pwalz option:selected"),
                    reg = /[^0-9]/g;
                $('#btnReport_ovoorj7bo2').removeAttr('data-id');
                $(this).attr('data-id', 1);
                if (lotoNumber.val().trim() == '') {
                    alert('Bạn chưa nhập cặp lô kết.');
                    lotoNumber.focus();
                    return;
                } else if (lotoNumber.val().length != 2) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber.focus();
                    return;
                }
                if (reg.test(lotoNumber.val())) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber.focus();
                    return;
                }
                $.xosoAjax('/LoKet/LoKetSend',
                    'Post',
                    { lotoNumber: lotoNumber.val(), prizeType: prizeType.val(), lotteryId: lotteryId.val() },
                    function (resp) {
                        if (resp.length > 0) {
                            var messages = $(resp).filter('#LoketMessages_dahq1pwalz');
                            if (messages.length > 0) {
                                alert(messages.text());
                            } else {
                                $('#LoketKq_6w5w38gz3g').html(resp);
                            }
                        }
                    });
            });
        $(document).on('click',
            '#btnReport_ovoorj7bo2',
            function () {
                var prizeType = $("input[name='PrizeType_pucp5ou6xm']:checked"),
                    lotteryId = $("#LotteryId_dahq1pwalz option:selected");
                $('#btnSend_g2grs21ohg').removeAttr('data-id');
                $(this).attr('data-id', 1);
                //$('#LotoNumber_20fjd54l5n').val('');
                $.xosoAjax('/LoKet/LoKetReport',
                    'Post',
                    { prizeType: prizeType.val(), lotteryId: lotteryId.val() },
                    function (resp) {
                        if (resp.length > 0) {
                            var messages = $(resp).filter('#LoketMessages_dahq1pwalz');
                            if (messages.length > 0) {
                                alert(messages.text());
                            } else {
                                $('#LoketKq_6w5w38gz3g').html(resp);
                            }
                        }
                    });
            });
        $(document).on('click',
            '#btnSend_5gs4izpw3r',
            function () {
                var lotoNumber1 = $('#LotoNumber_dg232dist9'),
                    lotoNumber2 = $('#LotoNumber_v7pm07wf04'),
                    lotoNumber3 = $('#LotoNumber_pj2sbd1z6y'),
                    reg = /[^0-9]/g;
                $('#btnReport_ik5y3v08nz').removeAttr('data-id');
                $(this).attr('data-id', 1);
                if (lotoNumber1.val().trim() == '') {
                    alert('Bạn chưa nhập cặp lô thứ 1.');
                    lotoNumber1.focus();
                    return;
                }
                if (lotoNumber1.val().length != 2) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber1.focus();
                    return;
                }
                if (reg.test(lotoNumber1.val())) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber1.focus();
                    return;
                }
                if (lotoNumber2.val().trim() == '') {
                    alert('Bạn chưa nhập cặp lô thứ 2.');
                    lotoNumber2.focus();
                    return;
                }
                if (lotoNumber2.val().length != 2) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber2.focus();
                    return;
                }
                if (reg.test(lotoNumber2.val())) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber2.focus();
                    return;
                }
                if (lotoNumber3.val().trim() == '') {
                    alert('Bạn chưa nhập cặp lô thứ 3.');
                    lotoNumber3.focus();
                    return;
                }
                if (lotoNumber3.val().length != 2) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber3.focus();
                    return;
                }
                if (reg.test(lotoNumber3.val())) {
                    alert('Vui lòng nhập cặp lô kết là số có 2 chữ số.');
                    lotoNumber3.focus();
                    return;
                }
                $.xosoAjax('/LoKet/Xien3KetSend',
                    'Post',
                    { lotoNumber1: lotoNumber1.val(), lotoNumber2: lotoNumber2.val(), lotoNumber3: lotoNumber3.val() },
                    function (resp) {
                        if (resp.length > 0) {
                            var messages = $(resp).filter('#LoketMessages_pi12fsqujg');
                            if (messages.length > 0) {
                                alert(messages.text());
                            } else {
                                $('#LoketKq_6u7alxprlj').html(resp);
                            }
                        }
                    });
            });
        $(document).on('click',
            '#btnReport_ik5y3v08nz',
            function () {
                $('#btnSend_5gs4izpw3r').removeAttr('data-id');
                $(this).attr('data-id', 1);
                //$('#LotoNumber_dg232dist9').val('');
                //$('#LotoNumber_v7pm07wf04').val('');
                //$('#LotoNumber_pj2sbd1z6y').val('');
                $.xosoAjax('/LoKet/Xien3KetReport',
                    'Post',
                    {},
                    function (resp) {
                        if (resp.length > 0) {
                            $('#LoketKq_6u7alxprlj').html(resp);
                        }
                    });
            });
        var XOSO_DATE_OPTION = {
            monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            dateFormat: 'dd-mm-yy',
            changeMonth: true,
            changeYear: true
        };
        //$("#datepicker").datepicker(XOSO_DATE_OPTION);
        //$("#datepicker1").datepicker(XOSO_DATE_OPTION);
    },
    ajaxEvents: {
        OnComplete: function() {
            $(".ajaxLoading").html("");
            $('.btn.btn-red').prop('disabled', false).css('cursor', 'default');
        },
        OnSuccess: function(data, status, xhr) {
            if (status == 'success') {
                if (data.jsonFlag == true) {
                    if (data.jsonRetval.length > 0) {
                        xoso.dialog(null,
                            'Thông báo',
                            data.jsonRetval,
                            null,
                            null,
                            function() {
                                window.location.href = xosoconfig.rootPath + 'profile.html';
                            });
                    }
                } else {
                    if (data.jsonRetval.length > 0) {
                        xoso.dialog(null, 'Thông báo', data.jsonRetval, null, null, null);
                    }
                }
            } else {
                alert('Quý khách vui lòng thử lại sau.');
            }
        },
        OnFailure: function(data) {
            $(".ajaxLoading").html("");
            $('.btn.btn-red').prop('disabled', false).css('cursor', 'default');
        },

    },
    ValidateDate: function(date) {
        var matches = /^(\d{4})[-\/](\d{2})[-\/](\d{2})$/.exec(date);
        if (matches == null) return false;
        var d = matches[3];
        var m = matches[2] - 1;
        var y = matches[1];
        var composedDate = new Date(y, m, d),
            isValid = composedDate.getDate() == d &&
                composedDate.getMonth() == m &&
                composedDate.getFullYear() == y;
        return { Date: composedDate, IsValid: isValid };
    },
    // random mien bac
    RunRandomComplete: function(str) {
        isrunning = false;
        $('#btnStartOrStop').html('Quay thử lại');
        //$('#turn').html('<span class="change-color">NHẤP QUAY THỬ LẠI</span>');
    },
    choice: function(id, num) {
        if (!isrunning || 1==1) {
            mn_mt = "table-xsmb";
            if (id == 1)
                mn_mt = "table-xsmn";
            if (id == 2)
                mn_mt = "table-xsmt";
            if (id == 3)
                mn_mt = "table-tinh";
            $('#' + mn_mt + ' tbody tr td p').each(function(index, element) {
                var txt = $(element).attr("data");console.log(txt)
                if (typeof (txt) != 'undefined' && txt != '...') {
                    if (num == 2 || num == 3) {
                        if (txt.length > num)
                            txt = txt.substr(txt.length - num);
                    }
                    $(element).text(txt);
                }
            });
        }
    },
    choiceTKGĐB: function(id, num) {
        if (!isrunning) {
            $('.lotoPrize').each(function(index, element) {
                var txt = $(element).attr("data");
                if (typeof (txt) != 'undefined' && txt != '...') {
                    if (num == 2) {
                        txt = txt.substr(0, 1);
                    } else if (num == 3) {
                        txt = txt.substr(1, 1);
                    }
                    $(element).text(txt);
                }
            });
            $('.showFull').each(function(index, element) {
                if (num == 0) {
                    $('.showFull').show();
                } else {
                    $('.showFull').hide();
                }
            });
        }
    },
    loadddlLotteries: function(typeltt, LotteryGroupId, LotteryCode) {
        var dayofweek = '';
        var ddlLotteries = document.getElementById("ddlProvincesQuayThu");
        $("#ddlProvincesQuayThu").empty();
        if (typeltt == 1) {
            $.ajax({
                url: xosoconfig.rootPath + 'Utils/GetAllLotteries',
                //data: {},
                type: 'GET',
                success: function(data) {
                    var option;
                    option = document.createElement("option");
                    option.text = 'Miền Bắc';
                    option.value = xosoconfig.rootPath + 'quay-thu-xsmb.html';
                    option.setAttribute("url", xosoconfig.rootPath + 'quay-thu-xsmb.html');
                    ddlLotteries.add(option, 0);
                    for (var i = 1; i < data.length + 1; i++) {
                        var lotObj = data[i - 1];
                        if (lotObj.lotteryGroupId <= 1) {
                            continue;
                        } else {
                            option = document.createElement("option");
                            option.text = lotObj.lotteryName;
                            option.value =
                                xosoconfig.rootPath + "quay-thu-xs" + lotObj.lotteryCode.toLowerCase() + ".html";
                            //option.setAttribute("url", xosoconfig.rootPath + "quay-thu-xs" + lotObj.lotteryCode.toLowerCase() + ".html");
                            if (lotObj.lotteryCode == LotteryCode.toUpperCase()) {
                                option.setAttribute("selected", "selected");
                            }
                            ddlLotteries.add(option, i);
                        }
                    }
                }
            });
        } else {
            option = document.createElement("option");
            option.text = 'Miền Bắc';
            option.value = xosoconfig.rootPath + 'quay-thu-xsmb.html';
            //option.setAttribute("url", xosoconfig.rootPath + 'quay-thu-xsmb.html');
            if (LotteryGroupId == 1) {
                option.setAttribute("selected", "selected");
            }
            ddlLotteries.add(option);

            option = document.createElement("option");
            option.text = 'Miền Nam';
            option.value = xosoconfig.rootPath + 'quay-thu-xsmn.html';
            //option.setAttribute("url", xosoconfig.rootPath + 'quay-thu-xsmn.html');
            if (LotteryGroupId == 2) {
                option.setAttribute("selected", "selected");
            }
            ddlLotteries.add(option);

            option = document.createElement("option");
            option.text = 'Miền Trung';
            option.value = xosoconfig.rootPath + 'quay-thu-xsmt.html';
            //option.setAttribute("url", xosoconfig.rootPath + 'quay-thu-xsmt.html');
            if (LotteryGroupId == 3) {
                option.setAttribute("selected", "selected");
            }
            ddlLotteries.add(option);
        }
    },
    RunRandomXSMB: function() {
        isrunning = true;
        xoso.goToByScroll('quaythumb');
        $('#btnStartOrStop').html('Đang quay thử');
        for (var i = 0; i < 10; i++) {
            $('#item_Tail_' + i).html('');
            $('#item_Head_' + i).html('');
        }

        var arrRange = new Array();
        
        // Lấy số đặc biệt từ lần quay trước
        var specialNumber = null;
        if (this.variables.previousPrize6) {
            var prevFirst = this.variables.previousPrize6.charAt(0);
            var prevLast = this.variables.previousPrize6.charAt(2);
            specialNumber = prevFirst + prevLast;
        }

        // Xác định vị trí xuất hiện của số đặc biệt
        var prizeStructure = [
            {prize: 1, count: 1, digits: 5}, // Giải 1
            {prize: 2, count: 2, digits: 5}, // Giải 2
            {prize: 3, count: 6, digits: 5}, // Giải 3
            {prize: 4, count: 4, digits: 4}, // Giải 4
            {prize: 5, count: 6, digits: 4}, // Giải 5
            {prize: 6, count: 3, digits: 3}, // Giải 6
            {prize: 7, count: 4, digits: 2}, // Giải 7
            {prize: 8, count: 1, digits: 5}  // Giải ĐB
        ];

        // Random vị trí xuất hiện của số đặc biệt
        var specialPrize = specialNumber ? Math.floor(Math.random() * prizeStructure.length) : -1;
        var specialPrizeIndex = specialNumber ? Math.floor(Math.random() * prizeStructure[specialPrize].count) : -1;
        var currentIndex = 0;

        // Giải 1 (1 kết quả, 5 chữ số)
        for (var i = 0; i < prizeStructure[0].count; i++) {
            if (specialPrize === 0 && specialPrizeIndex === i && specialNumber) {
                arrRange.push(xoso.getRandomStringWithSuffix(5, specialNumber));
            } else {
                arrRange.push(xoso.getRandomStringExclude(5, specialNumber));
            }
            currentIndex++;
        }

        // Giải 2 (2 kết quả, 5 chữ số)
        for (var i = 0; i < prizeStructure[1].count; i++) {
            if (specialPrize === 1 && specialPrizeIndex === i && specialNumber) {
                arrRange.push(xoso.getRandomStringWithSuffix(5, specialNumber));
            } else {
                arrRange.push(xoso.getRandomStringExclude(5, specialNumber));
            }
            currentIndex++;
        }

        // Giải 3 (6 kết quả, 5 chữ số)
        for (var i = 0; i < prizeStructure[2].count; i++) {
            if (specialPrize === 2 && specialPrizeIndex === i && specialNumber) {
                arrRange.push(xoso.getRandomStringWithSuffix(5, specialNumber));
            } else {
                arrRange.push(xoso.getRandomStringExclude(5, specialNumber));
            }
            currentIndex++;
        }

        // Giải 4 (4 kết quả, 4 chữ số)
        for (var i = 0; i < prizeStructure[3].count; i++) {
            if (specialPrize === 3 && specialPrizeIndex === i && specialNumber) {
                arrRange.push(xoso.getRandomStringWithSuffix(4, specialNumber));
            } else {
                arrRange.push(xoso.getRandomStringExclude(4, specialNumber));
            }
            currentIndex++;
        }

        // Giải 5 (6 kết quả, 4 chữ số)
        for (var i = 0; i < prizeStructure[4].count; i++) {
            if (specialPrize === 4 && specialPrizeIndex === i && specialNumber) {
                arrRange.push(xoso.getRandomStringWithSuffix(4, specialNumber));
            } else {
                arrRange.push(xoso.getRandomStringExclude(4, specialNumber));
            }
            currentIndex++;
        }

        // Giải 6 (3 kết quả, 3 chữ số)
        for (var i = 0; i < prizeStructure[5].count; i++) {
            if (specialPrize === 5 && specialPrizeIndex === i && specialNumber) {
                arrRange.push(xoso.getRandomStringWithSuffix(3, specialNumber));
            } else {
                var result = xoso.getRandomStringExclude(3, specialNumber);
                if (i === 1) {
                    // Lưu kết quả thứ 2 của giải 6 cho lần sau
                    this.variables.previousPrize6 = result;
                    localStorage.setItem('previousPrize6', result);
                }
                arrRange.push(result);
            }
            currentIndex++;
        }

        // Giải 7 (4 kết quả, 2 chữ số)
        for (var i = 0; i < prizeStructure[6].count; i++) {
            if (specialPrize === 6 && specialPrizeIndex === i && specialNumber) {
                arrRange.push(specialNumber);
            } else {
                arrRange.push(xoso.getRandomStringExclude(2, specialNumber));
            }
            currentIndex++;
        }

        // Giải đặc biệt (1 kết quả, 5 chữ số)
        if (specialPrize === 7 && specialNumber) {
            arrRange.push(xoso.getRandomStringWithSuffix(5, specialNumber));
        } else {
            arrRange.push(xoso.getRandomStringExclude(5, specialNumber));
        }

        // Hiển thị kết quả
        for (var i = 0; i < arrRange.length; i++) {
            $('#mb_prize_' + i).html('<img src="https://xoso666.top/images/image.gif" class="hide-img" alt="loadding"/>');
        }
        for (var i = 0; i < arrRange.length; i++) {
            xoso.sethtml('mb_prize_' + i, arrRange[i], 2000 * i);
        }
    },
    sethtml: function(id, value, time) {
        setTimeout(function() { xoso.sethtmlRuning(id, value); }, time);
    },
    sethtmlRuning: function(id, value) {
        var animationTimer = null;
        var started = new Date().getTime();
        var duration = 2000;
        var minNumber = 0; // le minimum
        var maxNumber = 9; // le maximum
        var temp = value, runloto = '';
        var spinOption = $('input[name="spinOptions"]:checked').val();
        if (spinOption == 2) {
            temp = value.substring(value.length - 2);
        } else if (spinOption == 3) {
            temp = value.substring(value.length - 3);
        }
        for (var i = 0; i < temp.length; i++) {
            runloto += '<span id="output' +
                i +
                '"class="runloto ' + (i % 2 == 0 ?"run-bg-2":"")+'">' +
                Math.floor((Math.random() * 9) + 1) +
                '</span>';
        }
        $('#' + id).html(runloto);
        animationTimer = setInterval(function() {
                if (new Date().getTime() - started < duration) {
                    //so chay random truoc khi show ket qua
                    for (var i = 0; i < temp.length; i++) {
                        $('#output' + i).text('' + Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber));
                    }
                } else {
                    clearInterval(animationTimer); // Stop the loop
                    //show ket qua
                    $('#' + id).html(temp);
                    $('#' + id).attr("data", value);
                    $('#' + id).attr('type', spinOption);
                }
            },
            100);
        xoso.addValueToTableLoto(value);
        if (typeof tableSpin != 'undefined') {
            if ($('td span', tableSpin).children('img').length == 0) {
                xoso.RunRandomComplete();
                if (typeof changeSpinOption != 'undefined')
                    clearInterval(changeSpinOption);
            }
        }
    },
    addValueToTableLoto: function(value) {
        if (value != null) {
            value = parseInt(value) % 100;

            var tail = value % 10;
            var head = value / 10;
            var special = $('.special-prize').text();
            tail = parseInt(tail);
            head = parseInt(head);
            var headSpecial = head, tailSpecial = tail;
            if (special != '') {
                headSpecial = '<span class="red">' + head + '</span>';
                tailSpecial = '<span class="red">' + tail + '</span>';
            }
            var strTail = $('#item_Tail_' + tail).html();
            var strHead = $('#item_Head_' + head).html();
            if (strTail.length > 0) {
                $('#item_Tail_' + tail).html(strTail + "," + headSpecial);
            } else {
                $('#item_Tail_' + tail).html(headSpecial);
            }
            if (strHead.length > 0) {
                $('#item_Head_' + head).html(strHead + "," + tailSpecial);
            } else {
                $('#item_Head_' + head).html(tailSpecial);
            }
        }
    },
    getRandomString: function(len) {
        var number = '';
        for (var i = 0; i < len; i++) {
            number += Math.floor(Math.random() * (9 - 0 + 1) + 0);
        }
        return number;
    },
    // Tạo số ngẫu nhiên với 2 số cuối được chỉ định
    getRandomStringWithSuffix: function(len, suffix) {
        var prefix = '';
        for (var i = 0; i < len - 2; i++) {
            prefix += Math.floor(Math.random() * 10).toString();
        }
        return prefix + suffix;
    },
    // Tạo số ngẫu nhiên không có 2 số cuối trùng với số chỉ định
    getRandomStringExclude: function(len, excludeNumber) {
        var result;
        do {
            result = this.getRandomString(len);
        } while (excludeNumber && result.slice(-2) === excludeNumber);
        return result;
    },
    // quaythu mien nam va mien trung
    RunRandomXSMN: function(lotteryGroup) {
        isrunning = true;
        xoso.goToByScroll('kqcaumb');
        $('#btnStartOrStop')
            .html('Đang quay thử'); //<img class="btn-loading" src="' + xosoconfig.rootPath + 'images/icon-loadding.gif"/>
        $("[id^=item_Head_]").html("");
        var conveniancecount = $("[id*='mn_prize_']").length;
        //console.log(conveniancecount);
        var numberprovince = conveniancecount / 18;
        var animationTimer = null;
        var started = new Date().getTime();
        var duration = 2000;
        var arrRange = new Array();
        //add ket qua
        for (var index = 0; index < numberprovince; index++) {
            arrRange.push(xoso.getRandomString(2));
        }
        for (var index = 0; index < numberprovince; index++) {
            arrRange.push(xoso.getRandomString(3));
        }
        for (var index = 0; index < numberprovince; index++) {
            for (var i = 0; i < 3; i++) {
                arrRange.push(xoso.getRandomString(4));
            }
        }
        for (var index = 0; index < numberprovince; index++) {
            arrRange.push(xoso.getRandomString(4));
        }
        for (var index = 0; index < numberprovince; index++) {
            for (var i = 0; i < 7; i++) {
                arrRange.push(xoso.getRandomString(5));
            }
        }
        for (var index = 0; index < numberprovince; index++) {
            for (var i = 0; i < 2; i++) {
                arrRange.push(xoso.getRandomString(5));
            }
        }
        for (var index = 0; index < numberprovince; index++) {
            arrRange.push(xoso.getRandomString(5));
        }
        for (var index = 0; index < numberprovince; index++) {
            arrRange.push(xoso.getRandomString(5));
        }
        for (var index = 0; index < numberprovince; index++) {
            arrRange.push(xoso.getRandomString(6));
        }
        //chuyen tat ca ket qua ve anh gif
        for (var i = 0; i < arrRange.length; i++) {
            $('#mn_prize_' + i).html('<img src="https://xoso666.top/images/image.gif" class="hide-img" alt="loadding"/>');
        }
        //gan du lieu cho tung ket qua, moi ket qua cach nhau 2000
        for (var i = 0; i < arrRange.length; i++) {
            xoso.sethtmlMN('mn_prize_' + i, arrRange[i], 2000 * i);
        }
    },
    sethtmlMN: function(id, value, time) {
        setTimeout(function() { xoso.sethtmlMNRuning(id, value); }, time);
    },
    sethtmlMNRuning: function(id, value) {
        var animationTimer = null;
        var started = new Date().getTime();
        var duration = 2000;
        var minNumber = 0; // le minimum
        var maxNumber = 9; // le maximum
        var temp = value, runloto = '';
        var spinOption = $('input[name="spinOptions"]:checked').val();
        if (spinOption == 2) {
            temp = value.substring(value.length - 2);
        } else if (spinOption == 3) {
            temp = value.substring(value.length - 3);
        }
        for (var i = 0; i < temp.length; i++) {
            runloto += '<span id="outputMN' +
                i +
                '"class="runloto '+ (i % 2 == 0 ?"run-bg-2":"")+'">' +
                Math.floor((Math.random() * 9) + 1) +
                '</span>';
        }
        $('#' + id).html(runloto);
        var lotteryCode = $('#' + id).attr("lotterycode");
        animationTimer = setInterval(function() {
                if (new Date().getTime() - started < duration) {
                    //so chay random truoc khi show ket qua
                    for (var i = 0; i < temp.length; i++) {
                        $('#outputMN' + i)
                            .text( '' + Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber));
                    }
                } else {
                    clearInterval(animationTimer); // Stop the loop
                    //show ket qua
                    $('#' + id).html(temp);
                    $('#' + id).attr("data", value);
                    $('#' + id).attr('type', spinOption);
                }
            },
            100);
        xoso.XSMNaddValueToTableLoto(value, lotteryCode);
        if (typeof tableSpin != 'undefined') {
            if ($('td p', tableSpin).children('img').length == 0) {
                xoso.RunRandomComplete();
                if (typeof changeSpinOption != 'undefined')
                    clearInterval(changeSpinOption);
            }
        }
    },
    XSMNaddValueToTableLoto: function(value, lotteryCode) {
        if (value != null) {
            value = parseInt(value) % 100;
            var tail = value % 10;
            var head = value / 10;
            tail = parseInt(tail);
            head = parseInt(head);
            var special = $('.prize_db[lotterycode="' + lotteryCode + '"]'), tailSpecial = tail;
            if (special.length && special.text() != '') {
                tailSpecial = '<span class="red">' + tail + '</span>';
            }
            var strHead = $('#item_Head_' + lotteryCode + "_" + head).html();
            if (strHead.length > 0) {
                $('#item_Head_' + lotteryCode + "_" + head).html(strHead + "," + tailSpecial);
            } else {
                $('#item_Head_' + lotteryCode + "_" + head).html(tailSpecial);
            }
        }
    },
    //quay thu theo dai
    RunRandomXSTheoDai: function(lotteryName) {
        isrunning = true;
        xoso.goToByScroll('kqcaumb');
        $('#btnStartOrStop').html('Đang quay thử');
        for (var i = 0; i < 10; i++) {
            $('#item_Tail_' + i).html("");
            $('#item_Head_' + i).html("");
        }
        //$('#turn').html('ĐANG QUAY THỬ XS' + lotteryCode + ' <img class="btn-loading" src="' + xsdpconfig.rootPath + 'assets/images/loading.gif"/>');
        var animationTimer = null;
        var started = new Date().getTime();
        var duration = 2000;
        var arrRange = new Array();
        //add ket qua
        arrRange.push(xoso.getRandomString(2));
        arrRange.push(xoso.getRandomString(3));
        for (var i = 0; i < 3; i++) {
            arrRange.push(xoso.getRandomString(4));
        }
        arrRange.push(xoso.getRandomString(4));
        for (var i = 0; i < 7; i++) {
            arrRange.push(xoso.getRandomString(5));
        }
        for (var i = 0; i < 2; i++) {
            arrRange.push(xoso.getRandomString(5));
        }
        arrRange.push(xoso.getRandomString(5));
        arrRange.push(xoso.getRandomString(5));
        //add ket qua giai dac biet
        arrRange.push(xoso.getRandomString(6));
        //chuyen tat ca ket qua ve anh gif
        for (var i = 0; i < arrRange.length; i++) {
            $('#qttd_prize_' + i).html('<img src="https://xoso666.top/images/image.gif" class="hide-img" alt="loadding"/>');
        }
        //gan du lieu cho tung ket qua, moi ket qua cach nhau 2000
        for (var i = 0; i < arrRange.length; i++) {
            xoso.sethtml('qttd_prize_' + i, arrRange[i], 2000 * i);
        }

    },
    //scroll
    goToByScroll: function(id) {
        // Remove "link" from the ID
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({ scrollTop: $("#" + id).offset().top }, 2000);

    },
    getTinhtheoNgay: function(str) {
        var url = xosoconfig.rootPath + 'tinh-theo-ngay-ajax.html';
        var dataGetter = {
            'strDay': str,
            'lotteriesId': 0
        };
        $.xosoAjax(url,
            'Get',
            dataGetter,
            function(resp) {
                $("#tinhheader").html(resp);
            });
    },  
    ThongKe: {
        GroupChange: function() {
            $("#ddLotteries").html('');
            var ddlGroups = $("#ddlGroups");
            var ddlLotteries = $("#ddLotteries");
            var groupId = $("#ddlGroups option:selected").val();
            var lotteryId = $("#ddLotteries option:selected").val();
            if (groupId <= 1) {
                ddlLotteries.append($('<option></option>').val(0).html('Miền Bắc'));
            } else {
                $.ajax({
                    url: xosoconfig.rootPath + 'Utils/GetAllLotteries',
                    type: 'Get',
                    success: function(data) {
                        var objJson = JSON.parse(data);
                        $.each(objJson,
                            function(i, option) {
                                if (option.LotteryGroupId == groupId) {
                                    ddlLotteries.append($('<option></option>').val(option.LotteryId)
                                        .html(option.LotteryName));
                                }
                            });
                    }
                });
            }
        },
        getHomeReport: function() {
            var url = xosoconfig.rootPath + 'XSDPAjax/GetHomeReport';
            var lotteryId = $("#ddLotteries option:selected").val();
            var lotteryName = $("#ddLotteries option:selected").text();
            var lotteryCode = $("#ddLotteries option:selected").attr('tag');
            var rollingNumber = $("#ddlRollingNumbers").val();
            if (rollingNumber == 0) {
                rollingNumber = 30;
            }
            var dataGetter = {
                'lotteryId': lotteryId,
                'TimeRolled': rollingNumber
            };
            var Result = $('#HomeResult');
            Result.html("");
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    if (resp.length > 0) {
                        Result.html(resp);
                    }
                    $("#titlemain").html('Thống kê kết quả 2 số cuối đặc biệt XS' +
                        lotteryCode +
                        ' - xổ số ' +
                        lotteryName);
                });
        },
        getThongKeTheoTanSuat: function() {
            var url = xosoconfig.rootPath + 'XSDPAjax/AjaxGetTanSuatDB';
            var lotteryId = $("#ddLotteries option:selected").val();
            var lotteryName = $("#ddLotteries option:selected").text();
            var rollingNumber = $("#ddlRollingNumbers").val();
            var dateView = $("input:text[name=date]").val();
            var type = $("input[name=TanSuatType]:checked").val();
            var lotteryCode = $("#ddLotteries option:selected").attr('tag');
            if (rollingNumber == 0) {
                rollingNumber = 30;
            }
            var dataGetter = {
                'lotteryId': lotteryId,
                'rollNumber': rollingNumber,
                'dateview': dateView,
                'type': type
            };
            var Result = $('#content');
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    if (resp.length > 0) {
                        Result.html(resp);
                    }
                    $('.title-main').html("Bảng thống kê tần suất giải đặc biệt XS" + lotteryCode);
                });
        },
        giaiDacBiet: {
            getReport: function() {
                var lotteryId = $("#ddLotteries option:selected").val();
                var lotteryName = $("#ddLotteries option:selected").text();
                var rowAmount = $("#amplitude").val();
                var url = xosoconfig.rootPath + 'thong-ke-giai-db-ajax.html';
                var dataGetter = {
                    'lotteryId': lotteryId,
                    'lotteryName': lotteryName,
                    'pageIndex': 0,
                    'rowAmount': rowAmount
                };
                var tkgiaiDB = $('#tkgiaiDB');
                $.xosoAjax(url,
                    'Get',
                    dataGetter,
                    function(resp) {
                        if (resp.length > 0) {
                            tkgiaiDB.html(resp);
                        }
                    });
            }
        },
        DayOfWeekChange: function() {
            var ddLotteries = $("#ddLotteries");
            var dayOfWeek = $("#ddlDayOfWeeks option:selected").val();
            var url = xosoconfig.rootPath + 'Utils/GetLotteriesByDayOfWeek';
            var dataGetter = {
                'dayOfWeek': dayOfWeek
            };
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    if (resp.length > 0) {
                        //var objJSON = JSON.parse(resp);
                        ddLotteries.html($('<option></option>').val(0).html('Miền Bắc'));
                        $.each(resp,
                            function(i, option) {
                                if (option.lotteryGroupId > 1)
                                    ddLotteries.append($('<option></option>').val(option.lotteryId)
                                        .html(option.lotteryName).attr('tag', option.lotteryCode));
                            });
                    }


                });
        },
        TKLoXien: function() {
            var lotteryId = $('#ddLotteries option:selected').val(),
                rollNumber = $("#ddlRollingNumbers").val();
            var url = xosoconfig.rootPath + 'ThongKeAjax/AjaxThongKeLoXien';
            var dataGetter = {
                'lotteryId': lotteryId,
                'rollNumber': rollNumber
            };
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    if (resp.length > 0) {
                        $('#ajaxContentContainer').html(resp);
                    }
                });
        },
        TKDauDuoiDayOfWeekChange: function() {
            var ddLotteries = $("#ddLotteries");
            var dayOfWeek = $("#ddlDayOfWeeks option:selected").val();
            ddLotteries.html($('<option></option>').val("0@@1").html('Miền Bắc'));
            var url = xosoconfig.rootPath + 'Utils/GetLotteriesByDayOfWeek';
            var dataGetter = {
                'dayOfWeek': dayOfWeek
            };
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    var objJSON = JSON.parse(resp);
                    $.each(objJSON,
                        function(i, option) {
                            if (option.LotteryGroupId > 1)
                                ddLotteries.append($('<option></option>')
                                    .val(option.LotteryId + "@@" + option.LotteryGroupId).html(option.LotteryName));
                        });
                });
        },
        MNMTDayOfWeekChange: function(lotteryGroupId) {
            var ddLotteries = $("#ddLotteries");
            var dayOfWeek = $("#ddlMNDayOfWeeks option:selected").val();
            var url = xosoconfig.rootPath + 'Utils/GetLotteriesByDayOfWeek';
            var dataGetter = {
                'dayOfWeek': dayOfWeek
            };
            ddLotteries.html('');
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    var objJSON = JSON.parse(resp);
                    $.each(objJSON,
                        function(i, option) {
                            if (option.LotteryGroupId == lotteryGroupId) {
                                ddLotteries.append(
                                    $('<option></option>').val(option.LotteryId).html(option.LotteryName));
                            }
                        });
                });
        },
        MNMTDayOfWeekChangeLotteryCode: function(lotteryGroupId) {
            var ddLotteries = $("#ddLotteries");
            var dayOfWeek = $("#ddlMNDayOfWeeks option:selected").val();
            var url = xosoconfig.rootPath + 'Utils/GetLotteriesByDayOfWeek';
            var dataGetter = {
                'dayOfWeek': dayOfWeek
            };
            ddLotteries.html('');
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    var objJSON = JSON.parse(resp);
                    $.each(objJSON,
                        function(i, option) {
                            if (option.LotteryGroupId == lotteryGroupId) {
                                ddLotteries.append($('<option></option>').val(option.LotteryCode.toLowerCase())
                                    .html(option.LotteryName));
                            }
                        });
                });
        },
        thongKeCauTheoTinh: function() {
            var lotteryCode = $("#ddLotteries option:selected").val();
            window.location = '/tham-khao-xo-so/soi-cau-xo-so-' + lotteryCode + '.html';
        },

        TKLoKep: function() {
            var lotteryId = $('#ddLotteries option:selected').val(),
                rollNumber = $("#ddlRollingNumbers").val();
            var url = xosoconfig.rootPath + 'ThongKeAjax/AjaxThongKeLoKep';
            var dataGetter = {
                'lotteryId': lotteryId,
                'rollNumber': rollNumber
            };
            $.xosoAjax(url,
                'Get',
                dataGetter,
                function(resp) {
                    if (resp.length > 0) {
                        $('#ajaxContentContainer').html(resp);
                    }
                });
        },
        articles: {
            variables: {
                page: 1
            },
            loadmore: function(url, cateId) {
                var dataGetter = {
                    'catId': cateId,
                    'pageIndex': xoso.articles.variables.page
                };
                var lotterymoreResult = $('.loadmoreResult');
                $.xosoAjax(url,
                    'Get',
                    dataGetter,
                    function(resp) {
                        if (resp.length > 0) {
                            xoso.articles.variables.page++;
                            lotterymoreResult.append(resp);
                        } else {
                            $('.btn-viewmore').hide();
                        }
                    });
            }
        },
        setPercent: function() {
            var progress = $('.progress').length;
            for (var i = 1; i <= progress; i++) {
                var percent = parseInt($('#percent-' + i).data('percent'));
                $('#progress-percent-' + i).width(percent + '%');
            }
        },
        scrollToElement: function(selector, callback) {
            var animation = {
                scrollTop: $(selector).offset().top
            };
            $('html,body').animate(animation,
                'slow',
                'swing',
                function() {
                    if (typeof callback == 'function') {
                        callback();
                    }
                    callback = null;
                });
        },
        clickScroll: function(kq_id) {
            window.setTimeout(function() {
                    xoso.scrollToElement("#" + kq_id);
                },
                1000);
        },
        dialog: function(element, title, text, width, height, onClose) {
            var xosoDialog = element == null
                ? $('<div><p style="padding:15px;">' + (text == null ? '' : text) + '</p></div>')
                : $('#' + element);
            xosoDialog.dialog({
                title: title == null ? 'Thông báo' : title,
                width: width == null ? 300 : width,
                height: height == null ? 200 : height,
                resizable: false,
                autoOpen: true,
                modal: true,
                responsive: true,
                buttons: {
                    "Đóng": function() {
                        $(this).dialog("close");
                    }
                },
                close: typeof (onClose) == "function" ? onClose : function() {}
            });
        }
    }
}
$.extend({
    xosoAjax: function (url, type, dataGetter, onsuccess) {
        var execOnSuccess = $.isFunction(onsuccess) ? onsuccess : $.noop;
        var getData = $.isFunction(dataGetter) ? dataGetter : function () {
            return dataGetter;
        };
        var linkLoadmore = $('.load-more > a'), loadmoreText = linkLoadmore.text();
        $.ajax({
            url: url,
            type: type,
            data: getData(),
            traditional: true,
            beforeSend: function () {
                $('.btn-readmore').hide();
                $('.loadmoreimg').show();
                $('button.btn-red').prop('disabled', true).css('cursor', 'wait');
                $('.btn.btn-danger').text('Đang tải dữ liệu...').prop('disabled', true).css('cursor', 'wait');
                $('.btn.btn-danger2[data-id=1]').text('Đang tải dữ liệu...').prop('disabled', true).css('cursor', 'wait');
                $('.btn.btn-danger3[data-id=1]').text('Đang tải dữ liệu...').prop('disabled', true).css('cursor', 'wait');
                linkLoadmore.text('Đang tải dữ liệu...').prop('disabled', true).css('cursor', 'wait');
            },
            error: function (xhr, status, error) {
                if (xhr.status == 400) {
                    alert(xhr.responseText);
                } else {
                    alert('Quý khách vui lòng thử lại sau.');
                }
                $('.btn-readmore').show();
                $('.loadmoreimg').hide();
                $('button.btn-red').prop('disabled', false).css('cursor', 'default');
                $('.btn.btn-danger').text('Kết quả').prop('disabled', false).css('cursor', 'default');
                $('.btn.btn-danger2[data-id=1]').text('Gửi').prop('disabled', false).css('cursor', 'default');
                $('.btn.btn-danger3[data-id=1]').text('Xem kết quả').prop('disabled', false).css('cursor', 'default');
                linkLoadmore.text(loadmoreText).prop('disabled', false).css('cursor', 'default');
            },
            success: function (data, status, xhr) {
                window.setTimeout(function () {
                    execOnSuccess(data);
                }, 10);
                $('.btn-readmore').show();
                $('.loadmoreimg').hide();
                $('button.btn-red').prop('disabled', false).css('cursor', 'default');
                $('.btn.btn-danger').text('Kết quả').prop('disabled', false).css('cursor', 'default');
                $('.btn.btn-danger2[data-id=1]').text('Gửi').prop('disabled', false).css('cursor', 'default');
                $('.btn.btn-danger3[data-id=1]').text('Xem kết quả').prop('disabled', false).css('cursor', 'default');
                linkLoadmore.text(loadmoreText).prop('disabled', false).css('cursor', 'default');
            }
        });
    }
});
$.fn.preloader = function (options) {
    var defaults = {
        delay: 50,
        preload_parent: "a",
        check_timer: 300,
        ondone: function () { },
        oneachload: function (image) { },
        fadein: 300
    };
    var options = $.extend(defaults, options),
        root = $(this),
        images = root.find("img").css({
            "visibility": "hidden",
            opacity: 0
        }),
        timer, counter = 0,
        i = 0,
        checkFlag = [],
        delaySum = options.delay,
        init = function () {
            timer = setInterval(function () {
                if (counter >= checkFlag.length) {
                    clearInterval(timer);
                    options.ondone();
                    return;
                }
                for (i = 0; i < images.length; i++) {
                    if (images[i].complete == true) {
                        if (checkFlag[i] == false) {
                            checkFlag[i] = true;
                            options.oneachload(images[i]);
                            counter++;
                            delaySum = delaySum + options.delay;
                        }
                        $(images[i]).css("visibility", "visible").delay(delaySum).animate({
                            opacity: 1
                        }, options.fadein, function () {
                            $(this).parent().removeClass("preloader");
                        });
                    }
                }
            }, options.check_timer);
        };
    images.each(function () {
        if ($(this).parent(options.preload_parent).length == 0) $(this).wrap("<a class='preloader' />");
        else
            $(this).parent().addClass("preloader");
        checkFlag[i++] = false;
    });
    images = $.makeArray(images);
    var icon = jQuery("<img />", {
        id: 'loadingicon',
        src: '/Content/images/icon_loading_item.gif'
    }).hide().appendTo("body");
    timer = setInterval(function () {
        if (icon[0].complete == true) {
            clearInterval(timer);
            init();
            icon.remove();
            return;
        }
    }, 100);
}
 