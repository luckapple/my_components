function time_picker(list, strat,num) {
    this.list = list;
    this.strat = strat;
    this.num = num;
}
time_picker.prototype.set_time = function () {
    var html = `
        <div class="item ${this.list}_item"">&nbsp;</div>
        <div class="item ${this.list}_item"">&nbsp;</div>
    `;
    for (var i = this.strat; i < this.num; i++) {
        if (i < 10) {
            i == this.strat ? html += `<div class="item ${this.list}_item sel_item">${"0" + i}</div>` : html += `<div class="item ${this.list}_item">${"0" + i}</div>`
        } else {
            html += `<div class="item ${this.list}_item"">${i}</div>`
        }
    }
    html += `
        <div class="item ${this.list}_item"">&nbsp;</div>
        <div class="item ${this.list}_item"">&nbsp;</div>
    `;
    $("." + this.list).html(html)
}


time_picker.prototype.debounce =function (fn, delay, cate) {
    let timer = null //借助闭包
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn(cate), delay) // 简化写法
    }
}

var start_num = end_num = 0;
time_picker.prototype.showTop= function(cate) {
    return function () {
        var scroll_top = $("." + cate).scrollTop();
        if (start_num > end_num) {
            var num = Math.ceil(scroll_top / 40);
        } else { 
            var num = parseInt(scroll_top / 40);
        }
        
        // var num = Math.ceil(scroll_top / 40);
        $("." + cate).animate({ scrollTop: 40 * num }, 0);
        $("." + cate + "_item").eq(num + 2).addClass("sel_item").siblings().removeClass("sel_item");
    }
}
time_picker.prototype.Scroll = function () { 
    $("." + this.list).scroll(this.debounce(this.showTop, 100, this.list));
    $("." + this.list).on("touchstart", (res) => {
        start_num = res.changedTouches[0].pageY;
    });
    $("." + this.list).on("touchend", (res) => {
        console.log(res)
        end_num = res.changedTouches[0].pageY;
    });
}