//Kendo Mobile Slide Menu by Joe Meeks (aka TaeKwonJoe)
//http://github.com/JoeMeeks
; (function (tkj, $, undefined) {
    tkj.vm = kendo.observable({
        menu: new kendo.data.DataSource({
            data: [
                { section: "Header1", order: 1, title: "Home", icon: "home", viewID: "#home" },
                { section: "Header1", order: 2, title: "Favorites", icon: "favorites", viewID: "#favorites" },
                { section: "Header2", order: 1, title: "Featured", icon: "featured", viewID: "#featured" },
                { section: "Header2", order: 2, title: "Bookmarks", icon: "bookmarks", viewID: "#bookmarks" },
                { section: "Header2", order: 3, title: "Contacts", icon: "contacts", viewID: "#contacts" },
                { section: "Header2", order: 4, title: "Camera", icon: "camera", viewID: "#camera" },
                { section: "Header2", order: 5, title: "Downloads", icon: "downloads", viewID: "#downloads" },
                { section: "Header3", order: 1, title: "Cart", icon: "cart", viewID: "#cart" },
                { section: "Header3", order: 2, title: "Organize", icon: "organize", viewID: "#organize" },
                { section: "Header3", order: 3, title: "Share", icon: "share", viewID: "#share" },
                { section: "Header3", order: 4, title: "Action", icon: "action", viewID: "#action" },
                { section: "Header3", order: 5, title: "Globe", icon: "globe", viewID: "#globe" },
                { section: "Header4", order: 1, title: "Settings", icon: "settings", viewID: "#settings" },
                { section: "Header4", order: 2, title: "About", icon: "about", viewID: "#about" },
            ],
            group: "section",
            sort: "order"
        }),
        iconclass: function (e) { return "km-icon km-" + e.icon; },
        active: null,
        version: 'Kendo Mobile Slide Menu by <a href="http://github.com/JoeMeeks" target="_blank">Joe Meeks</a>'
    });
    tkj.ui = {
        master_Init: function (e) {
            //the layout init event only fires once on browser load or refresh
            var menu = $("#menu");
            kendo.bind($("#menu"), tkj.vm, kendo.mobile.ui);
            menu.show();
            menu.kendoMobileScroller();
            //set app.options.initial view as active
            var li = $('#lvMenu .km-listview-link[href="#' + app.options.initial + '"]');
            li.addClass("active");
            tkj.vm.set("active", li[0]);
        },
        master_Show: function (e) {
            $(document.body).css("visibility", "visible"); //reveal body after active view is shown
            var view = e.view.element;
            //$(document.body).show();
            if (!view.data("kendoTouch")) {
                var menuWidth = 250;
                view.kendoTouch({
                    //global: true,
                    drag: function (e) {
                        var pos;
                        if (e.touch.x.startLocation < menuWidth) {
                            pos = e.touch.x.location - e.touch.x.startLocation;
                        } else if (e.touch.x.startLocation > menuWidth) {
                            pos = e.touch.x.location - (e.touch.x.startLocation - menuWidth);
                        }
                        if (pos >= 0 && pos <= menuWidth) view.css("left", pos);
                    },
                    dragend: function (e) {
                        var pos = (e.touch.x.startLocation > menuWidth) ? e.touch.x.location - (e.touch.x.startLocation - menuWidth) : e.touch.x.location - e.touch.x.startLocation;
                        if (pos > menuWidth/2) {
                            view.animate({ left: menuWidth }, { duration: 100, complete: function () {
                                view.find("a[data-rel=slidemenu]").addClass("active");
                            } });
                        } else {
                            view.animate({ left: "0" }, { duration: 100, complete: function () {
                                view.find("a[data-rel=slidemenu]").removeClass("active");
                            } });
                        }
                    }
                });
            }
        },
        menuSelect: function (e) {
            e.preventDefault();
            try {
                var active = tkj.vm.active;
                if (active) $(active).removeClass("active");
                e.item.addClass("active");
                var view = app.view().element;
                view.animate({ left: "0" }, { duration: 200, complete: function () {
                    tkj.vm.set("active", e.item[0]);
                    view.find("[data-rel=slidemenu]").removeClass("active");
                    app.navigate(e.dataItem.viewID);
                } });
            } catch (e) {
                alert("menu error: " + e.message);
            }
        },
        btnMenu_Click: function (e) {
            try {
                var pos = parseInt(app.view().element.css("left"));
                if (pos == 0) {
                    e.button.addClass("active");
                    $(app.view().element).animate({ left: "250px" }, { duration: 200, complete: function () {  } });
                } else {
                    e.button.removeClass("active");
                    $(app.view().element).animate({ left: "0" }, { duration: 200, complete: function () {  } });
                }
            } catch (e) {
                alert("menu error: " + e.message);
            }
        },
        home_Show: function (e) {
            e.view.element.show();
        }
    }
} (window.tkj = window.tkj || {}, jQuery));