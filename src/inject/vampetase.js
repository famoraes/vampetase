
(function ($) {

    var self = {
        vampetaseImg: [
            'http://g.glbimg.com/og/gs/gsat2/f/original/2012/11/01/vampeta_muvuca.jpg',
            'http://i49.tinypic.com/3134qj6.jpg',
            'http://e.imguol.com/esporte/futebol/2011/03/09/vampeta-toma-sorvete-enquanto-acompanha-uma-partida-de-futebol-1299716262839_1024x768.jpg',
            'http://imguol.com/2012/09/25/vampeta-fala-sobre-ensaio-nu-para-a-g-magazine-1348607286095_956x500.jpg',
            'http://f.i.uol.com.br/fotografia/2013/09/10/316315-970x600-1.jpeg',
            'http://www.yaoheng.info/autos/Holland/PSV/Vampeta.jpg',
            'http://sl5.content.torcedores.com/content/uploads/2014/09/vampeta-615x400.jpg',
            'http://4.bp.blogspot.com/-8Tp2Bcd6DTE/TguiDKwVi7I/AAAAAAAACZc/hTLf52aB04s/s1600/vampeta.jpg',
            'http://images.uncyc.org/pt/7/77/Ricardinho_Vampeta_gays.jpg',
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.vampetaseImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);
